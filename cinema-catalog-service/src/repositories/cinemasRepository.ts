import * as env from "../env";
import * as P from "bluebird";
import serverlessMysql = require("serverless-mysql");
import { ServerlessMysql } from "serverless-mysql";
import "reflect-metadata";
import { injectable } from "inversify";
import { ICinemaRepository } from "../inversify/interfaces";
import { fetch, post } from "../lib/circuitBreaker";
import { cinemaDeserializer } from "../serializers/cinemasSerializer";
import { TDebug } from "../log";
const debug = new TDebug("app:src:repositories:cinemas");

// current workaround. https://github.com/jeremydaly/serverless-mysql/issues/30#issuecomment-488192023
const createConnection = (serverlessMysql as unknown) as (
  cfg?: any
) => ServerlessMysql;

const mysql = createConnection({
  config: {
    host: env.get("DATABASE_HOST"),
    database: env.get("DATABASE"),
    user: env.get("DATABASE_USER"),
    password: env.get("DATABASE_PASSWORD"),
    dateStrings: true
  }
});

const moviesServiceHost = env.get("MOVIES_SERVICE_HOST");
const searchServiceHost = env.get("SEARCH_SERVICE_HOST");

const fallbackResponse = { "data": [{ "type": "movies", "id": "1", "attributes": { "title": "Assasins Creed", "genre": "Action", "runtime": 115, "format": "IMAX", "plot": "In 1492 Andalusia, during the Granada War, Aguilar de Nerha is accepted into the Assassins Brotherhood. He is assigned to protect Prince Ahmed de Granada from the Knights Templar. In 1986, adolescent Callum Cal Lynch finds his mother killed by his father, Joseph, a modern-day Assassin. Gunmen led by Alan Rikkin, CEO of the Templars' Abstergo Foundation, arrive to capture Joseph, who convinces his son to escape.", "plot-ja": "主人公・カラムは幼少時に、アサシンの装束をまとった父親に母親を殺されるという悲惨な経験をし、その十数年後に殺人を犯し刑務所に収監、死刑が執行される。死んだはずのカラムが目を覚ましたのは、複合企業・アブスターゴ社がスペインで運営する矯正施設の医務室だった。", "plot-cn": "2016年，死囚柯倫·林區透過阿布斯泰戈（Abstergo）科技公司察覺自己其實是刺客組織的後裔，他被迫參與測驗來進行深層記憶的探索，以便重溫15世紀末1492年祖先阿基拉闖盪西班牙宗教裁判所的經歷。林區在探索的過程中，必須獲得其知識和技能，以面對聖殿騎士團及存於現今的敵人。", "released-at": "2018-12-01T00:00:00Z" } }] };

@injectable()
export class CinemaRepository implements ICinemaRepository {
  public async getCinemasByCity(id: string): P<any> {
    const results = await mysql.query<[]>(
      "SELECT id, name, latitude, longitude FROM cinema WHERE city_id = ?",
      [id]
    );

    await mysql.end();

    return results;
  }

  public async getCinemaById(id: string): P<any> {
    const cinemaPremieres = await mysql.query<any>(
      `SELECT cinema.id, name, latitude, longitude, movie_id
         FROM cinema_catalog.cinema
   INNER JOIN cinema_catalog.cinemaPremiere
           ON cinema.id = cinemaPremiere.cinema_id
        WHERE cinema.id = ?`,
      [id]
    );
    await mysql.end();

    const premiereMovieIds = cinemaPremieres.map((premiere) => premiere.movie_id);

    // make api requests parallel
    const parallelRequests = premiereMovieIds.map((movieId) => {
      const url = moviesServiceHost + "/api/movies/" + movieId;
      return fetch(url);
    });

    // deserialize response
    const movies = P.map(parallelRequests, async (movie) => {
      const deserializedMovie = await cinemaDeserializer.deserialize(movie);
      return deserializedMovie[0];
    });

    const cinema = {
      id: cinemaPremieres[0].id,
      name: cinemaPremieres[0].name,
      type: "cinemas",
      latitude: cinemaPremieres[0].latitude,
      longitude: cinemaPremieres[0].longitude,
      movies: await movies
    };

    // return object
    return P.props(cinema);
  }

  public async getCinemaScheduleByMovie(cinemaId: string, movieId: string): P<any> {
    const cinema = await mysql.query(
      "SELECT id, latitude, longitude, name FROM cinema WHERE id = ?",
      [cinemaId]
    );
    await mysql.end();

    const rooms = await mysql.query<any>(
      `SELECT cinemaRoom.id, name, capacity, format, time, price
         FROM cinemaRoom
   INNER JOIN schedule
           ON cinemaRoom.id = schedule.cinemaRoom_id
        WHERE cinemaRoom.cinema_id = ?`,
      [cinemaId]
    );
    await mysql.end();

    // transform object array to nested object to reduce data redandancy
    const nestedRooms = rooms.reduce((result, room) => {
      const a = result.find(({ id }) => id === room.id);
      const { time, price } = room;
      if (a) {
        a.schedules.push({ time, price });
      } else {
        result.push({
          id: room.id,
          name: room.name,
          capacity: room.capacity,
          schedules: [{ time, price }]
        });
      }
      return result;
    }, []);

    const movie = await fetch(moviesServiceHost + "/api/movies/" + movieId, fallbackResponse).catch((err) => {
      debug.error(JSON.stringify(err));
      throw err;
    });
    const deserializedMovie = await cinemaDeserializer.deserialize(movie);

    const cinemaSchedules = {
      id: cinema[0].id,
      name: cinema[0].name,
      type: "cinemas",
      latitude: cinema[0].latitude,
      longitude: cinema[0].longitude,
      movies: await deserializedMovie,
      rooms: nestedRooms
    };

    // return array of objects
    return P.all([cinemaSchedules]);
  }

  public async ingestAllCinemasToES() {
    const cinemas = await mysql.query<any>(
      `SELECT cinema.id, cinema.name, latitude, longitude,
              cinemaRoom.id as room_id, cinemaRoom.name as room_name, capacity, format,
              time, price, movie_id
         FROM cinema_catalog.cinema
        INNER JOIN cinema_catalog.cinemaRoom ON cinema.id = cinemaRoom.cinema_id
        INNER JOIN cinema_catalog.schedule ON cinemaRoom.id = schedule.cinemaRoom_id
        ORDER BY cinema.id, cinemaRoom.id`
    );
    await mysql.end();

    const cinemaMovieIds = cinemas.map((cinema) => cinema.movie_id);

    // make api requests parallel
    const parallelRequests = cinemaMovieIds.map((movieId) => {
      const url = moviesServiceHost + "/api/movies/" + movieId;
      return fetch(url).catch((err) => {
        throw err;
      });
    });

    // deserialize response
    const movies = await P.map(parallelRequests, async (movie) => {
      const deserializedMovie = await cinemaDeserializer.deserialize(movie);
      return deserializedMovie[0];
    });

    const cinemasMovies = cinemas.map((cinema) => {
      const movie = movies.find(({ id }) => cinema.movie_id === id);

      cinema["title"] = movie.title;
      cinema["plot"] = movie.plot;
      cinema["plot_ja"] = movie.plot_ja;
      cinema["plot_cn"] = movie.plot_cn;
      cinema["genre"] = movie.genre;
      cinema["movie_format"] = movie.format;
      cinema["runtime"] = movie.runtime;
      cinema["movie_id"] = movie.id;
      cinema["released-at"] = movie["released-at"];
      cinema["location"] = [cinema.longitude, cinema.latitude];

      return cinema;
    });

    await post(searchServiceHost + "/api/search/ingest", cinemasMovies);

    return;
  }
}

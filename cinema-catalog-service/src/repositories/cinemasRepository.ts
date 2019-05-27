import * as env from "../env";
import * as P from "bluebird";
import * as serverlessMysql from "serverless-mysql";
import "reflect-metadata";
import { injectable } from "inversify";
import { ICinemaRepository } from "../inversify/interfaces";
import { fetch } from "../lib/circuitBreaker";
import { cinemaDeserializer } from "../serializers/cinemasSerializer";

const mysql = serverlessMysql({
  config: {
    host     : env.get("DATABASE_HOST"),
    database : env.get("DATABASE"),
    user     : env.get("DATABASE_USER"),
    password : env.get("DATABASE_PASSWORD"),
    dateStrings: true
  }
});

const host = env.get("MOVIES_SERVICE_HOST");

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
      const url = host + "/api/movies/" + movieId;
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
      const a = result.find(({id}) => id === room.id);
      const { time, price } = room;
      if (a) {
        a.schedules.push({time, price});
      } else {
        result.push({
          id: room.id,
          name: room.name,
          capacity: room.capacity,
          schedules: [{time, price}]
        });
      }
      return result;
    }, []);

    const movie = await fetch(host + "/api/movies/" + movieId);
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
         FROM (cinema_catalog.cinema INNER JOIN cinema_catalog.cinemaRoom ON cinema.id = cinemaRoom.cinema_id)
        INNER JOIN cinema_catalog.schedule ON cinemaRoom.id = schedule.cinemaRoom_id
        ORDER BY cinema.id, cinemaRoom.id`
    );
    await mysql.end();

    const cinemaMovieIds = cinemas.map((cinema) => cinema.movie_id);

    // make api requests parallel
    const parallelRequests = cinemaMovieIds.map((movieId) => {
      const url = host + "/api/movies/" + movieId;
      return fetch(url);
    });

    // deserialize response
    const movies = await P.map(parallelRequests, async (movie) => {
      const deserializedMovie = await cinemaDeserializer.deserialize(movie);
      return deserializedMovie[0];
    });

    // transform object array to nested object to reduce data redandancy
    const nestedRooms = cinemas.reduce((result, cinema) => {
      const a = result.find(({room_id}) => room_id === cinema.room_id);
      const { time, price, movie_id } = cinema;
      const movie = movies.find(({id}) => movie_id === id);
      if (a) {
        a.schedules.push({time, price, movie});
      } else {
        result.push({
          ingest: "ingest_to_index_cinemas",
          id: cinema.id,
          name: cinema.name,
          latitude: cinema.latitude,
          longitude: cinema.longitude,
          room_id: cinema.room_id,
          room_name: cinema.room_name,
          capacity: cinema.capacity,
          format: cinema.format,
          schedules: [{time, price, movie}]
        });
      }
      return result;
    }, []);

    // transform object array to nested object to reduce data redandancy
    const nestedCinemas = nestedRooms.reduce((result, cinema) => {
      const a = result.find(({id}) => id === cinema.id);
      const { room_id, room_name, capacity, format, schedules } = cinema;
      if (a) {
        a.rooms.push({room_id, room_name, capacity, format, schedules});
      } else {
        result.push({
          ingest: "ingest_to_index_cinemas",
          id: cinema.id,
          name: cinema.name,
          latitude: cinema.latitude,
          longitude: cinema.longitude,
          rooms: [{room_id, room_name, capacity, format, schedules}]
        });
      }
      return result;
    }, []);

    const log = require("../log").default;
    nestedCinemas.map((cinema) => {
      log.ingest(JSON.stringify(cinema));
    });

    return;
  }
}

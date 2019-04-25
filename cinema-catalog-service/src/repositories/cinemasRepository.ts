// import { TDebug } from "../log";
// const debug = new TDebug("app:src:repositories:movies");
import * as P from "bluebird";
import * as serverlessMysql from "serverless-mysql";
import "reflect-metadata";
import { injectable } from "inversify";
import { ICinemaRepository } from "../inversify/interfaces";
import fetch from "node-fetch";
import { cinemaDeserializer } from "../serializers/cinemasSerializer";

// should be configurable
const mysql = serverlessMysql({
  config: {
    host     : "localhost",
    database : "cinema_catalog",
    user     : "foo",
    password : "bar",
    dateStrings: true
  }
});

// should be configurable
const host = "http://localhost:8002/";

// should have error handling, handling response status, should be a part of utility package
const http = async (request: RequestInfo): Promise<any> => {
  const response = await fetch(request);
  const json = await response.json();
  return json;
};

@injectable()
export class CinemaRepository implements ICinemaRepository {
  public async getCinemasByCity(id: string): P<any> {
    const results = await mysql.query(
      "SELECT id, name FROM cinema WHERE city_id = ?",
      [id]
    );

    await mysql.end();

    return results;
  }

  public async getCinemaById(id: string): P<any> {
    const results = await mysql.query(
      "SELECT id, name FROM cinema WHERE id = ?",
      [id]
    );
    await mysql.end();

    const premieres = await http(host + "api/movies/premieres");
    const deserializedPremieres = await cinemaDeserializer.deserialize(premieres);

    const cinemas = Object.assign({}, results[0], {
      movies: deserializedPremieres
    });

    return P.props(cinemas);
  }

  public async getCinemaScheduleByMovie(cinemaId: string, movieId: string): P<any> {
    const cinema = await mysql.query(
      "SELECT id, name FROM cinema WHERE id = ?",
      [cinemaId]
    );
    await mysql.end();

    const rooms = await mysql.query(
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

    const movie = await http(host + "api/movies/" + movieId);
    const deserializedMovie = await cinemaDeserializer.deserialize(movie);

    const cinemaSchedules = Object.assign({}, cinema[0], {
      movie: deserializedMovie,
      rooms: nestedRooms
    });

    return P.all([cinemaSchedules]);
  }
}

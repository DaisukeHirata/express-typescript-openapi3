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
  public async getAllMovies(): P<any[]> {
    const results = await mysql.query("SELECT id, title, runtime, format, plot, DATE_FORMAT(released_at, \'%Y-%m-%dT%TZ\') as released_at FROM movie");

    await mysql.end();

    return results;
  }

  public async getMoviePremieres(): P<any[]> {
    // const currentDay = new Date();
    const results = await mysql.query("SELECT id, title, runtime, format, plot, DATE_FORMAT(released_at, \'%Y-%m-%dT%TZ\') as released_at FROM movie");
    console.log(results);
    await mysql.end();

    return results;
  }

  public async getMovieById(id: string): P<any> {
    const results = await mysql.query(
      "SELECT id, title, runtime, format, plot, DATE_FORMAT(released_at, \'%Y-%m-%dT%TZ\') as released_at FROM movie WHERE id = ?",
      [id]
    );

    await mysql.end();

    return results;
  }

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
}

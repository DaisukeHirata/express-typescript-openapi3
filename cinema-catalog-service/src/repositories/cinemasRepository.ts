// import { TDebug } from "../log";
// const debug = new TDebug("app:src:repositories:movies");
import * as P from "bluebird";
import * as serverlessMysql from "serverless-mysql";
import "reflect-metadata";
import { injectable } from "inversify";
import { IMovieRepository } from "../inversify/interfaces";

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

@injectable()
export class MovieRepository implements IMovieRepository {
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
}

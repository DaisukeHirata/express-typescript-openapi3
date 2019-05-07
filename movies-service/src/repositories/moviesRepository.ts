import * as env from "../env";
import * as P from "bluebird";
import * as serverlessMysql from "serverless-mysql";
import "reflect-metadata";
import { injectable } from "inversify";
import { IMovieRepository } from "../inversify/interfaces";
import { TDebug } from "../log";
const debug = new TDebug("app:src:repositories:movies");

const mysql = serverlessMysql({
  config: {
    host     : env.get("DATABASE_HOST"),
    database : env.get("DATABASE"),
    user     : env.get("DATABASE_USER"),
    password : env.get("DATABASE_PASSWORD"),
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
}

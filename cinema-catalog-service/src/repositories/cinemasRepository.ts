// import { TDebug } from "../log";
// const debug = new TDebug("app:src:repositories:movies");
import * as P from "bluebird";
import * as serverlessMysql from "serverless-mysql";
import "reflect-metadata";
import { injectable } from "inversify";
import { ICinemaRepository } from "../inversify/interfaces";

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
    const testCinemaPremieresById = {
      "id": "588ac3a02d029a6d15d0b5c4",
      "name": "Plaza Morelia",
      "movies": [
        {
          id: "1",
          title: "Assasins Creed",
          runtime: 115,
          plot: "Lorem ipsum dolor sit amet",
          poster: "link to poster..."
        },
        {
          id: "2",
          title: "Aliados",
          runtime: 124,
          plot: "Lorem ipsum dolor sit amet",
          poster: "link to poster..."
        },
        {
          id: "3",
          title: "xXx: Reactivado",
          runtime: 107,
          plot: "Lorem ipsum dolor sit amet",
          poster: "link to poster..."
        }
      ]
    };
    return P.props(testCinemaPremieresById);
  }
}

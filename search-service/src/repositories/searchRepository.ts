import * as env from "../env";
import * as P from "bluebird";
import serverlessMysql = require("serverless-mysql");
import { ServerlessMysql } from "serverless-mysql";
import "reflect-metadata";
import { injectable } from "inversify";
// import { Moment } from "moment";
import * as moment from "moment";
import { ISearchRepository } from "../inversify/interfaces";
import { fetch, put, post, search } from "../lib/circuitBreaker";
import { TDebug } from "../log";
const debug = new TDebug("app:src:repositories:search");

// current workaround. https://github.com/jeremydaly/serverless-mysql/issues/30#issuecomment-488192023
const createConnection = (serverlessMysql as unknown) as (
  cfg?: any
) => ServerlessMysql;

const mysql = createConnection({
  config: {
    host     : env.get("DATABASE_HOST"),
    database : env.get("DATABASE"),
    user     : env.get("DATABASE_USER"),
    password : env.get("DATABASE_PASSWORD"),
    dateStrings: true
  }
});

const esHost = env.get("ES_HOST");

@injectable()
export class SearchRepository implements ISearchRepository {
  public async ingestAllCinemas(cinemas: any[]) {
    // transform object array
    const nestedCinemas = cinemas.reduce((result, cinema) => {
      const a = result.find(({id}) => id === cinema.id);
      if (a) {
        a.data.push(cinema);
      } else {
        result.push({
          id: cinema.id,
          "@timestamp": moment(),
          data: [cinema]
        });
      }
      return result;
    }, []);

    nestedCinemas.map(async (cinema) => {
      await put(esHost + "cinemas/_doc/" + cinema.id, cinema);
    });

    return "";
  }

  public async getMoviePremieres(pageSize: number, pageBefore: moment.Moment, pageAfter: moment.Moment): P<any[]> {
    const f = "YYYY/MM/DD HH:mm:ss";
    debug.log(pageBefore.format(f));
    debug.log(pageAfter.format(f));

    const results = await mysql.query<any>(
      `SELECT id, title, runtime, format, plot,
              DATE_FORMAT(released_at, \'%Y-%m-%dT%TZ\') as released_at,
              DATE_FORMAT(created_at, \'%Y-%m-%dT%TZ\') as created_at,
              DATE_FORMAT(updated_at, \'%Y-%m-%dT%TZ\') as updated_at
         FROM movie
        WHERE created_at < ?
          AND created_at > ?
        ORDER BY created_at ASC
        LIMIT ?`,
      [pageBefore.format(f), pageAfter.format(f), pageSize]
    );
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

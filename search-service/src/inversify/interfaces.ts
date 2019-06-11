import * as P from "bluebird";
import { Moment } from "moment";

export interface ISearchRepository {
  ingestAllCinemas(cinemas: any[]);
  getMoviePremieres(pageSize: number, pageBefore: Moment, pageAfter: Moment): P<any[]>;
  getMovieById(id: string): P<any>;
}

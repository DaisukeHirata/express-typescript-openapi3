import * as P from "bluebird";

export interface ICinemaRepository {
  getCinemasByCity(id: string): P<any>;
  getCinemaById(id: string): P<any>;
  getCinemaScheduleByMovie(cinemaId: string, movieId: string): P<any>;
  ingestAllCinemasToES();
}

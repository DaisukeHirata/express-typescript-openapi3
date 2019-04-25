import * as P from "bluebird";

export interface ICinemaRepository {
  getAllMovies(): P<any[]>;
  getMoviePremieres(): P<any[]>;
  getMovieById(id: string): P<any>;
  getCinemasByCity(id: string): P<any>;
  getCinemaById(id: string): P<any>;
}

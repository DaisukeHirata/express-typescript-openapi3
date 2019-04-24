import * as P from "bluebird";

export interface IMovieRepository {
  getAllMovies(): P<any[]>;
  getMoviePremieres(): P<any[]>;
  getMovieById(id: string): P<any>;
  getCinemasByCity(id: string): P<any>;
}

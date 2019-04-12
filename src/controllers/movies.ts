import { Request, Response } from "express";
import * as P from "bluebird";
import { TDebug } from "../log";
import { movieSerializer } from "../serializers/movies";
import { MovieRepository } from "../repositories/movies";

const debug = new TDebug("app:src:controllers:movies");

export class MoviesController {
  private repo: MovieRepository;

  constructor() {
    this.repo = new MovieRepository();
  }

  public async getMovies(req: Request, res: Response): P<any> {
    const movies = this.repo.getMovies();
    debug.log("movies: ", movies);
    const serializedMovies = movieSerializer.serialize(movies);
    res.send(serializedMovies);
  }

  public async getMovie(req: Request, res: Response): P<any> {
    const id = req.swagger.params.id.value;
    const movie = this.repo.getMovie(id);
    const serializedMovie = movieSerializer.serialize([movie]);
    debug.log("movie: ", serializedMovie);
    res.send(serializedMovie);
  }
}

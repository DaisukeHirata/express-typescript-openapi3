import { Request, Response } from "express";
import * as P from "bluebird";
import { TDebug } from "../log";
import { movieSerializer } from "../serializers/moviesSerializer";
import { MovieRepository } from "../repositories/moviesRepository";

const debug = new TDebug("app:src:controllers:movies");

export class MoviesController {
  private repo: MovieRepository;

  constructor() {
    this.repo = new MovieRepository();
  }

  public async getAllMovies(req: Request, res: Response): P<any> {
    const movies = await this.repo.getAllMovies();
    debug.log("movies: ", movies);
    const serializedMovies = movieSerializer.serialize(movies);
    res.send(serializedMovies);
  }

  public async getMoviePremieres(req: Request, res: Response): P<any> {
    const movies = await this.repo.getMoviePremieres();
    debug.log("movies: ", movies);
    const serializedMovies = movieSerializer.serialize(movies);
    res.send(serializedMovies);
  }

  public async getMovieById(req: Request, res: Response): P<any> {
    const id = req.swagger.params.id.value;
    const movies = await this.repo.getMovieById(id);

    if (movies.length === 0) {
      res.status(404).send("Sorry can't find that!!");
    }

    const serializedMovie = movieSerializer.serialize(movies);
    debug.log("movie: ", serializedMovie);
    res.send(serializedMovie);
  }
}

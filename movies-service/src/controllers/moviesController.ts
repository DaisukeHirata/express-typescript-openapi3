import { Request, Response } from "express";
import * as P from "bluebird";
import { movieSerializer } from "../serializers/moviesSerializer";
import { IMovieRepository } from "../inversify/interfaces";
import { TDebug } from "../log";
const debug = new TDebug("app:src:controllers:movies");

export class MoviesController {
  private repo: IMovieRepository;

  constructor(repo: IMovieRepository) {
    this.repo = repo;
  }

  public async getAllMovies(req: Request, res: Response): P<any> {
    const movies = await this.repo.getAllMovies();
    const serializedMovies = movieSerializer.serialize(movies);
    res.send(serializedMovies);
  }

  public async getMoviePremieres(req: Request, res: Response): P<any> {
    const movies = await this.repo.getMoviePremieres();
    const serializedMovies = movieSerializer.serialize(movies);
    res.send(serializedMovies);
  }

  public async getMovieById(req: Request, res: Response): P<any> {
    const id = req.swagger.params.id.value;
    const movies = await this.repo.getMovieById(id);

    if (movies.length === 0) {
      res.status(404).send({
        message: "Sorry, can not find that!!"
      });
      return;
    }

    const serializedMovie = movieSerializer.serialize(movies);
    res.send(serializedMovie);
  }
}

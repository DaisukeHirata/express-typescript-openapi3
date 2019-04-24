import { Request, Response } from "express";
import * as P from "bluebird";
import { TDebug } from "../log";
import { cinemaSerializer } from "../serializers/cinemasSerializer";
import { IMovieRepository } from "../inversify/interfaces";

const debug = new TDebug("app:src:controllers:movies");

export class MoviesController {
  private repo: IMovieRepository;

  constructor(repo: IMovieRepository) {
    this.repo = repo;
  }

  public async getAllMovies(req: Request, res: Response): P<any> {
    const movies = await this.repo.getAllMovies();
    debug.log("movies: ", movies);
    const serializedMovies = cinemaSerializer.serialize(movies);
    res.send(serializedMovies);
  }

  public async getMoviePremieres(req: Request, res: Response): P<any> {
    const movies = await this.repo.getMoviePremieres();
    debug.log("movies: ", movies);
    const serializedMovies = cinemaSerializer.serialize(movies);
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

    const serializedMovie = cinemaSerializer.serialize(movies);
    debug.log("movie: ", serializedMovie);
    res.send(serializedMovie);
  }

  public async getCinemasByCity(req: Request, res: Response): P<any> {
    const id = req.swagger.params.city_id.value;
    const cinemas = await this.repo.getCinemasByCity(id);

    if (cinemas.length === 0) {
      res.status(404).send({
        message: "Sorry, can not find that!!"
      });
      return;
    }

    const serializedCinemas = cinemaSerializer.serialize(cinemas);
    debug.log("cinemas: ", serializedCinemas);
    res.send(serializedCinemas);
  }
}

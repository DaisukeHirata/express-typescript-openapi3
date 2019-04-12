import { Request, Response } from "express";
import * as P from "bluebird";
import { TDebug } from "../log";

const debug = new TDebug("app:src:controllers:movies");

const movie = {
  "type": "movies",
  "id": 1,
  "attributes": {
    "title": "Assasins Creed",
    "runtime": 115,
    "format": "IMAX",
    "plot": "Lorem ipsum dolor sit amet",
    "released_at": "2018-12-01T00:00:00Z"
  }
};

export async function getMovies(req: Request, res: Response): P<any> {
  const movies = {
    "data": [movie]
  };
  debug.log("movies: ", movies);
  res.send(movies);
}

export async function getMovie(req: Request, res: Response): P<any> {
  const id = req.swagger.params.id.value;
  movie.id = id;
  debug.log("movie: ", movie);
  res.send(movie);
}

import { Request, Response } from "express";
import * as P from "bluebird";
import { TDebug } from "../log";
import { movieSerializer } from "../serializers/movies";

const debug = new TDebug("app:src:controllers:movies");

const movie1 = {
  id: 1,
  title: "Assasins Creed",
  runtime: 115,
  format: "IMAX",
  plot: "Lorem ipsum dolor sit amet",
  released_at: "2018-12-01T00:00:00Z"
};

const movie2 = {
  id: 2,
  title: "Assasins Creed 2",
  runtime: 116,
  format: "IMAX MAX",
  plot: "Lorem ipsum dolor sit amet",
  released_at: "2018-12-01T00:00:00Z"
};

export async function getMovies(req: Request, res: Response): P<any> {
  const movies = [movie1, movie2];
  debug.log("movies: ", movies);
  const serializedMovies = movieSerializer.serialize(movies);
  res.send(serializedMovies);
}

export async function getMovie(req: Request, res: Response): P<any> {
  const id = req.swagger.params.id.value;
  movie1.id = id;
  const serializedMovie = movieSerializer.serialize([movie1]);
  debug.log("movie: ", serializedMovie);
  res.send(serializedMovie);
}

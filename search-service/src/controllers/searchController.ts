import { Request, Response } from "express";
import * as P from "bluebird";
import * as moment from "moment";
import { movieSerializer, moviePagerSerializer } from "../serializers/moviesSerializer";
import { IMovieRepository } from "../inversify/interfaces";
// import { TDebug } from "../log";
// const debug = new TDebug("app:src:controllers:movies");

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

  // https://jsonapi.org/profiles/ethanresnick/cursor-pagination/
  // Cursor-based pagination (aka keyset pagination) is a common pagination strategy that avoids many of the pitfalls of “offset–limit” pagination.
  // https://www.citusdata.com/blog/2016/03/30/five-ways-to-paginate/
  // Like many engineering decisions, choosing pagination techniques involves tradeoffs. It’s safe to say that keyset pagination is most applicable for the average site with ordered linear access
  // Since users typically access pages of information in a linear fashion, keyset pagination is usually considered the best choice for paginating ordered records in high-traffic web servers.
  public async getMoviePremieres(req: Request, res: Response): P<any> {
    const pageSize = req.swagger.params["page[size]"] && req.swagger.params["page[size]"].value ? req.swagger.params["page[size]"].value : 10;
    const pageBefore = req.swagger.params["page[before]"] && req.swagger.params["page[before]"].value ? moment(req.swagger.params["page[before]"].value) : moment("9999-12-31 23:59:59");
    const pageAfter = req.swagger.params["page[after]"] && req.swagger.params["page[after]"].value ? moment(req.swagger.params["page[after]"].value) : moment("1000-01-01 00:00:00");

    if (isNaN(pageSize)) {
      res.status(400).send({ message: "page[size] is not a number" });
      return;
    }

    if (!pageBefore.isValid()) {
      res.status(400).send({ message: "page[before] is invalid date format string" });
      return;
    }

    if (!pageAfter.isValid()) {
      res.status(400).send({ message: "page[after] is invalid date format string" });
      return;
    }

    const movies = await this.repo.getMoviePremieres(pageSize, pageBefore, pageAfter);
    if (movies.length === 0) {
      res.status(404).send({ message: "Sorry, can not find that!!" });
      return;
    }

    const url = req.protocol + "://" + req.get("host") + req.path;
    const serializedMovies = moviePagerSerializer(url, movies, pageSize).serialize(movies);

    res.send(serializedMovies);
  }

  public async getMovieById(req: Request, res: Response): P<any> {
    const id = req.swagger.params.id.value;
    const movies = await this.repo.getMovieById(id);

    if (movies.length === 0) {
      res.status(404).send({ message: "Sorry, can not find that!!" });
      return;
    }

    const serializedMovie = movieSerializer.serialize(movies);
    res.send(serializedMovie);
  }
}

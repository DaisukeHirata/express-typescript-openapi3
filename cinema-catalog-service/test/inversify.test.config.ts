import "reflect-metadata";
import * as P from "bluebird";
import { Container, injectable } from "inversify";
import { TYPES } from "../src/inversify/types";
import { CinemaRepository } from "../src/repositories/cinemasRepository";
import { ICinemaRepository } from "../src/inversify/interfaces";

@injectable()
class DummyCinemaRepository implements ICinemaRepository {

  private testMovies = [{
    id: "3",
    title: "xXx: Reactivado",
    runtime: 100,
    format: "IMAX",
    plot: "Lorem ipsum dolor sit amet",
    released_at: "2018-12-01T00:00:00Z"
  }, {
    id: "4",
    title: "Resident Evil: Capitulo Final",
    runtime: 100,
    format: "IMAX",
    plot: "Lorem ipsum dolor sit amet",
    released_at: "2018-12-01T00:00:00Z"
  }, {
    id: "1",
    title: "Assasins Creed",
    runtime: 100,
    format: "IMAX",
    plot: "Lorem ipsum dolor sit amet",
    released_at: "2018-12-01T00:00:00Z"
  }];

  public async getCinemasByCity(id: string): P<any> {
    return P.all(this.testMovies);
  }

  public async getCinemaById(id: string): P<any> {
    return P.all(this.testMovies);
  }

  public async getCinemaScheduleByMovie(cinemaId: string, movieId: string): P<any> {
    return P.all(this.testMovies);
  }

}

const testContainer = new Container();
testContainer.bind<CinemaRepository>(TYPES.ICinemaRepository).to(DummyCinemaRepository);

export { testContainer };

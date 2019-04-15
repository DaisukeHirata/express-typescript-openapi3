// import { TDebug } from "../log";

// const debug = new TDebug("app:src:repositories:movies");

const movie1 = {
  id: "1",
  title: "Assasins Creed",
  runtime: 115,
  format: "IMAX",
  plot: "Lorem ipsum dolor sit amet",
  released_at: "2018-12-01T00:00:00Z"
};

const movie2 = {
  id: "2",
  title: "Assasins Creed 2",
  runtime: 116,
  format: "IMAX MAX",
  plot: "Lorem ipsum dolor sit amet",
  released_at: "2018-12-01T00:00:00Z"
};

export class MovieRepository {
  public getAllMovies(): any[] {
    return [movie1, movie2];
  }

  public getMoviePremieres(): any[] {
    return [movie1, movie2];
  }

  public getMovieById(id: string): any {
    const movie = Object.create(movie1);
    movie.id = id;
    return movie;
  }
}

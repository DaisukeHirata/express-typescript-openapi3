import { Container } from "inversify";
import { TYPES } from "./types";
import { MovieRepository } from "../repositories/cinemasRepository";

const myContainer = new Container();
myContainer.bind<MovieRepository>(TYPES.IMovieRepository).to(MovieRepository);

export { myContainer };

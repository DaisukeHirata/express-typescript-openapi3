import { Container } from "inversify";
import { TYPES } from "./types";
import { CinemaRepository } from "../repositories/cinemasRepository";

const myContainer = new Container();
myContainer.bind<CinemaRepository>(TYPES.ICinemaRepository).to(CinemaRepository);

export { myContainer };

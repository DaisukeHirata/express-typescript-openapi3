import { Container } from "inversify";
import { TYPES } from "./types";
import { SearchRepository } from "../repositories/searchRepository";

const myContainer = new Container();
myContainer.bind<SearchRepository>(TYPES.ISearchRepository).to(SearchRepository);

export { myContainer };

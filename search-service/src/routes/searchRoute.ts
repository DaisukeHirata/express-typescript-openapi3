import { Request, Response, Router } from "express";
import { Container } from "inversify";
import { SearchController } from "../controllers/searchController";
import { asyncHandler } from "../lib/asyncHandler";
import { TYPES } from "../inversify/types";
import { ISearchRepository } from "../inversify/interfaces";
import * as env from "../env";

const myContainer = env.get("DIContainer") as Container;
const repo = myContainer.get<ISearchRepository>(TYPES.ISearchRepository);
const searchController = new SearchController(repo);

export const searchCinema = Router().use("/", asyncHandler((req: Request, res: Response) => searchController.getMoviePremieres(req, res), "searchCinema"));
export const ingestCinemas = Router().use("/", asyncHandler((req: Request, res: Response) => searchController.ingestCinemas(req, res), "ingestCinemas"));
// export const getMovie = Router().use("/", asyncHandler((req: Request, res: Response) => searchController.getMovieById(req, res), "getMovie"));

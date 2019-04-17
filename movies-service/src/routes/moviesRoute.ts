import { Request, Response, Router } from "express";
import { Container } from "inversify";
import { MoviesController } from "../controllers/moviesController";
import { asyncHandler } from "../lib/asyncHandler";
import { TYPES } from "../inversify/types";
import { IMovieRepository } from "../inversify/interfaces";
import * as env from "../env";

const myContainer = env.get("DIContainer") as Container;
const repo = myContainer.get<IMovieRepository>(TYPES.IMovieRepository);
const moviesController = new MoviesController(repo);

export const getAllMovies = Router().use("/", asyncHandler((req: Request, res: Response) => moviesController.getAllMovies(req, res), "getAllMovies"));
export const getMoviePremieres = Router().use("/", asyncHandler((req: Request, res: Response) => moviesController.getMoviePremieres(req, res), "getMoviePremieres"));
export const getMovie = Router().use("/", asyncHandler((req: Request, res: Response) => moviesController.getMovieById(req, res), "getMovie"));

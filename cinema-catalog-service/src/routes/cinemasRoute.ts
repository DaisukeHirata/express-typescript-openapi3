import { Request, Response, Router } from "express";
import { Container } from "inversify";
import { MoviesController } from "../controllers/cinemasController";
import { asyncHandler } from "../lib/asyncHandler";
import { TYPES } from "../inversify/types";
import { IMovieRepository } from "../inversify/interfaces";
import * as env from "../env";

const myContainer = env.get("DIContainer") as Container;
const repo = myContainer.get<IMovieRepository>(TYPES.IMovieRepository);
const moviesController = new MoviesController(repo);

export const getCinemasByCity = Router().use("/", asyncHandler((req: Request, res: Response) => moviesController.getCinemasByCity(req, res), "getCinemasByCity"));
export const getCinemaById = Router().use("/", asyncHandler((req: Request, res: Response) => moviesController.getMoviePremieres(req, res), "getCinemaById"));
export const getCinemaSchedulesByMovie = Router().use("/", asyncHandler((req: Request, res: Response) => moviesController.getMovieById(req, res), "getCinemaSchedulesByMovie"));

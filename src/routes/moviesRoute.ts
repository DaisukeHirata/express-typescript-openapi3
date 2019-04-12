import { Request, Response, Router } from "express";
import { MoviesController } from "../controllers/moviesController";
import { asyncHandler } from "../lib/asyncHandler";

const moviesController = new MoviesController();

export const moviesGet = Router().use("/", asyncHandler((req: Request, res: Response) => moviesController.getMovies(req, res), "moviesGet"));
export const movieGet = Router().use("/", asyncHandler((req: Request, res: Response) => moviesController.getMovie(req, res), "movieGet"));

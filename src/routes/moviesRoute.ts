import { Request, Response, Router } from "express";
import { MoviesController } from "../controllers/moviesController";
import { asyncHandler } from "../lib/asyncHandler";

const moviesController = new MoviesController();

export const getAllMovies = Router().use("/", asyncHandler((req: Request, res: Response) => moviesController.getAllMovies(req, res), "getAllMovies"));
export const getMoviePremieres = Router().use("/", asyncHandler((req: Request, res: Response) => moviesController.getMoviePremieres(req, res), "getMoviePremieres"));
export const getMovie = Router().use("/", asyncHandler((req: Request, res: Response) => moviesController.getMovieById(req, res), "getMovie"));

import { Request, Response, Router } from "express";
import { MoviesController } from "../controllers/moviesController";
import { MovieRepository } from "../repositories/moviesRepository";
import { asyncHandler } from "../lib/asyncHandler";

const repo = new MovieRepository();
const moviesController = new MoviesController(repo);

export const getAllMovies = Router().use("/", asyncHandler((req: Request, res: Response) => moviesController.getAllMovies(req, res), "getAllMovies"));
export const getMoviePremieres = Router().use("/", asyncHandler((req: Request, res: Response) => moviesController.getMoviePremieres(req, res), "getMoviePremieres"));
export const getMovie = Router().use("/", asyncHandler((req: Request, res: Response) => moviesController.getMovieById(req, res), "getMovie"));

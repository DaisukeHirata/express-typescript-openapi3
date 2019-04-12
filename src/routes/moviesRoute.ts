import { Router } from "express";
import { getMovies, getMovie } from "../controllers/movies";
import { asyncHandler } from "../lib/asyncHandler";

export const moviesGet = Router().use("/", asyncHandler(getMovies, "moviesGet"));
export const movieGet = Router().use("/", asyncHandler(getMovie, "movieGet"));

import { Request, Response, Router } from "express";
import { Container } from "inversify";
import { CinemasController } from "../controllers/cinemasController";
import { asyncHandler } from "../lib/asyncHandler";
import { TYPES } from "../inversify/types";
import { ICinemaRepository } from "../inversify/interfaces";
import * as env from "../env";

const myContainer = env.get("DIContainer") as Container;
const repo = myContainer.get<ICinemaRepository>(TYPES.ICinemaRepository);
const cinemasController = new CinemasController(repo);

export const getCinemasByCity = Router().use("/", asyncHandler((req: Request, res: Response) => cinemasController.getCinemasByCity(req, res), "getCinemasByCity"));
export const getCinemaById = Router().use("/", asyncHandler((req: Request, res: Response) => cinemasController.getCinemaById(req, res), "getCinemaById"));
export const getCinemaSchedulesByMovie = Router().use("/", asyncHandler((req: Request, res: Response) => cinemasController.getCinemaScheduleByMovie(req, res), "getCinemaSchedulesByMovie"));

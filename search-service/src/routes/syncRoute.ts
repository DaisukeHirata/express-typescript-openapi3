import { Router } from "express";
import { postGoodbyeWorld } from "../controllers/goodbyeController";
import { asyncHandler } from "../lib/asyncHandler";

export const goodbyeWorldPost = Router().use("/", asyncHandler(postGoodbyeWorld, "goodbyeWorldPost"));

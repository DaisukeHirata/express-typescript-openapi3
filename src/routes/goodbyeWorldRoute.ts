import { Router } from "express";
import { postGoodbyeWorld } from "../controllers/goodbye";
import { asyncHandler } from "../lib/asyncHandler";

export const goodbyeWorldPost = Router().use("/", asyncHandler(postGoodbyeWorld, "goodbyeWorldPost"));

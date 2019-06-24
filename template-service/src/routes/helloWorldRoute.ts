import { Router } from "express";
import { getHelloWorld, postGoodMorning } from "../controllers/helloController";
import { asyncHandler } from "../lib/asyncHandler";

export const helloWorldGet = Router().use("/", asyncHandler(getHelloWorld, "helloWorldGet"));
export const goodMorningPost = Router().use("/", asyncHandler(postGoodMorning, "goodMorningPost"));

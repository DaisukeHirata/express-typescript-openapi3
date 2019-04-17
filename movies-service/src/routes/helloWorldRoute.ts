import { Router } from "express";
import { getHelloWorld, postHelloWorld } from "../controllers/helloController";
import { asyncHandler } from "../lib/asyncHandler";

export const helloWorldGet = Router().use("/", asyncHandler(getHelloWorld, "helloWorldGet"));
export const helloWorldPost = Router().use("/", asyncHandler(postHelloWorld, "helloWorldPost"));

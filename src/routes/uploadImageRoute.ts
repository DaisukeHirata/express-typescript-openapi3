import { Router } from "express";
import { postUploadImage } from "../controllers/uploadImage";
import { asyncHandler } from "../lib/asyncHandler";

export const uploadImagePost = Router().use("/", asyncHandler(postUploadImage, "uploadImagePost"));

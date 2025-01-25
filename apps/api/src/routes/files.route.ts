import express, { Request, Response } from "express";
import { getFiles, upload, uploadFile } from "../controllers/files.controller";
import { fileValidationSchema } from "../validations/file.validations";
import validate from "../middlewares/validate";

export const router = express.Router();
router.route("/upload").post(validate(fileValidationSchema),upload.single("file"), uploadFile)
router.route("/get").get(getFiles)
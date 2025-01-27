import express from "express";
import {
  createDirectory,
  getFileOrDirectoryById,
  getFilesAndDirectories,
  upload,
  uploadFile,
} from "../controllers/files.controller";
import validate from "../middlewares/validate";
import { directoryValidationSchema } from "../validations/directory.validations";
import { fileValidationSchema } from "../validations/file.validations";

export const router = express.Router();
router
  .route("/upload/file")
  .post(validate(fileValidationSchema),upload.single("file"), uploadFile);
router.route("/upload/directory").post(validate(directoryValidationSchema), createDirectory);
router.route("/get").get(getFilesAndDirectories);
router.route("/get/:id").get(getFileOrDirectoryById);

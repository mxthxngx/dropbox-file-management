import { NextFunction, Request, Response } from "express";
import multer from "multer";
import multerS3 from "multer-s3";
import s3 from "../config/s3.config";
import ApiError from "../utils/ApiError";
import httpStatus from "../models/http-status.model";
import FileMetadata from "../models/file-metadata.model";

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME || "dropbox-local-bucket",
    key: function (req, file, cb) {
      cb(null, `${file.originalname}`);
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 },
});

const uploadFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      return next(new ApiError(httpStatus.BAD_REQUEST, "No file uploaded."));
    }

    const fileName = req.file.originalname;
    const fileUrl = (req.file as Express.MulterS3.File).location;

    const existingFile = await FileMetadata.findOne({ where: { fileName } });

    if (existingFile) {
      await existingFile.destroy();
    }

    const fileMetadata = await FileMetadata.create({
      fileName: req.file.originalname,
      fileType: req.file.mimetype,
      fileSize: req.file.size,
      lastModified: new Date(),
      s3Path: fileUrl,
    });

    res.json({
      status: "success",
      message: "File uploaded successfully.",
      fileMetadata,
    });
  } catch (error) {
    return next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "File upload failed."));
  }
};

const getFiles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const files = await FileMetadata.findAll();
    if (!files || files.length === 0) {
      return res.json({ files: [] });
    }
    res.json({ files });
  } catch (error) {
    return next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to fetch files."));
  }
};

export { upload, uploadFile, getFiles };
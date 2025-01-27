import { NextFunction, Request, Response } from "express";
import multer from "multer";
import multerS3 from "multer-s3";
import s3 from "../config/s3.config";
import FileMetadata from "../models/file-metadata.model";
import { log } from "@dropbox/logger";
import { normalizePath } from "../utils/normalise";
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


const createDirectory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, directoryPath } = req.body;

    log(`Creating directory with name: ${name} in directory: ${directoryPath}`);
    if (!name || !directoryPath) {
      return res.status(400).json({
        status: "error",
        message: "Name and directoryPath are required.",
      });
    }

    let normalizedDirectoryPath = normalizePath(directoryPath)
    if(!normalizedDirectoryPath.endsWith("/")) {
      normalizedDirectoryPath = `${normalizedDirectoryPath}/`
    }
    const fullPath = `${normalizedDirectoryPath}${name}`;

    const existingDirectory = await FileMetadata.findOne({
      where: { name, directoryPath: fullPath, type: "directory" },
    });

    if (existingDirectory) {
      return res.status(400).json({
        status: "error",
        message: "Directory already exists at the specified path.",
      });
    }

    console.log(`Creating directory with name: ${name} in directory: ${directoryPath}`);
    const newDirectory = await FileMetadata.create({
      name,
      type: "directory",
      directoryPath: fullPath,
      parentPath: directoryPath,
      uploadedAt: new Date(),
    });

    return res.json({
      status: "success",
      message: "Directory created successfully.",
      directory: newDirectory,
    });
  } catch (error) {
    return next(error);
  }
};

const uploadFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { directoryPath } = req.body;

    if (!req.file) {
      return res.status(400).json({
        status: "error",
        message: "No file provided.",
      });
    }

    const normalizedDirectoryPath = normalizePath(directoryPath)

    const fileName = req.file.originalname;
    const fileUrl = (req.file as Express.MulterS3.File).location;
    const fullPath = `${normalizedDirectoryPath}${fileName}`;
    const existingFile = await FileMetadata.findOne({
      where: { name: fileName, directoryPath: fullPath, type: req.file.mimetype },
    });

    if (existingFile) {
      await existingFile.destroy();
    }

    log(`${fileName},${fullPath},${normalizedDirectoryPath}`);
    const fileMetadata = await FileMetadata.create({
      name: fileName,
      type: req.file.mimetype,
      size: req.file.size,
      uploadedAt: new Date(),
      s3Path: fileUrl,
      directoryPath: fullPath,
      parentPath: normalizedDirectoryPath,
    });

    res.json({
      status: "success",
      message: "File uploaded successfully.",
      fileMetadata,
    });
  } catch (error) {
    return next(error);
  }
};

const getFilesAndDirectories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { directoryPath } = req.query;

    if (!directoryPath || typeof directoryPath !== "string" || directoryPath.trim() === "") {
      return res.status(400).json({
        status: "error",
        message: "Valid directory path is required.",
      });
    }

    const normalizedDirectoryPath = normalizePath(directoryPath);
    log(`Getting files and directories for path: ${normalizedDirectoryPath}`);
    const all = await FileMetadata.findAll();
    log(JSON.stringify(all));
    const directoryExists = await FileMetadata.findOne({
      where: {
        directoryPath: normalizedDirectoryPath,
      },
    });

    if (!directoryExists) {
      return res.status(404).json({
        status: "error",
        message: `Directory not found for path: ${normalizedDirectoryPath}`,
      });
    }

    const items = await FileMetadata.findAll({
      where: {
        parentPath: normalizedDirectoryPath,
      }
    });

    log(`Found ${items.length} items for path: ${normalizedDirectoryPath}`);
    res.json({
      status: "success",
      items,
    });
  } catch (error) {
    if (!res.headersSent) {
      return next(error);
    }
  }
};

const getFileOrDirectoryById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // TODO: THIS HAS TO BE MODIFIED,AS FILE WILL BE VIEWED BY PATH
    const { id } = req.params;
    const item = await FileMetadata.findOne({ where: { id } });

    if (!item) {
      return res.status(404).json({
        status: "error",
        message: "Item not found",
      });
    }

    res.json({
      status: "success",
      item,
    });
  } catch (error) {
    return next(error);
  }
};

export { upload, createDirectory, uploadFile, getFilesAndDirectories, getFileOrDirectoryById };
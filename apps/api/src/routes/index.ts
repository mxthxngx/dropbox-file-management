import express, { Request, Response } from "express";
import { S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";
import dotenv from 'dotenv';
dotenv.config();
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});


const s3 = new S3Client({
  region: process.env.AWS_REGION || "us-east-1",
  forcePathStyle: true,
  endpoint: process.env.S3_ENDPOINT_URL || "http://localstack:4566", 
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "test",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "test",
  },
});


const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME || "dropbox-local-bucket", 
    key: function (req, file, cb) {
      cb(null, `${Date.now().toString()}-${file.originalname}`); 
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 }, // Max file size: 10MB
});


router.post("/upload", upload.single("image"), (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const fileUrl = (req.file as Express.MulterS3.File).location;

  res.json({
    message: "File uploaded successfully",
    fileUrl: fileUrl,
  });
});


console.log(`S3 bucket name: ${process.env.S3_BUCKET_NAME}`);
console.log(`Upload endpoint:${process.env.S3_ENDPOINT_URL}`);
export default router;
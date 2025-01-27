import { log } from "@dropbox/logger";
import FileMetadata from "../models/file-metadata.model";

export const createRootDirectoryIfNotExists = async () => {
    try {
      const existingRoot = await FileMetadata.findOne({
        where: { directoryPath: "/" }
      });
  
      if (!existingRoot) {
        await FileMetadata.create({
          name: "/",
          type: "folder",
          directoryPath: "/",
          parentId: null,
          uploadedAt: new Date(),
        });
  
        log("Root directory '/' created successfully.");
      } else {
        log("Root directory '/' already exists.");
      }
    } catch (error) {
      console.error("Error creating root directory:", error);
    }
  };
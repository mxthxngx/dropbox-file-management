import { useState, useCallback } from "react";

import { readBuffer } from "@zoley/react-file-preview";
import { FileMetadata } from "../types/File";
import { MIME_TO_EXTENSION } from "../types/IconMap";

interface PreviewFile {
  filePath: Blob;
  s3Path: string;
  fileType: string;
}

export function useFilePreview() {
  const [previewFile, setPreviewFile] = useState<PreviewFile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const previewFileHandler = useCallback(async (file: FileMetadata) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(file.s3Path);

      if (!response.ok) {
        throw new Error("Failed to fetch file.");
      }

      const fileBlob = await response.blob();
      const filePath = await readBuffer(fileBlob);

      let fileType = file.fileType.toLowerCase();
      fileType = MIME_TO_EXTENSION[fileType] || "unknown";
      console.log(fileType)
      setPreviewFile({ filePath, fileType, s3Path: file.s3Path });
    } catch (err) {
      console.error("Error previewing file:", err);
      setError(err instanceof Error ? err.message : "Error previewing file");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    previewFile,
    isLoading,
    error,
    previewFileHandler,
    setPreviewFile
  };
}
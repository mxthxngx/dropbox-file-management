import { useState, useCallback } from "react";

import { readBuffer } from "@zoley/react-file-preview";
import { FileMetadata } from "../types/file";
import { MIME_TO_EXTENSION } from "../types/icon-map";
import { useLoader } from "./use-loader";
import { setError } from "../redux/slice/error-management-slice";
import { useAppDispatch } from "../redux/store";

interface PreviewFile {
  filePath: Blob;
  s3Path: string;
  fileType: string;
}

export function useFilePreview() {
  const loader = useLoader();
  const dispatch = useAppDispatch();
  const [previewFile, setPreviewFile] = useState<PreviewFile | null>(null);
  const previewFileHandler = useCallback(async (file: FileMetadata) => {
    loader.start();
    try {
      const response = await fetch(file.s3Path);

      if (!response.ok) {
        
        dispatch(setError("Failed to fetch file."));
      }

      const fileBlob = await response.blob();
      const filePath = await readBuffer(fileBlob);

      let fileType = file.fileType.toLowerCase();
      fileType = MIME_TO_EXTENSION[fileType] || "unknown";
      setPreviewFile({ filePath, fileType, s3Path: file.s3Path });
    } catch (err) {
      console.error("Error previewing file:", err);
      dispatch(setError("Error previewing file: " + err));
    } finally {
      loader.stop();
    }
  }, []);

  return {
    previewFile,
    previewFileHandler,
    setPreviewFile
  };
}

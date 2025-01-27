import React, { useState } from "react";
import {
  manageFileApi,
  useUploadFileMutation,
} from "../../redux/rtk-query/file-manager";
import IconTextItem from "./icon-text-item";
import { ArrowUpFromLine } from "lucide-react";
import { ButtonVariantType } from "../../types/button-variant";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { AlertDialogComponent } from "./alert";
import { useLoaderErrorTracker } from "../../hooks/use-loader-tracker";
import { setError } from "../../redux/slice/error-management-slice";
import { useLocation, useParams } from "react-router";
import { normalizePath } from "../../utils/normalise";

export default function AddFile() {
  const files = useAppSelector((state) => state.fileManagement.files);
  const [uploadFile, { isLoading, error }] = useUploadFileMutation();
  const location = useLocation();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [existingFiles, setExistingFiles] = useState<File[]>([]);
  const dispatch = useAppDispatch();
  const [refetchFiles] = manageFileApi.endpoints.getFiles.useLazyQuery();
  const  directoryPath  = location.pathname.slice(1) || "/";  
  const normalizedDirectoryPath = normalizePath(directoryPath);

  useLoaderErrorTracker({ isLoading,error });
  const handleFileUpload = async () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.multiple = true;
    fileInput.onchange = async (event) => {
      const selected = Array.from((event.target as HTMLInputElement).files || []);
      const existing = selected.filter((file) =>
        files.some((f) => f.fileName === file.name)
      );
      const newFiles = selected.filter(
        (file) => !files.some((f) => f.fileName === file.name)
      );
      const maxFileSize = 10 * 1024 * 1024; 
      const oversizedFiles = newFiles.filter(file => file.size > maxFileSize);
  
      if (oversizedFiles.length > 0) {
        dispatch(setError("One or more files exceed the 10MB limit. Please select smaller files."));
      }
      if (existing.length > 0) {
        setExistingFiles(existing);
        setSelectedFiles(newFiles);
        setDialogOpen(true);
      } else {
        await uploadMultipleFiles(newFiles);
      }

    };
    fileInput.click();
  };

  const uploadMultipleFiles = async (fileList: File[]) => {
    try {
      const uploadPromises = fileList.map((file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("directoryPath", normalizedDirectoryPath);
        return uploadFile(formData).unwrap();
      });
      await Promise.all(uploadPromises);
      console.log("Files uploaded successfully");
      refetchFiles({ directoryPath: normalizedDirectoryPath});
    } catch (error) {
      dispatch(setError("Error uploading files"));
    }
  };

  const handleReplaceFiles = async () => {
    try {
      const replacePromises = existingFiles.map((file) => {
        const formData = new FormData();
        formData.append("file", file);
        return uploadFile(formData).unwrap();
      });
      await Promise.all(replacePromises);
      if (selectedFiles.length > 0) {
        await uploadMultipleFiles(selectedFiles);
      }

      setDialogOpen(false);
      setExistingFiles([]);
      setSelectedFiles([]);
      refetchFiles({ directoryPath: normalizePath(directoryPath) });
    } catch (error) {
      console.error("Error replacing files:", error);
    }
  };

  const handleCancel = () => {
    setDialogOpen(false);
    setExistingFiles([]);
    setSelectedFiles([]);
  };

  return (
    <>
      {!isLoading && !isDialogOpen && (
        <IconTextItem
          className="bg-muted/70 text-gray-900 dark:bg-muted/40 dark:text-gray-200 dark:hover:bg-muted/60 hover:bg-muted/95"
          variant={ButtonVariantType.Default}
          icon={<ArrowUpFromLine className="text-grey-500" />}
          onClick={handleFileUpload}
          disabled={isLoading}
        >
          <span className="text-sm font-medium truncate max-w-[250px]">
            Upload Files
          </span>
        </IconTextItem>
      )}
      {isDialogOpen && (
        <AlertDialogComponent
          title="Files already exist"
          cancelText="Cancel"
          confirmText="Replace Files"
          onConfirm={handleReplaceFiles}
          onCancel={handleCancel}
          isOpen={isDialogOpen}
        >
          <div className="text-gray-200">
            The following files already exist:
            <div className="mt-2 text-sm">
        {existingFiles.map((file) => (
          <div key={file.name} className="list-item">
            <strong>{file.name}</strong>
          </div>
        ))}
      </div>
            <div className="mt-4">
              Do you want to replace the existing files? New files will be
              uploaded automatically.
            </div>
          </div>
        </AlertDialogComponent>
      )}
    </>
  );
}
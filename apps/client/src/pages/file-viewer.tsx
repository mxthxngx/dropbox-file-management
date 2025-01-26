import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { FileViewer } from "@zoley/react-file-preview";
import { AlertDialogComponent } from "../components/common/alert";
import { useGetFileByIdQuery } from "../redux/rtk-query/file-manager";
import { useLoaderErrorTracker } from "../hooks/use-loader-tracker";
import { useFilePreview } from "../hooks/use-file-viewer";
import Layout from "../layout";
export default function FileDisplay() {
  const { fileId } = useParams();
  const navigate = useNavigate();
  const { isLoading, isError, error, data: file, isSuccess } = useGetFileByIdQuery(fileId);
    useLoaderErrorTracker({ isLoading, error});
  const { previewFile, previewFileHandler } = useFilePreview();

  useEffect(() => {
    if (isSuccess && file) {
      previewFileHandler(file);
    }
  }, [isSuccess, file, previewFileHandler]);
  if (!file && !isLoading) {
    return (
      <AlertDialogComponent
        title="File not found"
        onConfirm={() => navigate("/")}
      />
    );
  }

  if (isLoading || !previewFile || isError) {
    return null;
  }

  return (
    <Layout>
    <div className="w-full h-full">
      {previewFile.fileType === "unknown" ? (
        <div className="text-center">
          <div>File type preview not supported, Please download to view</div>
        </div>
      ) : (
        <FileViewer
          fileType={previewFile.fileType}
          filePath={previewFile.filePath}
        />
      )}
    </div>
    </Layout>
  );
}


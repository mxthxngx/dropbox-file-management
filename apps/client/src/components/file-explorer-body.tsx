import React, { useEffect } from "react";
import { FileDataTable } from "./file-data-table";
import { useGetFilesQuery } from "../redux/rtk-query/file-manager";
import { useLoaderErrorTracker } from "../hooks/use-loader-tracker";
import { useLocation, useNavigate } from "react-router";
import { normalizePath } from "@dropbox/utils";

export function FileExplorerBody() {
  const location = useLocation();
  const navigate = useNavigate();
  const directoryPath = location.pathname.slice(1) || "/";
  const normalizedDirectoryPath = normalizePath(directoryPath);
  console.log("normalizedDirectoryPath", normalizedDirectoryPath);
  const { data: files, isLoading, error, refetch } = useGetFilesQuery({ directoryPath: normalizedDirectoryPath ? normalizedDirectoryPath : "/" });
  useLoaderErrorTracker({ isLoading });

  useEffect(() => {
    if (error) {
      navigate("/");
    }
  }, [error, navigate]);
  useEffect(() => {
    refetch();
  }, [location.pathname, refetch]);
  return (
    <div className="w-full p-2 max-h-[60vh] sm:max-h-[70vh] md:max-h[65h] ]">
      {
        <>
          {files ? (
            <FileDataTable />
          ) : (
            <div className="text-gray-500">Nothing to see here!</div>
          )}
        </>
      }
    </div>
  );
}

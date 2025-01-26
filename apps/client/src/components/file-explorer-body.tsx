import React from "react";
import { FileDataTable } from "./file-data-table";
import { useGetFilesQuery } from "../redux/rtk-query/file-manager";
import { useLoaderErrorTracker } from "../hooks/use-loader-tracker";

export function FileExplorerBody() {
  const { data: files, isLoading,  error } = useGetFilesQuery();
  useLoaderErrorTracker({ isLoading, error });


  return (
    <div className="w-full p-2 max-h-[60vh] sm:max-h-[70vh] md:max-h[65h] ]">
      { 
        <>
          {files && files.length > 0 ? (
            <FileDataTable />
          ) : (
            <div className="text-gray-500">Nothing to see here!</div>
          )}
        </>
      }
    </div>
  );
}

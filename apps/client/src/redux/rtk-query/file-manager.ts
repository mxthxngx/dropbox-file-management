import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "./api";
import { FileMetadata } from "../../types/file";

interface UploadStatusResponse {
  status: string;
  message: string;
}
interface DirectoryUploadRequest 
{
  name: string;
  directoryPath: string;
}

export const manageFileApi = api.injectEndpoints({
  endpoints: (build) => ({
    uploadFile: build.mutation<UploadStatusResponse, FormData>({
      query: (formData) => ({
        url: "/upload/file",
        method: "POST",
        body: formData,
      }),
    }),
    uploadDirectory: build.mutation<UploadStatusResponse, DirectoryUploadRequest>({
      query: (directory) => ({
        url: "/upload/directory",
        method: "POST",
        body: directory,
      }),
    }),
    getFiles: build.query<FileMetadata[], { directoryPath?: string }>({
      query: ({ directoryPath } = {}) => {
        const queryParams = directoryPath ? `?directoryPath=${directoryPath}` : "";
        return `/get${queryParams}`;
      },
      transformResponse: (response: { items: FileMetadata[] }) => {
        const isProd = import.meta.env.MODE !== "production";
        const transformedFiles = response.items.map((file) => {
          const originalPath = file.s3Path;
          if (!file.s3Path) {
            return { ...file, s3Path: undefined };
          }
          const transformedPath = isProd
            ? originalPath
            : originalPath.replace("localstack", "localhost");

          return {
            ...file,
            s3Path: transformedPath,
          };
        });
        return transformedFiles;
      },
    }),
    getFileById: build.query<FileMetadata, string>({
      query: (id) => `/get/${id}`,
      transformResponse: (response: { file: FileMetadata }) => {
        const isProd = import.meta.env.MODE !== "production";

        const originalPath = response.file.s3Path;
        const transformedPath = isProd
          ? originalPath
          : originalPath.replace("localstack", "localhost");
        return {
          ...response.file,
          s3Path: transformedPath,
        };
      },
    }),
  }),
});

export const { useUploadFileMutation, useGetFilesQuery, useGetFileByIdQuery,useUploadDirectoryMutation } =
  manageFileApi;

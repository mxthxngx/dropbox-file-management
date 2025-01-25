import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { api } from './api'
import { FileMetadata } from '../../types/file'

interface UploadStatusResponse {
  status: string,
  message: string
}

export const manageFileApi = api.injectEndpoints({
  endpoints: (build) => ({
    uploadFile: build.mutation<UploadStatusResponse, FormData>({
      query: (formData) => ({
        url: '/upload',
        method: 'POST',
        body: formData,
      }),
    }),
    getFiles: build.query<FileMetadata[], void>({
      query: () => '/get',
      transformResponse: (response: { files: FileMetadata[] }) => {
        const isProd = import.meta.env.MODE !== 'production';

        const transformedFiles = response.files.map(file => {
          const originalPath = file.s3Path;
          const transformedPath = isProd ? originalPath : originalPath.replace('localstack', 'localhost');

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
        const isProd = import.meta.env.MODE !== 'production';

        const originalPath = response.file.s3Path;
        const transformedPath = isProd ? originalPath : originalPath.replace('localstack', 'localhost');
        return {
          ...response.file,
          s3Path: transformedPath,
        };
      },
    }),
  })
})

export const {
  useUploadFileMutation,
  useGetFilesQuery,
  useGetFileByIdQuery
} = manageFileApi
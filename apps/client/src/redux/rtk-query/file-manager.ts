import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { api } from './api'
import { FileMetadata } from '../../types/File'

interface UploadStatusResponse {
  status: string,
  message:string
}


export const manageFileApi = api.injectEndpoints({
  endpoints:(build)=>({
    uploadFile: build.mutation<UploadStatusResponse, FormData>({
      query: (formData) => ({
        url: '/upload',
        method: 'POST',
        body: formData,
      }),
    }),
    getFiles: build.query<FileMetadata[], void>({
      query: () => '/get',
      transformResponse: (response: { files: FileMetadata[] }) => response.files,
    }),
  })
})

export const {
  useUploadFileMutation,
  useGetFilesQuery
} = manageFileApi
import React from 'react'
import { FileDataTable } from './file-data-table'
import { useGetFilesQuery } from '../redux/rtk-query/file-manager'
import { useLoaderError } from '../hooks/use-loader-error'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { SerializedError } from '@reduxjs/toolkit'


export function FileExplorerBody() {
  const { data: files, isLoading, isError, error } = useGetFilesQuery()

  const loaderErrorComponent = useLoaderError({
    isLoading,
    isError,
    error: (error as FetchBaseQueryError)?.data as string || 'Unknown error occurred',
    statusCode: (error as SerializedError)?.name,
  })

  return (
    <div className='w-full min-h-[600px] max-h-72  p-2'>
      {loaderErrorComponent ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {loaderErrorComponent} 
        </div>
      ) : (
        <>
          {files && files.length > 0 ? (
            <FileDataTable />
          ) : (
            <div className='text-gray-500'>Nothing to see here!</div>
          )}
        </>
      )}
    </div>
  )
}
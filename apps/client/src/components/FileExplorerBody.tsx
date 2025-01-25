import React, { useState } from 'react'
import {FileDataTable} from './FileDataTable'
import { useGetFilesQuery } from '../redux/rtk-query/file-manager'
import { LoadingSpinner } from './common/Loader';
import { AlertDialogComponent } from './common/Alert';
import ErrorDialogComponent from './common/ErrorDialogComponent';
export function FileExplorerBody() {
  const { data: files, isLoading, isError,error } = useGetFilesQuery();

  if (isLoading) {
    return (
      <div className='w-full min-h-[400px] max-h-72 overflow-y-auto flex items-center justify-center'>
        <LoadingSpinner />
      </div>
    );
  }

  if (isError ) {
    return (
      <ErrorDialogComponent   title="Failed to fetching body"
      description={
        error['data']}
      />
    );
  }

  return (
    <div className='w-full min-h-[600px] max-h-72 overflow-y-auto mt-2 p-8'>
      {files.length > 0 ? (
        <FileDataTable  />
      ) : (
        <div className='text-gray-500'>
          Nothing to see here!
        </div>
      )}
    </div>
  );
}
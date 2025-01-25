import { CardDescription, CardHeader, CardTitle } from '@dropbox/ui/components/card'
import React from 'react'
import AddFile from './common/AddFile'
import { useAppSelector } from '../redux/store'

export default function FileExplorerHeading() {
  const files = useAppSelector((state) => state.fileManagement.files)
  return (
    <CardHeader>
      <div className='flex flex-col sm:flex-row justify-between items-center'>
        <div className='mb-2 sm:mb-0 text-center sm:text-left'>
          <CardTitle className='text-xl'>Dropbox</CardTitle>
          <CardDescription>{files.length} Files</CardDescription>
        </div>
        <AddFile/>
      </div>
    </CardHeader>
  )
}
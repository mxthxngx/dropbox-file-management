import React from 'react'

import { FolderPlus } from 'lucide-react'
import IconTextItem from './IconTextItem'

export default function AddFolder() {
  return (

        <IconTextItem  icon={<FolderPlus className="text-blue-500" />} 
        title="Add Folder" 
        onClick={() => console.log('folder add clicked')} />

  )
}

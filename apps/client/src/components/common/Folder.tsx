import React from 'react';
import { Folder as FolderIcon } from 'lucide-react';
import IconTextItem from './IconTextItem'

export default function Folder() {
  return (

        <IconTextItem  icon={<FolderIcon className="text-blue-500" />} 
        title="Folder" 
        onClick={() => console.log('folder clicked')} />

  )
}

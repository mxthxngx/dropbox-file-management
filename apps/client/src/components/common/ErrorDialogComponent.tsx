import React, { useState } from 'react'
import { AlertDialogComponent } from './Alert'

interface ErrorDialogProps {
    title: string;
    description: string;
}
export default function ErrorDialogComponent({title, description}: ErrorDialogProps) {
  const [isDialogOpen, setDialogOpen] = useState(true);

    const handleCloseDialog = () => {
        setDialogOpen(false);
      }
    
  return (
    <AlertDialogComponent 
           title={title}
           description={description}
           isOpen={isDialogOpen} 
           onClose={handleCloseDialog} 
           onCancel={handleCloseDialog} 
           onConfirm={() => {}} 
         />
  )
}

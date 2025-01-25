import React, { useState } from 'react';
import { AlertDialogComponent } from './alert';

interface ErrorDialogProps {
  title?: string;
  message?: string;
  errorCode?: string;
}

export default function ErrorDialogComponent({ 
  title = "This is embarrassing!", 
  message = "Something isn't working right now. Please contact our support for assistance.", 
  errorCode = "500" 
}: ErrorDialogProps) {
  const [isDialogOpen, setDialogOpen] = useState(true);

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <AlertDialogComponent
      title={title}
      isOpen={isDialogOpen}
      confirmText="Oh, Okay."
      onConfirm={handleCloseDialog}
    >
      <span className="whitespace-pre-wrap break-words overflow-x-auto block">
        {`Error Code: ${errorCode}\n${message}`}
      </span>
    </AlertDialogComponent>
  );
}
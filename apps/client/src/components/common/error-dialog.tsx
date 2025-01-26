import React, { useState } from "react";
import { AlertDialogComponent } from "./alert";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { clearError } from "../../redux/slice/error-management-slice";

export default function ErrorDialogComponent() {
  const [isDialogOpen, setDialogOpen] = useState(true);
  const message = useAppSelector((state) => state.errorManagement.message);
  const dispatch = useAppDispatch()
  if(!message) {
    return null;
  }

  const handleCloseDialog = () => {
    setDialogOpen(false);
    dispatch(clearError());
  };

  return (
    <AlertDialogComponent 
      title="Oops!"
      isOpen={isDialogOpen}
      confirmText="Oh, Okay."
      onConfirm={handleCloseDialog}
    >
      <span className="whitespace-pre-wrap break-words overflow-x-auto block">
        {message}
      </span>
    </AlertDialogComponent>
  );
}

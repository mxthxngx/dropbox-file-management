import React, {  useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { AlertDialogComponent } from "../components/common/alert";

  function FallbackComponent({ error, resetErrorBoundary }) {
  const [isDialogOpen, setDialogOpen] = useState(true);

  const handleCloseDialog = () => {
    setDialogOpen(false);
    resetErrorBoundary()
  };

  return (
    <AlertDialogComponent 
      title="Oops!"
      isOpen={isDialogOpen}
      confirmText="Try Again."
      onConfirm={handleCloseDialog}
    >
      <span className="whitespace-pre-wrap break-words overflow-x-auto block">
        {error.message}
      </span>
    </AlertDialogComponent>
  );
}
export default function ReactErrorBoundary(props) {
  return (
    <ErrorBoundary
      FallbackComponent={FallbackComponent}
      onError={(error, errorInfo) => {
        console.log("Error caught!");
        console.error(error);
        console.error(errorInfo);
      }}
      onReset={() => {
        console.log("reloading the page...");
        window.location.reload();
      }}
    >
      {props.children}
    </ErrorBoundary>
  );
}

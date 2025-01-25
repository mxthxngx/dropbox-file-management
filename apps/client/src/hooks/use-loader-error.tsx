import { useEffect, useState } from "react";
import { LoadingSpinner } from "../components/common/loader";
import React from "react";
import ErrorDialogComponent from "../components/common/error-dialog";
export interface LoaderErrorHookProps {
  isLoading?: boolean;
  error?: string;
  statusCode?: string;
  isError?: boolean;
}

export const useLoaderError = ({ isLoading, error, isError ,statusCode}: LoaderErrorHookProps) => {
  const [component, setComponent] = useState<JSX.Element | null>(null);

  useEffect(() => {
    if (isLoading) {
      setComponent(
          <LoadingSpinner />

      );
    } else if (isError) {
      setComponent(
        <ErrorDialogComponent
          title="An Error Occurred"
          message={error}
         errorCode={statusCode}
        />
      );
    } else {
      setComponent(null);
    }
  }, [isLoading, isError, error]); 

  return component; 
};
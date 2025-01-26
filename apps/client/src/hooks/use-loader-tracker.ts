import { useEffect } from "react";
import { useLoader } from "./use-loader";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { setError } from "../redux/slice/error-management-slice";
import React from "react";


interface LoaderErrorTrackerProps {
  isLoading?: boolean;
  error?: Error | FetchBaseQueryError | SerializedError | { data?: any } | null;
}

export const useLoaderErrorTracker = ({ isLoading, error }: LoaderErrorTrackerProps) => {
  const loader = useLoader();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoading) {
      loader.start();
    } else {
      loader.stop();
    }
  }, [isLoading]);

  useEffect(() => {
    if (error) {
      loader.stop();

      const errorMessage =
        error instanceof Error
          ? error.message
          : "data" in error && error.data && error.data.message
          ? error.data.message
          : "An error occurred";
      dispatch(setError(errorMessage));
    }
  }, [error, dispatch, loader]);
};
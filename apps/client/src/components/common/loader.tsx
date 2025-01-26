import React from "react";
import { cn } from "@dropbox/ui/lib/utils";
import { AlertDialog } from "@dropbox/ui/components/alert-dialog";

export const LoadingSpinner = () => {
  return (
    <AlertDialog open={true}>
      <div
        className="fixed inset-0 flex items-center justify-center bg-transparent text-black dark:text-white z-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn("animate-spin")}
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
      </div>
    </AlertDialog>
  );
};
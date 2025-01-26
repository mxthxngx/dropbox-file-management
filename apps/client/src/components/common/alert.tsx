import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@dropbox/ui/components/alert-dialog";

type AlertDialogProps = {
  title: string;
  cancelText?: string | null;
  confirmText?: string | null;
  onConfirm?: () => void;
  onCancel?: () => void;
  isOpen?: boolean;
  maxHeight?: number;
  children?: React.ReactNode;
};

export function AlertDialogComponent({
  title,
  cancelText,
  confirmText = "Confirm",
  onConfirm,
  onCancel,
  isOpen = true,
  children,
}: AlertDialogProps) {
  return (
    <AlertDialog open={isOpen} >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription
            className={`max-w-[400px] max-h-[400px] text-wrap overflow-y-auto text-gray-300`}
          >
            {children}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {cancelText && (
            <AlertDialogCancel onClick={onCancel}>
              {cancelText}
            </AlertDialogCancel>
          )}
          <AlertDialogAction onClick={onConfirm}>
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

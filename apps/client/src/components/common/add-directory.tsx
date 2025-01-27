import React, { useState } from "react";

import {
  manageFileApi,
  useUploadDirectoryMutation,
} from "../../redux/rtk-query/file-manager";
import IconTextItem from "./icon-text-item";
import { FolderPlus } from "lucide-react";
import { ButtonVariantType } from "../../types/button-variant";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useLoaderErrorTracker } from "../../hooks/use-loader-tracker";
import { setError } from "../../redux/slice/error-management-slice";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription } from "@dropbox/ui/components/alert-dialog";
import { useLocation } from "react-router";
import { Button } from "@dropbox/ui/components/button";
import { Input } from "@dropbox/ui/components/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@dropbox/ui/components/tooltip";
import { normalizePath } from "../../utils/normalise";
import { FileMetadata } from "src/types/file";



export default function AddDirectory() {
  const location = useLocation();
  const directoryPath = location.pathname.slice(1) || "/";
  const [uploadDirectory, { isLoading, error }] = useUploadDirectoryMutation();
  const [directoryName, setDirectoryName] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [refetchFiles] = manageFileApi.endpoints.getFiles.useLazyQuery();
  useLoaderErrorTracker({ isLoading, error });
  const normalizedDirectoryPath = normalizePath(directoryPath);
  const existingItems = useAppSelector((state) => state.fileManagement.files);
  const handleCreateDirectory = async () => {
    if (!directoryName || directoryName.trim() === "") {
      dispatch(setError("Directory name cannot be empty"));
      return;
    }

    const isDirectoryExists = existingItems.some(
      (item:FileMetadata) => item.name === directoryName && item.type === "directory"
    );
    if(isDirectoryExists){
      setIsDialogOpen(false);
      dispatch(setError("Directory already exists"));
      return;
    }

    try {
      await uploadDirectory({
        name: directoryName,
        directoryPath: normalizedDirectoryPath,
      });

      setDirectoryName("");
      setIsDialogOpen(false);
      refetchFiles({ directoryPath: normalizedDirectoryPath });
    } catch (error) {
      dispatch(setError("Error creating directory"));
    }
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDirectoryName("");
    setIsDialogOpen(false);
  };

  return (
    <>
      {!isLoading && <TooltipProvider>
        <Tooltip>
          <TooltipTrigger> <IconTextItem
            className="bg-muted/70 text-gray-900 dark:bg-muted/40 dark:text-gray-200 dark:hover:bg-muted/60 hover:bg-muted/95"
            variant={ButtonVariantType.Default}
            icon={<FolderPlus className="text-grey-500" />}
            onClick={handleOpenDialog}
          /></TooltipTrigger>
          <TooltipContent>
            <p>Create Directory</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      }


      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Create Directory</AlertDialogTitle>
            <AlertDialogDescription>
              Enter the name of the directory you want to create.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Directory name"
              value={directoryName}
              onChange={(e) => setDirectoryName(e.target.value)}
            />
          </div>
          <AlertDialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button onClick={handleCreateDirectory}>Create</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
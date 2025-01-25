import React, { useState } from 'react';
import { manageFileApi,  useUploadFileMutation } from '../../redux/rtk-query/file-manager';
import IconTextItem from './icon-text-item';
import { ArrowUpFromLine } from 'lucide-react';
import { ButtonVariantType } from '../../types/button-variant';
import {  useAppSelector } from '../../redux/store';
import { AlertDialogComponent } from './alert';
import { useLoaderError } from '../../hooks/use-loader-error';

export default function AddFile() {
  const files = useAppSelector((state) => state.fileManagement.files);
  const [uploadFile, { isLoading, isError, error }] = useUploadFileMutation();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [refetchFiles] = manageFileApi.endpoints.getFiles.useLazyQuery();

  const loaderErrorComponent = useLoaderError({
    isLoading,
    isError,
    error: error && 'data' in error ? error.data["message"] : "",
      // @ts-ignore
    statusCode: error ? error.status : undefined,
  });
  const handleFileUpload = async () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.onchange = async (event) => {
      const file = (event.target as HTMLInputElement).files[0];
      if (!file) return;

      const isFileExist = files.some(f => f.fileName === file.name);
      if (isFileExist) {
        setSelectedFile(file);
        setDialogOpen(true);
      } else {
        await uploadNewFile(file);
      }
    };
    fileInput.click();
  };

  const uploadNewFile = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      await uploadFile(formData).unwrap();
      console.log('File uploaded successfully');
      refetchFiles();
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleReplaceFile = async () => {
    if (!selectedFile) return;
    await uploadNewFile(selectedFile);
    setDialogOpen(false);
  };

  const handleCancel = () => {
    setDialogOpen(false);
  };
  return (
    <>
     {!isLoading && !isDialogOpen &&  <IconTextItem className="bg-muted/70 text-gray-900 dark:bg-muted/40 dark:text-gray-200 dark:hover:bg-muted/60 hover:bg-muted/95"
        variant={ButtonVariantType.Default}
        icon={<ArrowUpFromLine className="text-grey-500" />}
        title="Upload File"
        onClick={handleFileUpload}
        disabled={isLoading}
      />
     }
      {loaderErrorComponent}
      {isDialogOpen && (
        <AlertDialogComponent
          title="Are you absolutely sure?"
          cancelText='Cancel'
          onConfirm={handleReplaceFile}
          onCancel={handleCancel}
          isOpen={isDialogOpen}
        >
          <div className="text-gray-200">
            A file with the name <strong>{selectedFile?.name}</strong> already exists. Do you want to replace it?
          </div>
        </AlertDialogComponent>
      )}

    </>
  );
}
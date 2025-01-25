import React, { useState } from 'react';
import { useGetFilesQuery, useUploadFileMutation } from '../../redux/rtk-query/file-manager';
import { setFiles } from '../../redux/slice/file-management-slice';
import IconTextItem from './IconTextItem';
import { ArrowUpFromLine } from 'lucide-react';
import { ButtonVariantType } from '../../types/ButtonVariant';
import { useAppDispatch,useAppSelector } from '../../redux/store';
import { AlertDialogComponent } from './Alert';
import ErrorDialogComponent from './ErrorDialogComponent';

export default function AddFile() {
  const dispatch = useAppDispatch();
  const files = useAppSelector((state) => state.fileManagement.files); 
  const [uploadFile, { isLoading , isError ,error}] = useUploadFileMutation();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { refetch: refetchFiles } = useGetFilesQuery();

  const handleFileUpload = async () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.onchange = async (event) => {
      const file = (event.target as HTMLInputElement).files[0];
      if (!file) return;

      // Check if file already exists in global state
      const isFileExist = files.some(f => f.fileName === file.name);
      if (isFileExist) {
        setSelectedFile(file);
        setDialogOpen(true);
      } else {
        await uploadNewFile(file);
        refetchFiles();
      }
    };
    fileInput.click();
  };

  const uploadNewFile = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      await uploadFile(formData).unwrap();

      dispatch(setFiles([...files, { fileName: file.name, fileSize: file.size }]));
      console.log('File uploaded successfully');
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
      <IconTextItem  className="bg-muted/70 text-gray-900 dark:bg-muted/40 dark:text-gray-200 dark:hover:bg-muted/60 hover:bg-muted/95"
        variant={ButtonVariantType.Default} 
        icon={<ArrowUpFromLine className="text-grey-500" />} 
        title="Upload File" 
        onClick={handleFileUpload} 
      />
       {isError && (
        <ErrorDialogComponent
          title="Failed to upload file"
          description={
            error['data']
             
          }
        />
      )}

     {isDialogOpen && (
        <AlertDialogComponent
          title="Are you absolutely sure?"
          description="This file already exists. Do you want to replace it? This action cannot be undone."
          onConfirm={handleReplaceFile}
          onCancel={handleCancel}
          isOpen={isDialogOpen} 
          onClose={handleCancel}
        />
      )}
 
    </>
  );
}
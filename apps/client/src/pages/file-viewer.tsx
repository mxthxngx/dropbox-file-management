import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { FileViewer } from "@zoley/react-file-preview";
import { AlertDialogComponent } from '../components/common/alert';
import { useGetFileByIdQuery } from '../redux/rtk-query/file-manager';
import { useLoaderError } from '../hooks/use-loader-error';
import { useFilePreview } from '../hooks/use-file-viewer';
export default function FileDisplay() {
    const { fileId } = useParams();
    const navigate = useNavigate();
    const { isLoading, isError, error, data: file } = useGetFileByIdQuery(fileId);
    const loaderErrorComponent = useLoaderError({
        isLoading,
        isError: !!error,
        // @ts-ignore
        error: error ? error.status : undefined,
    });
    const { previewFile, previewFileHandler } = useFilePreview()
    useEffect(() => {
        if (file && !isLoading && !isError) {
            previewFileHandler(file)
        }
    }, [file])

    if (!file) {
        return <AlertDialogComponent title="File not found" onConfirm={() => navigate('/')} />;
    }

    if(isLoading || !previewFile ||isError)
    {
        return loaderErrorComponent;
    }
    console.log(isLoading, isError, error);
    return (
        <div className='w-full h-full'>
            {(isLoading || isError) ? loaderErrorComponent : <FileViewer fileType={previewFile.fileType} filePath={previewFile.filePath} />
            }
        </div>
    );
};

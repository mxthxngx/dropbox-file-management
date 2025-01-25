import React from "react"
import { FileViewer } from "@zoley/react-file-preview"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from '@dropbox/ui/components/alert-dialog'
import { LoadingSpinner } from './Loader'
import { Button } from '@dropbox/ui/components/button'
import ErrorDialogComponent from './ErrorDialogComponent'
import { useDownload } from "../../hooks/use-download"

interface PreviewFileProps {
    fileType: string,
    filePathBlob: Blob,
    s3Path: string,
    isLoading?: boolean,
    error?: string,
    onClose?: () => void
}

export default function FilePreview({
    fileType,
    filePathBlob,
    isLoading,
    error,
    s3Path,
    onClose
}: PreviewFileProps) {

    const { download } = useDownload()

    if (error) {
        return <ErrorDialogComponent title="Preview Failed" description="Failed to preview file" />
    }

    if (isLoading) {
        return <LoadingSpinner />
    }

    console.log({ fileType, filePathBlob, s3Path })

    return (
        <AlertDialog open={true}>
            <AlertDialogContent className="max-w-lg w-full">
                <AlertDialogHeader>
                    <div className="flex justify-between items-center">
                        <AlertDialogTitle className="text-xl font-semibold">File Preview</AlertDialogTitle>
                    </div>
                    <AlertDialogDescription>Let's quickly take a quick look</AlertDialogDescription>
                </AlertDialogHeader>

                <div className="p-4" style={{ height: '400px', overflowY: 'auto' }}>
                    <FileViewer fileType={fileType} filePath={filePathBlob} />
                </div>

                <div className="flex justify-between px-4 py-2">
                    <AlertDialogAction asChild>
                        <Button variant="outline" className="hover:text-gray-700" onClick={() => download(s3Path)}>
                            Download
                        </Button>
                    </AlertDialogAction>

                    <AlertDialogCancel asChild>
                        <Button variant="ghost" onClick={() => onClose && onClose()}>
                            Close
                        </Button>
                    </AlertDialogCancel>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}
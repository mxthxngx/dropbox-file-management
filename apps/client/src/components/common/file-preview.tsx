import React from "react";
import { FileViewer } from "@zoley/react-file-preview";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@dropbox/ui/components/alert-dialog";
import { Button } from "@dropbox/ui/components/button";
import { useDownload } from "../../hooks/use-download";
import { useCopyToClipboard } from "../../hooks/use-clipboard";

interface PreviewFileProps {
    fileType: string;
    filePathBlob: Blob;
    s3Path: string;
    isLoading?: boolean;
    error?: string;
    onClose?: () => void;
    height?: string;   
    width?: string;   
}

export default function FilePreview({
    fileType,
    filePathBlob,
    height = "400px",
    width = "600px",
    s3Path,
    onClose,
}: PreviewFileProps) {
    const { download } = useDownload();
    const { copyToClipboard, CopyButton } = useCopyToClipboard();

    return (
        <AlertDialog open={true}>
            <AlertDialogContent className="max-w-lg w-full" style={{ width: width }}>
                <AlertDialogHeader>
                    <div className="flex justify-between items-center">
                        <AlertDialogTitle className="text-xl font-semibold">
                            File Preview
                        </AlertDialogTitle>
                    </div>
                    <AlertDialogDescription>
                        Let's quickly take a quick look
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <div className="p-4" style={{ height: height, overflowY: "auto" }}>
                    {fileType === "unknown" ? (
                        <div className="text-center">
                            <p>File type preview not supported</p>
                        </div>
                    ) : (
                        <FileViewer fileType={fileType} filePath={filePathBlob} />
                    )}
                </div>

                <div className="flex justify-between px-4 py-2">
                    <div className="flex items-center space-x-2">
                        <AlertDialogAction asChild>
                            <Button
                                variant="outline"
                                className="hover:text-gray-700"
                                onClick={() => download(s3Path)}
                            >
                                Download
                            </Button>
                        </AlertDialogAction>
                        <CopyButton text={s3Path} />
                    </div>
                    <AlertDialogCancel asChild>
                        <Button variant="ghost" onClick={() => onClose && onClose()}>
                            Close
                        </Button>
                    </AlertDialogCancel>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
}
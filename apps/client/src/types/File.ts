export interface FileMetadata {
    id: string,
    fileName: string,
    fileType: string,
    fileSize: number,
    uploadedAt: Date,
    s3Path: string
    }
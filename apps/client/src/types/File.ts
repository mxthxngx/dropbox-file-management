export interface FileMetadata {
    id: string,
    fileName: string,
    fileType: string,
    fileSize: number,
    lastModified: Date,
    s3Path: string
    }
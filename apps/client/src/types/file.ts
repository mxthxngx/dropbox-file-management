export interface FileMetadata {
  id: string;
  name: string;
  type: string;
  size?: number;
  uploadedAt?: Date;
  s3Path?: string;
  directoryPath: string; 
  parentId?: string; 
}
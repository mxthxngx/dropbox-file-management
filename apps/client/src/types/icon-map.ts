import {
  File,
  FileImage,
  FileText,
  FileJson,
  FileCode,
  FileArchive,
  Folder,
} from "lucide-react";

export const FILE_TYPE_ICONS = {
  // Image files
  "image/png": FileImage,
  "image/jpeg": FileImage,
  "image/gif": FileImage,
  "image/svg+xml": FileImage,
  "image/webp": FileImage,

  // Text-based files
  "text/plain": FileText,
  "text/markdown": FileText,
  "text/html": FileCode,
  "text/css": FileCode,

  // Code files
  "application/json": FileJson,
  "application/javascript": FileCode,
  "application/typescript": FileCode,
  "application/xml": FileCode,

  // directory
  "directory": Folder,
  // Document files
  "application/pdf": File,
  "application/msword": FileText,
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    FileText,

  // Archive files
  "application/zip": FileArchive,
  "application/x-rar-compressed": FileArchive,

  // Default fallback
  default: File,
};

export function getFileTypeIcon(mimeType: string) {
  return (
    FILE_TYPE_ICONS[mimeType as keyof typeof FILE_TYPE_ICONS] ||
    FILE_TYPE_ICONS.default
  );
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export const MIME_TO_EXTENSION: Record<string, string> = {
  // Image files
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/gif": "gif",
  "image/svg+xml": "svg",
  "image/webp": "webp",

  // Text-based files
  "text/plain": "txt",
  "text/markdown": "md",
  "text/html": "html",
  "text/css": "css",

  // Code files
  "application/json": "json",
  "application/javascript": "js",
  "application/typescript": "ts",
  "application/xml": "xml",

  // Document files
  "application/pdf": "pdf",
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "docx",

  // Archive files
  "application/zip": "zip",
  "application/x-rar-compressed": "rar",

  // Default fallback
  default: "file",
};

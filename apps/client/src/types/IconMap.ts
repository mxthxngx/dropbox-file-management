import { 
    File, 
    FileImage, 
    FileText, 
    FileJson,
    FileCode,
    FileArchive,
  } from 'lucide-react'
  
  export const FILE_TYPE_ICONS = {
    // Image files
    'image/png': FileImage,
    'image/jpeg': FileImage,
    'image/gif': FileImage,
    'image/svg+xml': FileImage,
    'image/webp': FileImage,
  
    // Text-based files
    'text/plain': FileText,
    'text/markdown': FileText,
    'text/html': FileCode,
    'text/css': FileCode,
  
    // Code files
    'application/json': FileJson,
    'application/javascript': FileCode,
    'application/typescript': FileCode,
    'application/xml': FileCode,
  
    // Document files
    'application/pdf': File,
    'application/msword': FileText,
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': FileText,
  
    // Archive files
    'application/zip': FileArchive,
    'application/x-rar-compressed': FileArchive,
  
    // Default fallback
    'default': File
  }
  
  export function getFileTypeIcon(mimeType: string) {
    // Return matching icon or default
    return FILE_TYPE_ICONS[mimeType as keyof typeof FILE_TYPE_ICONS] || FILE_TYPE_ICONS.default
  }
  
  export function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes'
    
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }
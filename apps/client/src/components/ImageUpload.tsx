import React, { useState } from 'react';
import { 
  Folder, 
  File as FileIcon, 
  Plus, 
  MoreVertical, 
  ChevronRight, 
  Upload 
} from 'lucide-react';

import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from  '@dropbox/ui/components/card';

import { Input } from  '@dropbox/ui/components/input';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@dropbox/ui/components/dialog';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@dropbox/ui/components/dropdown-menu';
import { Button } from '@dropbox/ui/components/button';

interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  children?: FileItem[];
}

const FileExplorer: React.FC = () => {
  const [files, setFiles] = useState<FileItem[]>([
    {
      id: '1',
      name: 'Documents',
      type: 'folder',
      children: [
        { id: '1-1', name: 'report.pdf', type: 'file' },
        { id: '1-2', name: 'presentation.pptx', type: 'file' }
      ]
    },
    {
      id: '2',
      name: 'Images',
      type: 'folder',
      children: [
        { id: '2-1', name: 'vacation.jpg', type: 'file' }
      ]
    }
  ]);

  const [expandedFolders, setExpandedFolders] = useState<string[]>([]);
  const [newItemName, setNewItemName] = useState('');

  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev => 
      prev.includes(folderId) 
        ? prev.filter(id => id !== folderId) 
        : [...prev, folderId]
    );
  };

  const createNewItem = (type: 'folder' | 'file') => {
    if (!newItemName) return;

    const newItem: FileItem = {
      id: `${Date.now()}`,
      name: newItemName,
      type: type
    };

    setFiles(prev => [...prev, newItem]);
    setNewItemName('');
  };

  const renderFileTree = (items: FileItem[], parentId?: string) => {
    return items.map(item => (
      <div key={item.id} className="pl-4">
        <div 
          className="flex items-center hover:bg-gray-100 p-2 rounded cursor-pointer"
          onClick={() => item.type === 'folder' && toggleFolder(item.id)}
        >
          {item.type === 'folder' ? (
            <ChevronRight 
              className={`mr-2 transition-transform ${
                expandedFolders.includes(item.id) ? 'rotate-90' : ''
              }`} 
              size={16} 
            />
          ) : (
            <FileIcon className="mr-2" size={16} />
          )}
          
          <span className="flex-grow">{item.name}</span>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Rename</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {item.type === 'folder' && 
         expandedFolders.includes(item.id) && 
         item.children && (
          <div className="pl-4">
            {renderFileTree(item.children, item.id)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center justify-between">
          <span>File Explorer</span>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline">
                <Plus size={16} className="mr-2" /> New
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Item</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input 
                  placeholder="Item name" 
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                />
                <div className="flex space-x-2">
                  <Button onClick={() => createNewItem('folder')}>
                    <Folder size={16} className="mr-2" /> Folder
                  </Button>
                  <Button onClick={() => createNewItem('file')}>
                    <Upload size={16} className="mr-2" /> File
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="py-2">
          {renderFileTree(files)}
        </div>
      </CardContent>
    </Card>
  );
};

export default FileExplorer;
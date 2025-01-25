import React, { useState, useEffect } from 'react';
import FileExplorer from './pages/file-explorer';
import { MoonStarIcon } from 'lucide-react';
import { Button } from '@dropbox/ui/components/button';
import { ButtonVariantType } from './types/button-variant';
import { Toaster } from '@dropbox/ui/components/toaster';
function Layout({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`h-screen w-full flex items-center justify-center ${darkMode ? 'dark' : ''}`}>
      <Button 
        className="absolute top-4 right-4 p-2" 
        variant={ButtonVariantType.Outline}
        onClick={toggleDarkMode}
      >
       <MoonStarIcon/>
      </Button>
     {children}
      <Toaster/>
    </div>
  );
}

export default Layout;


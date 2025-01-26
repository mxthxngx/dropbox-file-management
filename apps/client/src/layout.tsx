import React, { useState, useEffect } from "react";
import { MoonStarIcon, SunIcon } from "lucide-react";
import { Button } from "@dropbox/ui/components/button";
import { Toaster } from "@dropbox/ui/components/toaster";
import { ButtonVariantType } from "./types/button-variant";
import ErrorDialogComponent from "./components/common/error-dialog";
import { useTheme } from "./hooks/use-theme";



function Layout({ children }) {
  const { toggleTheme, isDarkMode } = useTheme();

  return (
    <div
      className={`h-screen w-screen flex items-center justify-center ${isDarkMode ? "dark" : ""}`}
    >
      <Button
        className="absolute top-4 right-4 p-2"
        variant={ButtonVariantType.Outline}
        onClick={toggleTheme}
      >
        <MoonStarIcon />
      </Button>
      {children}
      <Toaster />
      <ErrorDialogComponent/>
    </div>
  );
}

export default Layout;
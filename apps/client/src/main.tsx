import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React from "react";
import "@dropbox/ui/globals.css";
import "@fontsource/lato/100.css";
import "@fontsource/lato/300.css";
import "@fontsource/lato/400.css";
import "@fontsource/lato/700.css";
import "@fontsource/lato/900.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter, Routes, Route } from "react-router";
import FileExplorer from "./pages/file-explorer";
import FileViewer from "./pages/file-viewer";
import { LoaderProvider } from "./provider/loader-provider";
import ReactErrorBoundary from "./provider/react-error-provider";
import { ThemeProvider } from "./provider/theme-provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <LoaderProvider>
          <BrowserRouter>
            <ReactErrorBoundary>
              <Routes>
                <Route path="file-viewer/:fileId" element={<FileViewer />} />
                <Route path=":directoryPath" element={<FileExplorer />} />
                <Route path = "*" element={<FileExplorer />} />
              </Routes>
            </ReactErrorBoundary>
          </BrowserRouter>
        </LoaderProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>

);

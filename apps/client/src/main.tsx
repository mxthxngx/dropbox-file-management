import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react'
import App from './layout'
import '@dropbox/ui/globals.css'
import '@fontsource/lato/100.css'
import '@fontsource/lato/300.css'
import '@fontsource/lato/400.css'
import '@fontsource/lato/700.css'
import '@fontsource/lato/900.css'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { ErrorBoundary } from "react-error-boundary";
import ErrorDialogComponent from './components/common/error-dialog'
import { BrowserRouter, Routes ,Route} from 'react-router'
import FileExplorer from './pages/file-explorer'
import FilePreview from './components/common/file-preview'
import FileViewer from './pages/file-viewer'
const ErrorFallback = ({ error }) => {
  return <ErrorDialogComponent message={error.message} errorCode={error.code} />;
};
createRoot(document.getElementById('root')!).render(
  <ErrorBoundary FallbackComponent={ErrorFallback}>
  <StrictMode>
  
    <Provider store={store}>
    <BrowserRouter>
    <Routes>
      <Route path='*' element={<FileExplorer />} />
      <Route path = 'file-viewer/:fileId' element={< FileViewer/>} />
    </Routes>
  </BrowserRouter>
    </Provider>
  
  </StrictMode>
  </ErrorBoundary>
)

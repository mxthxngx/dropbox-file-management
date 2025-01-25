
export const useDownload = () => {
    const download = async (filePath: string) => {
      const decodedFilePath = decodeURIComponent(filePath);
  
      const response = await fetch(filePath, {
        method: 'GET',
      });
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
        a.download = decodedFilePath.split('/').pop() || 'download';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    };
  
    return { download };
  };
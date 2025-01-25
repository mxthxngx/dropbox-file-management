
export const useDownload = () => {
  const download = async (filePath:string) => {

    const response = await fetch(`${filePath}`, {
      method: 'GET',
    })

    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filePath.split('/').pop() || 'download'
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return { download }
}
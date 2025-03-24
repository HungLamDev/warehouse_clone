import React from 'react'
interface PdfViewerProps {
    open: boolean,
    pdfFile: string,
    onClose: any
}

const PdfViewer = (props: PdfViewerProps) => {
    const { open, pdfFile, onClose } = props
  return (
    <div>index</div>
  )
}

export default PdfViewer
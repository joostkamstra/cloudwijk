'use client'

import { PDFReportGenerator } from './pdf-generator'

interface PDFGeneratorProps {
  data: any
  onGenerated?: (pdfData: Uint8Array) => void
}

export default function PDFGenerator({ data, onGenerated }: PDFGeneratorProps) {
  const generatePDF = () => {
    try {
      const generator = new PDFReportGenerator()
      const pdfData = generator.generateReport(data)
      onGenerated?.(pdfData)
      
      // Create download link
      const blob = new Blob([pdfData as any], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `ai-act-rapport-${data.reportId}.pdf`
      link.click()
      
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('PDF generation failed:', error)
    }
  }

  return (
    <button 
      onClick={generatePDF}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
    >
      Download PDF Rapport
    </button>
  )
}
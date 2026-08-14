'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { Download, FileSpreadsheet, FileText, Lock } from "lucide-react"
import * as XLSX from 'xlsx'
import { pdf } from '@react-pdf/renderer'
import { GenericReportPDF } from './GenericReportPDF'

interface ExportEngineProps {
  data: Record<string, unknown>[]; // Array of objects for CSV/XLSX
  filename: string;
  pdfDocument?: React.ReactElement; // The JSX structure for @react-pdf/renderer
  isPro?: boolean;
  onRequirePro?: () => void;
  variant?: 'dropdown' | 'inline';
}


export function ExportEngine({ data, filename, pdfDocument, isPro = true, onRequirePro, variant = 'dropdown' }: ExportEngineProps) {
  
  const handleExportXLSX = () => {
    // 1. Create a new workbook
    const wb = XLSX.utils.book_new()
    // 2. Convert raw JSON data to a worksheet
    const ws = XLSX.utils.json_to_sheet(data)
    // 3. Append worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, "Scenario Data")
    // 4. Trigger client-side download
    XLSX.writeFile(wb, `${filename}.xlsx`)
  }

  const handleExportCSV = () => {
    const ws = XLSX.utils.json_to_sheet(data)
    const csv = XLSX.utils.sheet_to_csv(ws)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `${filename}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleExportPDF = async () => {
    try {
      // Use provided PDF or fallback to GenericReportPDF
      const doc = pdfDocument || <GenericReportPDF title={`${filename} Report`} data={data} />
      const blob = await pdf(doc).toBlob()
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `${filename}_Report.pdf`
      link.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("PDF Generation failed:", error)
    }
  }

  const [isOpen, setIsOpen] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const ActionButtons = (
    <>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => { handleExportCSV(); setIsOpen(false) }} 
        className="w-full justify-start gap-2.5 text-sm font-medium hover:bg-muted"
      >
        <FileText className="h-4 w-4 text-muted-foreground" />
        Download CSV
      </Button>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => { handleExportXLSX(); setIsOpen(false) }} 
        className="w-full justify-start gap-2.5 text-sm font-medium hover:bg-muted"
      >
        <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
        Download Excel
      </Button>
      
      <div className="h-px bg-border my-1 mx-2" />
      
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => { 
          if(isPro) handleExportPDF()
          else if(onRequirePro) onRequirePro()
          setIsOpen(false) 
        }} 
        className="w-full justify-start gap-2.5 text-sm font-medium text-accent hover:bg-accent/10 hover:text-foreground/80"
      >
        <Download className="h-4 w-4" />
        Download PDF Report
        {!isPro && <Lock className="h-3 w-3 ml-auto opacity-70" />}
      </Button>
    </>
  )

  if (variant === 'inline') {
    return (
      <div className="flex flex-col gap-1 w-full p-2">
        {ActionButtons}
      </div>
    )
  }

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <Button 
        variant="outline" 
        className="w-full justify-between bg-card hover:bg-muted"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <Download className="h-4 w-4 text-muted-foreground" />
          <span>Export Options</span>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6"/></svg>
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-2 bg-background border shadow-lg rounded-xl z-50 flex flex-col p-1.5 animate-in fade-in slide-in-from-top-2">
          {ActionButtons}
        </div>
      )}
    </div>
  )
}

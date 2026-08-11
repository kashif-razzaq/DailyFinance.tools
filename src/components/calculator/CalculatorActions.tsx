'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Save, Share2, Lock, Loader2, Download, X, ThumbsUp } from "lucide-react"
import { ExportEngine } from "@/components/shared/ExportEngine"
import { ShareCalculatorModal } from "@/components/shared/ShareCalculatorModal"
import { HelpfulWidget } from "@/components/shared/HelpfulWidget"

export interface CalculatorActionsProps {
  slug: string;
  onSave: () => void;
  isSaving: boolean;
  isPro: boolean;
  exportData: Record<string, any>[];
  exportFilename: string;
  onRequirePro: () => void;
  pdfDocument?: React.ReactElement;
  shareUrl: string;
}

export function CalculatorActions({
  slug,
  onSave,
  isSaving,
  isPro,
  exportData,
  exportFilename,
  onRequirePro,
  pdfDocument,
  shareUrl
}: CalculatorActionsProps) {
  const [activeTab, setActiveTab] = useState<'export' | 'help' | null>(null)

  return (
    <>
      {/* --- DESKTOP LAYOUT --- */}
      <div className="hidden sm:block bg-card border rounded-2xl p-6 space-y-3 shadow-sm transition-all">
        <Button onClick={onSave} disabled={isSaving} className="w-full justify-center gap-2 bg-accent hover:bg-accent/90 text-white transition-all" size="lg">
          {isSaving ? <Loader2 className="h-4 w-4 animate-spin shrink-0" /> : <Save className="h-4 w-4 shrink-0" />} 
          Save to Dashboard
          {!isPro && <Lock className="h-4 w-4 text-white/70 ml-auto shrink-0" />}
        </Button>
        <div className="flex-1 flex gap-3">
          <div className="flex-1">
            <ExportEngine 
              data={exportData} 
              filename={exportFilename} 
              pdfDocument={pdfDocument} 
              isPro={isPro}
              onRequirePro={onRequirePro}
              variant="dropdown"
            />
          </div>
          <div className="flex-1">
            <ShareCalculatorModal url={shareUrl} slug={slug} isPro={isPro}>
              <Button variant="outline" className="w-full flex gap-2 justify-center">
                <Share2 className="h-4 w-4" /> Share
              </Button>
            </ShareCalculatorModal>
          </div>
        </div>
        <HelpfulWidget slug={slug} />
      </div>

      {/* --- MOBILE APP-STYLE LAYOUT --- */}
      {/* Spacer so content doesn't get hidden behind the fixed bar */}
      <div className="h-20 sm:hidden" />

      {/* Mobile Drawers (above the nav bar) */}
      <div className="sm:hidden relative z-50">
        {activeTab === 'export' && (
          <div className="fixed bottom-[80px] left-4 right-4 bg-background border shadow-xl rounded-2xl p-4 animate-in slide-in-from-bottom-2 fade-in">
            <div className="flex justify-between items-center mb-2 px-1">
              <span className="font-bold text-sm">Export Options</span>
              <button onClick={() => setActiveTab(null)} className="p-1 hover:bg-muted rounded-full transition-colors"><X className="h-4 w-4" /></button>
            </div>
            <ExportEngine 
              data={exportData} 
              filename={exportFilename} 
              pdfDocument={pdfDocument} 
              isPro={isPro}
              onRequirePro={onRequirePro}
              variant="inline"
            />
          </div>
        )}

        {activeTab === 'help' && (
          <div className="fixed bottom-[80px] left-4 right-4 bg-background border shadow-xl rounded-2xl p-4 animate-in slide-in-from-bottom-2 fade-in">
            <div className="flex justify-between items-center mb-1 px-1">
              <span className="font-bold text-sm">Feedback</span>
              <button onClick={() => setActiveTab(null)} className="p-1 hover:bg-muted rounded-full transition-colors"><X className="h-4 w-4" /></button>
            </div>
            <HelpfulWidget slug={slug} variant="inline" />
          </div>
        )}
      </div>

      {/* Mobile Bottom Navbar */}
      <div className="flex sm:hidden fixed bottom-0 left-0 right-0 h-[68px] bg-background border-t z-40 justify-around items-center px-2 pb-safe shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
        
        {/* Save */}
        <button 
          onClick={onSave}
          disabled={isSaving}
          className="flex flex-col items-center justify-center w-full h-full text-muted-foreground hover:text-accent focus:outline-none transition-colors"
        >
          {isSaving ? <Loader2 className="animate-spin h-5 w-5 mb-1" /> : <Save className={`h-5 w-5 mb-1 ${isSaving ? '' : 'text-accent'}`} />}
          <span className={`text-[10px] font-medium ${isSaving ? '' : 'text-accent'}`}>Save</span>
        </button>

        {/* Export */}
        <button 
          onClick={() => setActiveTab(activeTab === 'export' ? null : 'export')}
          className={`flex flex-col items-center justify-center w-full h-full focus:outline-none transition-colors ${activeTab === 'export' ? 'text-accent' : 'text-muted-foreground hover:text-accent'}`}
        >
          <Download className="h-5 w-5 mb-1" />
          <span className="text-[10px] font-medium">Export</span>
        </button>

        {/* Share */}
        <ShareCalculatorModal url={shareUrl} slug={slug} isPro={isPro}>
          <button className="flex flex-col items-center justify-center w-full h-full text-muted-foreground hover:text-accent focus:outline-none transition-colors">
            <Share2 className="h-5 w-5 mb-1" />
            <span className="text-[10px] font-medium">Share</span>
          </button>
        </ShareCalculatorModal>

        {/* Feedback */}
        <button 
          onClick={() => setActiveTab(activeTab === 'help' ? null : 'help')}
          className={`flex flex-col items-center justify-center w-full h-full focus:outline-none transition-colors ${activeTab === 'help' ? 'text-accent' : 'text-muted-foreground hover:text-accent'}`}
        >
          <ThumbsUp className="h-5 w-5 mb-1" />
          <span className="text-[10px] font-medium">Feedback</span>
        </button>

      </div>
    </>
  )
}

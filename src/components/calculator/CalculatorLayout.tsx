'use client'

import React, { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Save, Share2, Code2, Link as LinkIcon, Crown, Quote } from 'lucide-react'

interface CalculatorLayoutProps {
  title: string
  description: string
  inputs: React.ReactNode
  results: React.ReactNode
  seoContent: React.ReactNode
  slug: string
}

export function CalculatorLayout({ title, description, inputs, results, seoContent, slug }: CalculatorLayoutProps) {
  const [saveName, setSaveName] = useState("")
  const isPremium = false // Mock premium status

  const embedCode = `<script src="https://dailyfinance.tools/embed.js" data-calculator="${slug}" data-theme="light"></script>`

  return (
    <div className="container mx-auto max-w-7xl px-4 md:px-8 py-10">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-2">{title}</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">{description}</p>
      </div>

      {/* Main Calculator Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        
        {/* Left Side: Inputs */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <Card className="border-t-4 border-t-primary shadow-lg bg-card">
            <CardContent className="p-6">
              {inputs}
            </CardContent>
          </Card>
        </div>

        {/* Right Side: Results & Actions */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <Card className="bg-card shadow-lg flex-1">
            <CardContent className="p-6 h-full flex flex-col">
              <h3 className="text-xl font-semibold mb-6">Your Results</h3>
              <div className="flex-1">
                {results}
              </div>
              
              {/* Actions */}
              <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t">
                {/* Save Dialog */}
                <Dialog>
                  <DialogTrigger render={
                    <Button className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90" size="lg">
                      <Save className="mr-2 h-4 w-4" />
                      Save Scenario
                    </Button>
                  } />
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Save Calculator Result</DialogTitle>
                      <DialogDescription>
                        Save this scenario to your dashboard to track it later.
                      </DialogDescription>
                    </DialogHeader>
                    {isPremium ? (
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="scenario-name">Scenario Name</Label>
                          <Input
                            id="scenario-name"
                            placeholder="e.g. 2027 Freelance Goal"
                            value={saveName}
                            onChange={(e) => setSaveName(e.target.value)}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="py-6 text-center">
                        <Crown className="mx-auto h-12 w-12 text-accent mb-4" />
                        <h4 className="text-lg font-semibold">Premium Feature</h4>
                        <p className="text-muted-foreground mt-2 mb-6">
                          Saving scenarios is a premium feature. Upgrade for just $2.99/mo to track your goals over time.
                        </p>
                        <Button className="w-full bg-primary hover:bg-primary/90">Upgrade Now</Button>
                      </div>
                    )}
                    {isPremium && (
                      <DialogFooter>
                        <Button type="submit">Save to Dashboard</Button>
                      </DialogFooter>
                    )}
                  </DialogContent>
                </Dialog>

                {/* Share/Embed Dialog */}
                <Dialog>
                  <DialogTrigger render={
                    <Button variant="outline" className="flex-1 lg:flex-none" size="lg">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share & Embed
                    </Button>
                  } />
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Share this Calculator</DialogTitle>
                      <DialogDescription>
                        Copy a link or embed this tool directly on your own website.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-6 py-4">
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2"><LinkIcon className="h-4 w-4" /> Direct Link</Label>
                        <div className="flex space-x-2">
                          <Input value={`https://dailyfinance.tools/tools/${slug}`} readOnly />
                          <Button variant="secondary">Copy</Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2"><Code2 className="h-4 w-4" /> Embed on your site</Label>
                        <div className="flex flex-col space-y-2">
                          <textarea 
                            className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm font-mono text-muted-foreground"
                            readOnly
                            value={embedCode}
                          />
                          <Button variant="secondary" className="w-full">Copy Embed Script</Button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          Note: You can change the <code className="bg-muted px-1 rounded">data-theme</code> attribute to &quot;dark&quot; or &quot;light&quot;.
                        </p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEO Content Section (1500+ words) */}
      <div className="max-w-4xl mx-auto prose prose-gray dark:prose-invert lg:prose-lg">
        {seoContent}
      </div>
    </div>
  )
}

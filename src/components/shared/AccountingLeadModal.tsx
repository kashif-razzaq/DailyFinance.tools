'use client'

import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Send, CheckCircle2 } from "lucide-react"
import { generateCaptchaAction, submitAccountingLeadAction } from '@/actions/lead.actions'

export function AccountingLeadModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  // Captcha state
  const [captcha, setCaptcha] = useState<{ a: number, b: number, timestamp: number, signature: string } | null>(null)
  const [captchaAnswer, setCaptchaAnswer] = useState('')

  // Fetch captcha on open
  useEffect(() => {
    if (isOpen && !success) {
      loadCaptcha()
    }
  }, [isOpen, success])

  const loadCaptcha = async () => {
    try {
      const data = await generateCaptchaAction()
      setCaptcha(data)
      setCaptchaAnswer('')
      setErrorMsg('')
    } catch (e) {
      console.error("Failed to load captcha", e)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!captcha) return

    setIsSubmitting(true)
    setErrorMsg('')

    try {
      const formData = new FormData(e.currentTarget)
      formData.append('captcha_a', captcha.a.toString())
      formData.append('captcha_b', captcha.b.toString())
      formData.append('captcha_timestamp', captcha.timestamp.toString())
      formData.append('captcha_signature', captcha.signature)
      formData.append('captcha_answer', captchaAnswer)
      formData.append('source_url', window.location.href)

      const res = await submitAccountingLeadAction(formData)
      
      if (res.success) {
        setSuccess(true)
      } else {
        setErrorMsg(res.message || 'An error occurred. Please try again.')
        // Reload captcha on failure to prevent replay
        await loadCaptcha()
      }
    } catch (error) {
      console.error(error)
      setErrorMsg('A network error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setSuccess(false)
    setCaptchaAnswer('')
    setErrorMsg('')
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleReset()}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto bg-background/95 backdrop-blur-xl border-border/50 shadow-2xl p-0">
        
        {success ? (
          <div className="p-10 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-2">
              <CheckCircle2 className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Request Received!</h2>
            <p className="text-muted-foreground">
              Thank you for reaching out. Tahir or a member of his team will review your details and get back to you shortly.
            </p>
            <Button onClick={handleReset} className="mt-4 w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              Close Window
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader className="px-6 pt-6 pb-4 border-b border-border/40 bg-muted/20">
              <DialogTitle className="text-xl font-bold tracking-tight">Consult with Tahir Shehzad</DialogTitle>
              <DialogDescription className="text-sm">
                Get expert accounting, taxation, and financial modeling advice for your freelance business or agency.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              
              {/* Honeypot field (hidden) */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="company_website">Website</label>
                <input type="text" id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email Address *</Label>
                  <Input id="email" name="email" type="email" required placeholder="you@example.com" className="bg-background" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone Number</Label>
                  <Input id="phone" name="phone" type="tel" placeholder="+1 (555) 000-0000" className="bg-background" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="best_time" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Best Time to Connect</Label>
                <select id="best_time" name="best_time" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  <option value="">Select a time...</option>
                  <option value="Morning (EST)">Morning (EST)</option>
                  <option value="Afternoon (EST)">Afternoon (EST)</option>
                  <option value="Evening (EST)">Evening (EST)</option>
                  <option value="Anytime via Email">Anytime via Email</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="details" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">How can we help? *</Label>
                <Textarea 
                  id="details" 
                  name="details" 
                  required 
                  placeholder="Tell us about your current accounting setup and what you need help with..."
                  className="min-h-[100px] resize-none bg-background"
                />
              </div>

              {/* Math Captcha */}
              {captcha && (
                <div className="bg-primary/5 dark:bg-amber-950/20 border border-primary/20/50 dark:border-primary/20 rounded-xl p-4 flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <Label htmlFor="captcha" className="text-xs font-bold text-foreground/80 dark:text-primary uppercase tracking-wider block mb-1">
                      Spam Protection *
                    </Label>
                    <span className="text-sm text-foreground/80/80 dark:text-primary">What is {captcha.a} + {captcha.b}?</span>
                  </div>
                  <Input 
                    id="captcha" 
                    type="number" 
                    required 
                    value={captchaAnswer}
                    onChange={(e) => setCaptchaAnswer(e.target.value)}
                    className="w-20 text-center font-bold text-lg bg-background border-primary/20 focus-visible:ring-primary" 
                    placeholder="="
                  />
                </div>
              )}

              {errorMsg && (
                <div className="text-sm font-medium text-red-600 bg-red-50 dark:bg-red-950/30 p-3 rounded-lg border border-red-200/50">
                  {errorMsg}
                </div>
              )}

              <Button type="submit" disabled={isSubmitting || !captchaAnswer} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 text-base transition-all">
                {isSubmitting ? (
                  <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Submitting Request...</>
                ) : (
                  <><Send className="mr-2 h-5 w-5" /> Submit Request</>
                )}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

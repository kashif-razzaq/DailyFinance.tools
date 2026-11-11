"use client"

import Link from "next/link"
import { AlertCircle, CheckCircle2, X } from "lucide-react"

/**
 * The one save-feedback toast used across the whole site — same design,
 * same words everywhere (ToolActionsBar tools and the freelance tools).
 * Success: deep-emerald card, "Saved to your Vault", a tappable
 * "View Vault" pill that opens the dashboard, and a dismiss button.
 * Error: red card with the message, no Vault link.
 * Auto-dismiss timing stays with the caller (5s, long enough to tap).
 */
export function SaveToast({
  show,
  variant = "success",
  message,
  onClose,
}: {
  show: boolean
  variant?: "success" | "error"
  message?: string
  onClose: () => void
}) {
  if (!show) return null
  const isError = variant === "error"
  return (
    <div
      role="status"
      className={`fixed bottom-24 right-4 z-[100] flex max-w-[calc(100vw-2rem)] items-center gap-3 rounded-2xl py-3 pl-4 pr-3 text-white shadow-xl animate-in slide-in-from-right-4 fade-in duration-300 sm:bottom-6 ${
        isError ? "bg-red-600" : "bg-[#064E3B]"
      }`}
    >
      {isError ? (
        <AlertCircle className="h-5 w-5 shrink-0" />
      ) : (
        <CheckCircle2 className="h-5 w-5 shrink-0" />
      )}
      <span className="text-sm font-semibold">
        {message ?? (isError ? "Could not save — please try again" : "Saved to your Vault")}
      </span>
      {!isError && (
        <Link
          href="/dashboard"
          className="shrink-0 rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-white/25"
        >
          View Vault
        </Link>
      )}
      <button
        type="button"
        onClick={onClose}
        aria-label="Dismiss"
        className="shrink-0 rounded-full p-1 text-white/70 transition hover:bg-white/15 hover:text-white"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

"use client"

import Link from "next/link"
import { AlertCircle, CheckCircle2, X } from "lucide-react"

/**
 * The one toast used across the whole site — same design, same words
 * everywhere (ToolActionsBar tools, the freelance tools, and the
 * param-driven auth toasts via ParamToast). Success: deep-emerald card
 * with a message, a tappable action pill, and a dismiss button. Error:
 * red card with the message, no action link.
 * Auto-dismiss timing stays with the caller (5s, long enough to tap).
 *
 * The action pill defaults to "View Vault" → /dashboard, which is what
 * every existing save caller relies on; ParamToast passes its own
 * label/href per toast. The message defaults to the save copy for the
 * same reason — existing callers pass no message at all.
 */
export function SaveToast({
  show,
  variant = "success",
  message,
  actionLabel = "View Vault",
  actionHref = "/dashboard",
  onClose,
}: {
  show: boolean
  variant?: "success" | "error"
  message?: string
  actionLabel?: string
  actionHref?: string
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
          href={actionHref}
          className="shrink-0 rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-white/25"
        >
          {actionLabel}
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

/**
 * Shared contact-form constants — no 'use server' here, so both the server
 * action and the client form can import them. (A 'use server' module may
 * only export async functions to client components.)
 */

export type ContactInquiryType = 'paid-promotion' | 'guest-posting' | 'white-label' | 'other'

export const CONTACT_TYPES: { value: ContactInquiryType; label: string }[] = [
  { value: 'paid-promotion', label: 'Paid promotion' },
  { value: 'guest-posting', label: 'Guest posting' },
  { value: 'white-label', label: 'White label' },
  { value: 'other', label: 'Something else' },
]

export const CONTACT_TYPE_LABELS: Record<ContactInquiryType, string> = {
  'paid-promotion': 'Paid promotion',
  'guest-posting': 'Guest posting',
  'white-label': 'White label',
  other: 'Something else',
}

export function isValidContactType(value: string): value is ContactInquiryType {
  return (Object.keys(CONTACT_TYPE_LABELS) as string[]).includes(value)
}

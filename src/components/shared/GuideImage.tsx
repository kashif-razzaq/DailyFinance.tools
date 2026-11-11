'use client'

import React, { useState } from 'react'
import Image from 'next/image'

/**
 * Guide featured image. If the image file is not on the server yet, the
 * figure hides itself instead of showing a broken-image box — so guide
 * pages stay clean until the image asset lands, then it appears.
 */
export function GuideImage({
  src,
  alt,
  caption,
  priority = false,
  className,
  imgClassName,
}: {
  src: string
  alt: string
  caption?: string
  priority?: boolean
  className?: string
  imgClassName?: string
}) {
  const [missing, setMissing] = useState(false)
  if (missing) return null
  return (
    <figure className={className}>
      <Image
        src={src}
        alt={alt}
        width={2048}
        height={1152}
        priority={priority}
        onError={() => setMissing(true)}
        className={imgClassName ?? "aspect-video w-full rounded-3xl border border-border/60 object-cover"}
      />
      {caption && <figcaption className="mt-2 text-right text-[11px] text-muted-foreground">{caption}</figcaption>}
    </figure>
  )
}

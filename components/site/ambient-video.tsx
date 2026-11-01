'use client'

import { useEffect, useRef } from 'react'
import { useInView } from 'motion/react'
import { cn } from '@/lib/utils'

export function AmbientVideo({
  src,
  poster,
  className,
  label,
}: {
  src: string
  poster: string
  className?: string
  label: string
}) {
  const ref = useRef<HTMLVideoElement>(null)
  const inView = useInView(ref, { margin: '20% 0px' })

  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (inView && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [inView])

  return (
    <video
      ref={ref}
      className={cn('size-full object-cover', className)}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={label}
    />
  )
}

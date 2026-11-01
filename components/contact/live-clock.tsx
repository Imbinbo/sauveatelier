'use client'

import { useSyncExternalStore } from 'react'

function subscribe(cb: () => void) {
  const t = setInterval(cb, 30_000)
  return () => clearInterval(t)
}

export function LiveClock({ zone }: { zone: string }) {
  const time = useSyncExternalStore(
    subscribe,
    () => new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: zone }).format(new Date()),
    () => '--:--',
  )
  return (
    <span className="text-sm tabular-nums text-muted-foreground">
      <span className="mr-2 inline-block size-1.5 animate-pulse rounded-full bg-clay align-middle" />
      {time}
    </span>
  )
}

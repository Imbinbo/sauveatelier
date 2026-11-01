'use client'

import { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'

export function NewsletterForm() {
  const [done, setDone] = useState(false)
  return (
    <form
      className="mt-10 flex max-w-md items-center border-b border-bone/30 focus-within:border-clay"
      onSubmit={(e) => {
        e.preventDefault()
        setDone(true)
      }}
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        placeholder="Your email address"
        disabled={done}
        className="flex-1 bg-transparent py-4 text-bone placeholder:text-bone/40 focus:outline-none"
      />
      <button
        type="submit"
        aria-label={done ? 'Subscribed' : 'Subscribe'}
        className="grid size-10 place-items-center rounded-full bg-bone text-ink transition-colors hover:bg-clay hover:text-bone"
      >
        {done ? <Check className="size-4" /> : <ArrowRight className="size-4" />}
      </button>
    </form>
  )
}

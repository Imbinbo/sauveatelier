'use client'

import { useActionState, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Check } from 'lucide-react'
import { submitInquiry, type InquiryState } from '@/app/contact/actions'
import { cn } from '@/lib/utils'

const TYPES = ['Full home', 'Single room', 'Bespoke furniture', 'Hospitality']
const BUDGETS = ['< $100k', '$100k – $500k', '$500k – $1M', '$1M +']

function Field({ label, name, type = 'text', error, textarea }: { label: string; name: string; type?: string; error?: string; textarea?: boolean }) {
  const cls = 'peer w-full border-b bg-transparent pb-3 pt-7 text-xl outline-none transition-colors placeholder:text-transparent focus:border-ink'
  return (
    <div className="relative">
      {textarea ? (
        <textarea id={name} name={name} rows={4} placeholder={label} aria-invalid={!!error} className={cn(cls, 'resize-none', error ? 'border-destructive' : 'border-border')} />
      ) : (
        <input id={name} name={name} type={type} placeholder={label} aria-invalid={!!error} className={cn(cls, error ? 'border-destructive' : 'border-border')} />
      )}
      <label
        htmlFor={name}
        className="pointer-events-none absolute left-0 top-0 text-xs uppercase tracking-[0.2em] text-muted-foreground"
      >
        {label}
      </label>
      {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
    </div>
  )
}

function Chips({ name, options }: { name: string; options: string[] }) {
  const [value, setValue] = useState(options[0])
  return (
    <div className="flex flex-wrap gap-2">
      <input type="hidden" name={name} value={value} />
      {options.map((o) => (
        <button
          type="button"
          key={o}
          onClick={() => setValue(o)}
          aria-pressed={value === o}
          className={cn(
            'rounded-full border px-4 py-2 text-sm transition-colors',
            value === o ? 'border-ink bg-ink text-bone' : 'border-border hover:border-ink',
          )}
        >
          {o}
        </button>
      ))}
    </div>
  )
}

export function InquiryForm() {
  const [state, action, pending] = useActionState<InquiryState, FormData>(submitInquiry, { ok: false, message: '' })

  return (
    <AnimatePresence mode="wait">
      {state.ok ? (
        <motion.div
          key="done"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex min-h-[32rem] flex-col justify-center"
          role="status"
        >
          <span className="grid size-16 place-items-center rounded-full bg-clay text-bone">
            <Check className="size-7" />
          </span>
          <p className="mt-8 font-serif text-4xl leading-tight md:text-5xl text-balance">{state.message}</p>
        </motion.div>
      ) : (
        <motion.form key="form" action={action} exit={{ opacity: 0, y: -20 }} className="space-y-10" noValidate>
          <div className="grid gap-10 md:grid-cols-2">
            <Field label="Your name" name="name" error={state.errors?.name} />
            <Field label="Email" name="email" type="email" error={state.errors?.email} />
          </div>
          <fieldset>
            <legend className="mb-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">Project type</legend>
            <Chips name="type" options={TYPES} />
          </fieldset>
          <fieldset>
            <legend className="mb-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">Investment</legend>
            <Chips name="budget" options={BUDGETS} />
          </fieldset>
          <Field label="Tell us about your space" name="message" textarea error={state.errors?.message} />
          {state.message && !state.ok && <p className="text-sm text-destructive" role="alert">{state.message}</p>}
          <button
            type="submit"
            disabled={pending}
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-ink px-8 py-5 text-sm uppercase tracking-[0.2em] text-bone disabled:opacity-60"
          >
            <span className="absolute inset-0 translate-y-full bg-clay transition-transform duration-500 group-hover:translate-y-0" />
            <span className="relative">{pending ? 'Sending…' : 'Send inquiry'}</span>
            <ArrowUpRight className="relative size-4 transition-transform duration-500 group-hover:rotate-45" />
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  )
}

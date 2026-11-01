'use server'

export type InquiryState = { ok: boolean; message: string; errors?: Partial<Record<'name' | 'email' | 'message', string>> }

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function submitInquiry(_prev: InquiryState, formData: FormData): Promise<InquiryState> {
  const name = String(formData.get('name') ?? '').trim().slice(0, 120)
  const email = String(formData.get('email') ?? '').trim().slice(0, 200)
  const message = String(formData.get('message') ?? '').trim().slice(0, 4000)

  const errors: InquiryState['errors'] = {}
  if (name.length < 2) errors.name = 'Please share your name.'
  if (!EMAIL.test(email)) errors.email = 'Please enter a valid email.'
  if (message.length < 10) errors.message = 'Tell us a little more about your project.'
  if (Object.keys(errors).length) return { ok: false, message: 'Please review the highlighted fields.', errors }

  return { ok: true, message: `Thank you, ${name.split(' ')[0]}. A member of our studio will be in touch within two working days.` }
}

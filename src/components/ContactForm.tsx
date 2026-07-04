import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { send } from '@emailjs/browser'
import { CheckCircle2, LoaderCircle, AlertCircle, Sparkles } from 'lucide-react'

type FormValues = {
  name: string
  email: string
  message: string
  company: string
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

const initialValues: FormValues = {
  name: '',
  email: '',
  message: '',
  company: '',
}

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || ''
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || ''
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ''
const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || 'maxmudorifov36@gmail.com'

export function ContactForm() {
  const { t } = useTranslation()
  const [values, setValues] = useState<FormValues>(initialValues)
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({})
  const [status, setStatus] = useState<FormStatus>('idle')
  const [message, setMessage] = useState('')
  const [lastSentAt, setLastSentAt] = useState(0)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (status !== 'idle') {
        setStatus('idle')
        setMessage('')
      }
    }, 4000)

    return () => window.clearTimeout(timer)
  }, [status])

  const canSend = useMemo(() => Date.now() - lastSentAt > 6000, [lastSentAt])

  const validate = () => {
    const nextErrors: Partial<Record<keyof FormValues, string>> = {}

    if (!values.name.trim()) {
      nextErrors.name = t('contact.errors.nameRequired')
    }
    if (!values.email.trim()) {
      nextErrors.email = t('contact.errors.emailRequired')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      nextErrors.email = t('contact.errors.emailInvalid')
    }
    if (!values.message.trim()) {
      nextErrors.message = t('contact.errors.messageRequired')
    }
    if (values.company.trim()) {
      nextErrors.company = t('contact.errors.spam')
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!validate()) return
    if (!canSend) {
      setStatus('error')
      setMessage(t('contact.errors.rateLimited'))
      return
    }

    setStatus('submitting')
    setMessage('')

    try {
      if (SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY) {
        await send(
          SERVICE_ID,
          TEMPLATE_ID,
          {
            from_name: values.name,
            from_email: values.email,
            message: values.message,
            to_email: CONTACT_EMAIL,
          },
          PUBLIC_KEY,
        )
      } else {
        const subject = `Portfolio contact from ${values.name}`
        const body = [`Name: ${values.name}`, `Email: ${values.email}`, '', 'Message:', values.message].join('\n')
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT_EMAIL)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
        const newWindow = window.open(gmailUrl, '_blank', 'noopener,noreferrer')

        if (!newWindow) {
          window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
        }
      }

      setStatus('success')
      setMessage(t('contact.fallbackOpen'))
      setValues(initialValues)
      setLastSentAt(Date.now())
    } catch {
      setStatus('error')
      setMessage(t('contact.errors.unconfigured'))
    }
  }

  const handleChange = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  return (
    <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit} noValidate>
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 sm:gap-2 text-xs sm:text-sm text-zinc-300">
          <span>{t('contact.name')}</span>
          <input
            value={values.name}
            onChange={(event) => handleChange('name', event.target.value)}
            className="rounded-lg sm:rounded-2xl border border-white/15 bg-white/10 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-zinc-100 outline-none transition focus:border-violet-400/60 focus:bg-white/15"
            placeholder={t('contact.placeholder.name')}
            aria-label={t('contact.name')}
          />
          {errors.name ? <span className="text-xs text-rose-400">{errors.name}</span> : null}
        </label>
        <label className="flex flex-col gap-1.5 sm:gap-2 text-xs sm:text-sm text-zinc-300">
          <span>{t('contact.email')}</span>
          <input
            type="email"
            value={values.email}
            onChange={(event) => handleChange('email', event.target.value)}
            className="rounded-lg sm:rounded-2xl border border-white/15 bg-white/10 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-zinc-100 outline-none transition focus:border-violet-400/60 focus:bg-white/15"
            placeholder={t('contact.placeholder.email')}
            aria-label={t('contact.email')}
          />
          {errors.email ? <span className="text-xs text-rose-400">{errors.email}</span> : null}
        </label>
      </div>

      <label className="flex flex-col gap-1.5 sm:gap-2 text-xs sm:text-sm text-zinc-300">
        <span>{t('contact.message')}</span>
        <textarea
          value={values.message}
          onChange={(event) => handleChange('message', event.target.value)}
          className="min-h-28 sm:min-h-36 rounded-lg sm:rounded-2xl border border-white/15 bg-white/10 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-zinc-100 outline-none transition focus:border-violet-400/60 focus:bg-white/15"
          placeholder={t('contact.placeholder.message')}
          aria-label={t('contact.message')}
        />
        {errors.message ? <span className="text-xs text-rose-400">{errors.message}</span> : null}
      </label>

      <div className="hidden">
        <label>
          <span>Company</span>
          <input
            value={values.company}
            onChange={(event) => handleChange('company', event.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <div className="flex flex-col sm:flex-row flex-wrap items-center gap-2 sm:gap-3 pt-2">
        <motion.button
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={status === 'submitting'}
          className="w-full sm:w-auto inline-flex items-center justify-center sm:justify-start gap-2 rounded-full border border-violet-400/30 bg-violet-500/20 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-violet-100 shadow-[0_10px_30px_rgba(110,106,222,0.18)] transition disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === 'submitting' ? (
            <>
              <LoaderCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-spin" />
              {t('contact.sending')}
            </>
          ) : (
            <>
              <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              {t('contact.send')}
            </>
          )}
        </motion.button>

        <AnimatePresence mode="wait">
          {message ? (
            <motion.p
              key={message}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className={`inline-flex items-center gap-1.5 sm:gap-2 rounded-full border px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm ${status === 'success' ? 'border-emerald-400/30 bg-emerald-500/15 text-emerald-200' : 'border-rose-400/30 bg-rose-500/15 text-rose-200'}`}
            >
              {status === 'success' ? <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" /> : <AlertCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />}
              <span className="line-clamp-2">{message}</span>
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>
    </form>
  )
}

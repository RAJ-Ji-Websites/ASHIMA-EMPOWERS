import { type FormEvent, useCallback, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  ArrowRight,
  Calendar,
  Check,
  ChevronDown,
  Clock,
  ClipboardCheck,
  Download,
  Eye,
  LogOut,
  LockKeyhole,
  Mail,
  MapPin,
  Menu,
  Phone,
  RefreshCw,
  Search,
  ShieldCheck,
  Star,
  Trash2,
  X,
  User,
  VenusAndMars,
} from 'lucide-react'

import './index.css'

const portrait = '/uploads/ashima-portrait.webp'
const brandLogo = '/ashima-logo.webp'
const stripePaymentLink = import.meta.env.VITE_STRIPE_PAYMENT_LINK || 'https://buy.stripe.com/8x200kafD3MydQi603gEg08'

const paymentOptions: Record<
  '25min' | '60min',
  { title: string; india: { label: string; flags: string; url: string }; foreign: { label: string; flags: string; url: string } }
> = {
  '25min': {
    title: '25-Minute Private Consultation',
    india: { label: 'Indian Clients (UPI)', flags: '🇮🇳', url: 'https://buy.stripe.com/9B6cN69bz5UGeUm2NRgEg0a' },
    foreign: { label: 'Foreign Clients', flags: '🇨🇦 🇦🇺 🇬🇧 🇺🇸', url: 'https://buy.stripe.com/3cI4gAevT3MyfYqdsvgEg09' },
  },
  '60min': {
    title: '60-Minute Complete Consultation',
    india: { label: 'Indian Clients (UPI)', flags: '🇮🇳', url: 'https://buy.stripe.com/bJe3cw0F3dn8aE688bgEg0b' },
    foreign: { label: 'Foreign Clients', flags: '🇨🇦 🇦🇺 🇬🇧 🇺🇸', url: 'https://buy.stripe.com/5kQ28s2NbaaWcMefADgEg07' },
  },
}

const benefits = [
  'Detailed Kundli Analysis',
  'Recorded Video Reports & Live One-on-One Consultations',
  'Focused Career & Business Insights',
  'Deep Relationship & Compatibility Guidance',
  'Life Purpose & Destiny Path Clarity',
]

const questions = [
  'When will my career grow?',
  'Why am I not happy in my relationship?',
  'What business should I start?',
  'When will life get better?',
  'When will I get my dream job?',
]

const blueprintPreview = [
  'Career Analysis',
  'Relationship Patterns',
  'Life Purpose',
  'Strengths',
  'Challenges',
]

const faqs = [
  {
    question: 'How is this personalized?',
    answer:
      'Your Life Blueprint is prepared from your individual birth details and interpreted through Ashima’s combined lens of Astrology, Numerology and Palmistry, so the final report is specific to one person only.',
  },
  {
    question: 'What details are required?',
    answer:
      'After purchase, you share your name, date of birth, time of birth, place of birth and palm references when requested. These details help create a private, individualized dossier.',
  },
  {
    question: 'How long does delivery take?',
    answer:
      'Most personalized reports are delivered within 2 to 5 working days because each one includes human interpretation and a custom 10-minute video reading.',
  },
  {
    question: 'Do I receive a video reading?',
    answer:
      'Yes. The Personalized Life Blueprint includes a 10-minute video reading recorded for you, designed to explain the most relevant insights clearly and calmly.',
  },
  {
    question: 'Is this automatically generated?',
    answer:
      'No. This is not a generic automated report. Your details are reviewed and interpreted by Ashima to create a thoughtful, human-guided life report.',
  },
  {
    question: 'How are Astrology, Numerology and Palmistry combined?',
    answer:
      'Astrology provides timing and life themes, Numerology adds patterns from your name and date, and Palmistry offers personality and tendency markers. Together they create a fuller self-understanding profile.',
  },
]

const trustMessages = [
  '✨ Personalized For You',
  '🎥 Custom Video Reports',
  '💬 Live 1-on-1 Consultations',
  '📖 Detailed Life Analysis',
]

const sectionVariant = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0 },
}

function goToPayment() {
  window.location.href = stripePaymentLink
}

function scrollToOffer() {
  document.getElementById('offer')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function ThankYouPage() {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const scrollToForm = () => {
    document.getElementById('thankyou-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')

    const form = new FormData(event.currentTarget)
    const searchParams = new URLSearchParams(window.location.search)

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: form.get('fullName'),
          whatsapp: form.get('whatsapp'),
          email: form.get('email'),
          birthDate: form.get('birthDate'),
          birthTime: form.get('birthTime'),
          birthPlace: form.get('birthPlace'),
          gender: form.get('gender'),
          stripeSessionId: searchParams.get('session_id') || searchParams.get('checkout_session_id') || '',
        }),
      })

      if (!response.ok) {
        const result = await response.json().catch(() => null)
        throw new Error(result?.error || 'Unable to submit details. Please try again.')
      }

      setSubmitted(true)
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Unable to submit details. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const steps = [
    'Complete the information form below.',
    'Ashima will personally review your details.',
    'Your Kundli Analysis and 10-Minute Video Reading will be prepared.',
    'Your report will be delivered within 2–5 working days.',
  ]

  const fields = [
    { label: 'Full Name', name: 'fullName', type: 'text', icon: User, placeholder: 'Your full name' },
    { label: 'WhatsApp Number', name: 'whatsapp', type: 'tel', icon: Phone, placeholder: 'Your WhatsApp number' },
    { label: 'Email Address', name: 'email', type: 'email', icon: Mail, placeholder: 'your@email.com' },
    { label: 'Date of Birth', name: 'birthDate', type: 'date', icon: Calendar, placeholder: '' },
    { label: 'Time of Birth', name: 'birthTime', type: 'time', icon: Clock, placeholder: '' },
    { label: 'Birth Place', name: 'birthPlace', type: 'text', icon: MapPin, placeholder: 'City, State/Country' },
  ]

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#050505] px-4 py-8 text-[#FAFAFA] selection:bg-[#D8A545] selection:text-black sm:px-5 sm:py-10 lg:px-8">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-1/2 top-[-18%] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#D8A545]/12 blur-[130px]" />
        <div className="absolute bottom-[-10%] right-[-15%] h-[420px] w-[420px] rounded-full bg-[#F2D07C]/8 blur-[120px]" />
        <div className="zodiac-texture absolute inset-0 opacity-[0.12]" />
      </div>

      <main className="relative z-10 mx-auto max-w-5xl">
        <div className="mb-8 flex justify-center">
          <a href="/" className="grid h-20 w-20 place-items-center rounded-full border border-[#F2D07C]/55 bg-[#050505] p-1.5 shadow-[0_0_40px_rgba(216,165,69,0.32)]">
            <img src={brandLogo} alt="Ashima Empowers logo" className="h-full w-full rounded-full object-cover" />
          </a>
        </div>

        <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <motion.div
            initial={{ scale: 0.82, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 160, damping: 14 }}
            className="mx-auto grid h-24 w-24 place-items-center rounded-full border border-[#F2D07C]/55 bg-[#D8A545]/12 text-[#F2D07C] shadow-[0_0_70px_rgba(216,165,69,0.28)]"
          >
            <motion.div initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7, delay: 0.2 }}>
              <Check className="h-11 w-11" />
            </motion.div>
          </motion.div>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.32em] text-[#D8A545]">Payment Successful ✨</p>
          <h1 className="mx-auto mt-4 max-w-3xl font-['Cinzel'] text-4xl leading-tight text-white sm:text-5xl md:text-6xl">
            Thank You For Your Purchase
          </h1>
          <p className="mx-auto mt-5 max-w-2xl font-['Cormorant_Garamond'] text-2xl leading-relaxed text-[#d8d8d8]">
            Your Personalized Life Blueprint order has been successfully received.
          </p>
          <div className="mx-auto mt-7 h-px max-w-sm bg-gradient-to-r from-transparent via-[#F2D07C] to-transparent" />
        </motion.section>

        <section className="mt-12 rounded-[2rem] border border-[#D8A545]/20 bg-[#0D0D0D]/75 p-5 backdrop-blur-2xl sm:p-8">
          <h2 className="font-['Cinzel'] text-2xl text-white sm:text-3xl">What Happens Next?</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step} className="relative rounded-3xl border border-[#D8A545]/15 bg-black/30 p-5">
                <div className="mb-4 grid h-10 w-10 place-items-center rounded-full border border-[#D8A545]/35 bg-[#D8A545]/10 text-sm font-bold text-[#F2D07C]">
                  {index + 1}
                </div>
                <p className="text-sm leading-relaxed text-[#D7D7D7]">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
          <div id="thankyou-form" className="rounded-[2rem] border border-[#D8A545]/25 bg-[#0D0D0D]/85 p-5 shadow-[0_0_90px_rgba(216,165,69,0.1)] backdrop-blur-2xl sm:p-8">
            {!submitted ? (
              <>
                <p className="text-xs uppercase tracking-[0.28em] text-[#D8A545]">Customer Information Form</p>
                <h2 className="mt-3 font-['Cinzel'] text-3xl text-white sm:text-4xl">Complete Your Details</h2>
                <p className="mt-3 text-sm leading-relaxed text-[#A0A0A0]">
                  Please provide the information below so we can begin preparing your Personalized Life Blueprint.
                </p>

                <form onSubmit={handleSubmit} className="mt-7 grid gap-4 sm:grid-cols-2">
                  {fields.map(({ label, name, type, icon: Icon, placeholder }) => (
                    <label key={name} className="block">
                      <span className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#D8A545]">
                        <Icon className="h-4 w-4" /> {label}
                      </span>
                      <input
                        required
                        name={name}
                        type={type}
                        placeholder={placeholder}
                        className="w-full rounded-2xl border border-[#D8A545]/18 bg-black/45 px-4 py-4 text-white outline-none transition placeholder:text-[#A0A0A0]/55 focus:border-[#F2D07C]/70 focus:shadow-[0_0_28px_rgba(216,165,69,0.16)]"
                      />
                    </label>
                  ))}

                  <label className="block sm:col-span-2">
                    <span className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#D8A545]">
                      <VenusAndMars className="h-4 w-4" /> Gender
                    </span>
                    <select required name="gender" defaultValue="" className="w-full rounded-2xl border border-[#D8A545]/18 bg-black/45 px-4 py-4 text-white outline-none transition focus:border-[#F2D07C]/70 focus:shadow-[0_0_28px_rgba(216,165,69,0.16)]">
                      <option value="" disabled>Select gender</option>
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                      <option value="other">Other</option>
                      <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                  </label>

                  {submitError && (
                    <p className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200 sm:col-span-2">
                      {submitError}
                    </p>
                  )}

                  <button disabled={isSubmitting} type="submit" className="luxury-cta no-offer-badge relative mt-2 w-full overflow-hidden rounded-full border border-[#F2D07C]/70 px-6 py-5 text-xs font-black uppercase tracking-[0.16em] text-black disabled:cursor-not-allowed disabled:opacity-70 sm:col-span-2 sm:text-sm">
                    <span className="absolute inset-0 bg-[#D8A545]" />
                    <span className="luxury-cta-glow" />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? 'Submitting...' : 'Submit My Details'} <ArrowRight className="h-4 w-4" />
                    </span>
                  </button>
                </form>
              </>
            ) : (
              <div className="py-10 text-center">
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-[#F2D07C]/50 bg-[#D8A545]/12 text-[#F2D07C]">
                  <ClipboardCheck className="h-10 w-10" />
                </div>
                <h2 className="mt-6 font-['Cinzel'] text-3xl text-white">You're All Set</h2>
                <p className="mx-auto mt-4 max-w-md leading-relaxed text-[#A0A0A0]">
                  Your details have been saved securely. Ashima will now begin preparing your personalized analysis.
                </p>
              </div>
            )}
          </div>

          <div className="space-y-5">
            <div className="rounded-[2rem] border border-[#D8A545]/20 bg-[#0D0D0D]/75 p-6 backdrop-blur-2xl">
              <ShieldCheck className="mb-5 h-8 w-8 text-[#F2D07C]" />
              <h2 className="font-['Cinzel'] text-2xl text-white">Where Will Your Report Be Sent?</h2>
              <p className="mt-4 text-sm leading-relaxed text-[#A0A0A0]">
                Your Personalized Life Blueprint and Video Recording will be delivered to your WhatsApp number and/or email address.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#A0A0A0]">
                Please ensure your birth details are accurate for the most personalized analysis possible.
              </p>
            </div>

            <div className="rounded-[2rem] border border-[#D8A545]/35 bg-[#D8A545]/10 p-6 backdrop-blur-2xl">
              <h2 className="font-['Cinzel'] text-2xl text-[#F2D07C]">You're All Set</h2>
              <p className="mt-4 text-sm leading-relaxed text-white/85">
                Your report and custom video reading will be delivered within 2–5 working days. Thank you for choosing Ashima Empowers.
              </p>
            </div>
          </div>
        </section>
      </main>

      {!submitted && (
        <motion.button
          initial={{ opacity: 0, y: 28, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: [1, 1.045, 1] }}
          transition={{ opacity: { duration: 0.35 }, y: { duration: 0.35 }, scale: { duration: 1.35, repeat: Infinity, ease: 'easeInOut' } }}
          onClick={scrollToForm}
          className="fill-form-sticky fixed bottom-4 left-1/2 z-50 w-[calc(100%-1.5rem)] max-w-md -translate-x-1/2 rounded-full border border-[#F2D07C]/75 bg-[#D8A545] px-6 py-5 text-xs font-black uppercase tracking-[0.18em] text-black shadow-[0_0_70px_rgba(216,165,69,0.45)] sm:bottom-6 sm:w-auto sm:px-10 sm:text-sm"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            Fill Form Now <ArrowRight className="h-4 w-4" />
          </span>
        </motion.button>
      )}
    </div>
  )
}

type Order = {
  id: string
  full_name: string
  whatsapp: string
  email: string
  birth_date: string
  birth_time: string
  birth_place: string
  gender: string
  stripe_session_id?: string
  status: string
  order_status?: string
  created_at: string
  updated_at?: string
}

const orderStatuses = [
  { value: 'new', label: 'New' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'delivered', label: 'Delivered' },
]

function AdminPage() {
  const [password, setPassword] = useState('')
  const [isAuthed, setIsAuthed] = useState(() => window.sessionStorage.getItem('ashima-admin-auth') === 'true')
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [updatingOrderId, setUpdatingOrderId] = useState('')
  const [deletingOrderId, setDeletingOrderId] = useState('')

  const fetchOrders = useCallback(async () => {
    setIsLoading(true)
    setError('')
    try {
      const response = await fetch('/api/orders', {
        headers: { Authorization: `Bearer ${window.sessionStorage.getItem('ashima-admin-password') || password}` },
      })

      if (!response.ok) {
        const result = await response.json().catch(() => null)
        throw new Error(result?.error || 'Unable to load orders')
      }

      const result = await response.json()
      setOrders(result.orders || [])
    } catch (adminError) {
      setError(adminError instanceof Error ? adminError.message : 'Unable to load orders')
    } finally {
      setIsLoading(false)
    }
  }, [password])

  useEffect(() => {
    if (!isAuthed) return
    const initialLoad = window.setTimeout(fetchOrders, 0)
    const timer = window.setInterval(fetchOrders, 15000)
    return () => {
      window.clearTimeout(initialLoad)
      window.clearInterval(timer)
    }
  }, [fetchOrders, isAuthed])

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    window.sessionStorage.setItem('ashima-admin-auth', 'true')
    window.sessionStorage.setItem('ashima-admin-password', password)
    setIsAuthed(true)
  }

  const logout = () => {
    window.sessionStorage.removeItem('ashima-admin-auth')
    window.sessionStorage.removeItem('ashima-admin-password')
    setIsAuthed(false)
    setPassword('')
    setOrders([])
  }

  const filteredOrders = orders.filter((order) => {
    const currentStatus = order.order_status || order.status || 'new'
    const text = `${order.full_name} ${order.whatsapp} ${order.email} ${order.birth_place} ${order.gender} ${currentStatus}`.toLowerCase()
    return text.includes(query.toLowerCase()) && (statusFilter === 'all' || currentStatus === statusFilter)
  })

  const statusCounts = orderStatuses.reduce(
    (counts, status) => ({
      ...counts,
      [status.value]: orders.filter((order) => (order.order_status || order.status || 'new') === status.value).length,
    }),
    {} as Record<string, number>,
  )

  const updateOrderStatus = async (orderId: string, status: string) => {
    setUpdatingOrderId(orderId)
    setError('')
    try {
      const response = await fetch('/api/orders', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${window.sessionStorage.getItem('ashima-admin-password') || password}`,
        },
        body: JSON.stringify({ id: orderId, status }),
      })

      if (!response.ok) {
        const result = await response.json().catch(() => null)
        throw new Error(result?.error || 'Unable to update order status')
      }

      const result = await response.json()
      const updatedOrder = result.order
      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order.id === orderId
            ? { ...order, ...updatedOrder, status: updatedOrder.order_status || updatedOrder.status || status, order_status: updatedOrder.order_status || updatedOrder.status || status }
            : order,
        ),
      )
    } catch (statusError) {
      setError(statusError instanceof Error ? statusError.message : 'Unable to update order status')
    } finally {
      setUpdatingOrderId('')
    }
  }

  const deleteOrder = async (orderId: string) => {
    if (!window.confirm('Are you sure you want to delete this order? This action cannot be undone.')) {
      return
    }
    setDeletingOrderId(orderId)
    setError('')
    try {
      const response = await fetch('/api/orders', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${window.sessionStorage.getItem('ashima-admin-password') || password}`,
        },
        body: JSON.stringify({ id: orderId }),
      })

      if (!response.ok) {
        const result = await response.json().catch(() => null)
        throw new Error(result?.error || 'Unable to delete order')
      }

      setOrders((currentOrders) => currentOrders.filter((order) => order.id !== orderId))
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Unable to delete order')
    } finally {
      setDeletingOrderId('')
    }
  }

  const exportCsv = () => {
    const headers = ['Name', 'WhatsApp', 'Email', 'Birth Date', 'Birth Time', 'Birth Place', 'Gender', 'Status', 'Stripe Session', 'Created At']
    const rows = filteredOrders.map((order) => [
      order.full_name,
      order.whatsapp,
      order.email,
      order.birth_date,
      order.birth_time,
      order.birth_place,
      order.gender,
      order.order_status || order.status || 'new',
      order.stripe_session_id || '',
      new Date(order.created_at).toLocaleString(),
    ])
    const csv = [headers, ...rows].map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(',')).join('\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
    const link = document.createElement('a')
    link.href = url
    link.download = 'ashima-orders.csv'
    link.click()
    URL.revokeObjectURL(url)
  }

  if (!isAuthed) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#050505] px-4 text-white">
        <div className="w-full max-w-md rounded-[2rem] border border-[#D8A545]/25 bg-[#0D0D0D]/85 p-6 shadow-[0_0_90px_rgba(216,165,69,0.14)] backdrop-blur-2xl sm:p-8">
          <div className="mb-7 flex justify-center">
            <img src={brandLogo} alt="Ashima Empowers logo" className="h-20 w-20 rounded-full border border-[#D8A545]/35 object-cover p-1" />
          </div>
          <p className="text-center text-xs uppercase tracking-[0.3em] text-[#D8A545]">Admin Access</p>
          <h1 className="mt-3 text-center font-['Cinzel'] text-3xl">Ashima Orders</h1>
          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <input value={password} onChange={(event) => setPassword(event.target.value)} required type="password" placeholder="Enter admin password" className="w-full rounded-2xl border border-[#D8A545]/18 bg-black/45 px-4 py-4 text-white outline-none placeholder:text-[#A0A0A0]/55 focus:border-[#F2D07C]/70" />
            <button className="w-full rounded-full bg-[#D8A545] px-6 py-4 text-sm font-black uppercase tracking-[0.16em] text-black">Open Admin Panel</button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#050505] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 rounded-[2rem] border border-[#D8A545]/20 bg-[#0D0D0D]/80 p-5 backdrop-blur-2xl sm:p-7 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#D8A545]">Admin Panel</p>
            <h1 className="mt-2 font-['Cinzel'] text-3xl sm:text-5xl">Life Blueprint Orders</h1>
            <p className="mt-3 text-sm text-[#A0A0A0]">Paid customer detail submissions from the thank you page.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button onClick={fetchOrders} className="inline-flex items-center gap-2 rounded-full border border-[#D8A545]/25 px-4 py-3 text-sm text-[#F2D07C]"><RefreshCw className="h-4 w-4" /> Refresh</button>
            <button onClick={exportCsv} className="inline-flex items-center gap-2 rounded-full border border-[#D8A545]/25 px-4 py-3 text-sm text-[#F2D07C]"><Download className="h-4 w-4" /> Export CSV</button>
            <button onClick={logout} className="inline-flex items-center gap-2 rounded-full bg-[#D8A545] px-4 py-3 text-sm font-bold text-black"><LogOut className="h-4 w-4" /> Logout</button>
          </div>
        </div>

        <div className="mt-6 rounded-[2rem] border border-[#D8A545]/20 bg-[#0D0D0D]/75 p-4 backdrop-blur-2xl sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-3 text-sm text-[#A0A0A0]">
              <span>Total: <strong className="text-[#F2D07C]">{orders.length}</strong></span>
              {orderStatuses.map((status) => (
                <span key={status.value}>{status.label}: <strong className="text-[#F2D07C]">{statusCounts[status.value] || 0}</strong></span>
              ))}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="rounded-full border border-[#D8A545]/18 bg-black/45 px-4 py-3 text-sm outline-none focus:border-[#F2D07C]/70">
                <option value="all">All statuses</option>
                {orderStatuses.map((status) => (
                  <option key={status.value} value={status.value}>{status.label}</option>
                ))}
              </select>
            <label className="relative w-full sm:max-w-sm">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#D8A545]" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search orders..." className="w-full rounded-full border border-[#D8A545]/18 bg-black/45 py-3 pl-11 pr-4 text-sm outline-none placeholder:text-[#A0A0A0]/55 focus:border-[#F2D07C]/70" />
            </label>
            </div>
          </div>

          {error && <p className="mt-4 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p>}
          {isLoading && <p className="mt-6 text-center text-[#A0A0A0]">Loading orders...</p>}

          <div className="mt-6 overflow-x-auto">
            <table className="min-w-[980px] w-full border-separate border-spacing-y-3 text-left text-sm">
              <thead className="text-xs uppercase tracking-[0.18em] text-[#D8A545]">
                <tr>
                  <th className="px-4">Customer</th>
                  <th className="px-4">Contact</th>
                  <th className="px-4">Birth Details</th>
                  <th className="px-4">Gender</th>
                  <th className="px-4">Status</th>
                  <th className="px-4">Submitted</th>
                  <th className="px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="bg-black/35 text-[#D7D7D7]">
                    <td className="rounded-l-2xl px-4 py-4 font-semibold text-white">{order.full_name}</td>
                    <td className="px-4 py-4"><p>{order.whatsapp}</p><p className="text-[#A0A0A0]">{order.email}</p></td>
                    <td className="px-4 py-4"><p>{order.birth_date} · {order.birth_time}</p><p className="text-[#A0A0A0]">{order.birth_place}</p></td>
                    <td className="px-4 py-4 capitalize">{order.gender?.replaceAll('-', ' ')}</td>
                    <td className="px-4 py-4">
                      <select
                        value={order.order_status || order.status || 'new'}
                        disabled={updatingOrderId === order.id}
                        onChange={(event) => updateOrderStatus(order.id, event.target.value)}
                        className="rounded-full border border-[#D8A545]/25 bg-[#D8A545]/10 px-3 py-2 text-xs uppercase text-[#F2D07C] outline-none disabled:opacity-60"
                      >
                        {orderStatuses.map((status) => (
                          <option key={status.value} value={status.value}>{status.label}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-4 text-[#A0A0A0]"><p>{new Date(order.created_at).toLocaleString()}</p>{order.updated_at && <p className="text-xs">Updated: {new Date(order.updated_at).toLocaleString()}</p>}</td>
                    <td className="rounded-r-2xl px-4 py-4 text-center">
                      <button
                        onClick={() => deleteOrder(order.id)}
                        disabled={deletingOrderId === order.id}
                        className="inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-400 hover:bg-red-500/20 disabled:opacity-60 transition"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        {deletingOrderId === order.id ? 'Deleting...' : 'Delete'}
                      </button>
                    </td>
                  </tr>
                ))}
                {!isLoading && filteredOrders.length === 0 && (
                  <tr>
                    <td colSpan={7} className="rounded-2xl bg-black/35 px-4 py-10 text-center text-[#A0A0A0]">No orders found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

function ZodiacWheel() {
  const symbols = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓']

  return (
    <motion.div
      aria-hidden="true"
      className="absolute inset-[-10%] z-0 rounded-full opacity-70"
      animate={{ rotate: 360 }}
      transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
    >
      <div className="absolute inset-0 rounded-full border border-[#D8A545]/25 shadow-[0_0_80px_rgba(216,165,69,0.18)]" />
      <div className="absolute inset-[9%] rounded-full border border-[#F2D07C]/15" />
      <div className="absolute inset-[20%] rounded-full border border-[#D8A545]/10" />
      {symbols.map((symbol, index) => {
        const angle = (index / symbols.length) * 360
        return (
          <span
            key={symbol}
            className="absolute left-1/2 top-1/2 font-serif text-2xl text-[#F2D07C]/55"
            style={{ transform: `rotate(${angle}deg) translateY(clamp(-175px, -36vw, -118px)) rotate(-${angle}deg)` }}
          >
            {symbol}
          </span>
        )
      })}
    </motion.div>
  )
}

function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [showSticky, setShowSticky] = useState(false)
  const [messageIndex, setMessageIndex] = useState(0)
  const [openFaq, setOpenFaq] = useState(0)
  const [paymentModal, setPaymentModal] = useState<null | '25min' | '60min'>(null)
  const { scrollYProgress } = useScroll()
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, -70])

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 650)
    const messageTimer = window.setInterval(
      () => setMessageIndex((current) => (current + 1) % trustMessages.length),
      2300,
    )

    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.clearInterval(messageTimer)
    }
  }, [])

  useEffect(() => {
    if (document.querySelector('script[src="https://elfsightcdn.com/platform.js"]')) return

    const script = document.createElement('script')
    script.src = 'https://elfsightcdn.com/platform.js'
    script.async = true
    document.body.appendChild(script)
  }, [])

  const navItems = [
    ['Benefits', '#benefits'],
    ["What's Inside", '#inside'],
    ['Offer', '#offer'],
    ['About Ashima', '#about'],
    ['Reviews', '#reviews'],
    ['FAQ', '#faq'],
  ]

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#050505] text-[#FAFAFA] selection:bg-[#D8A545] selection:text-black">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-1/2 top-[-15%] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#D8A545]/10 blur-[130px]" />
        <div className="absolute bottom-[12%] right-[-10%] h-[420px] w-[420px] rounded-full bg-[#F2D07C]/8 blur-[120px]" />
        <div className="zodiac-texture absolute inset-0 opacity-[0.16]" />
      </div>

      <header className="fixed left-0 right-0 top-0 z-50 border-b border-[#D8A545]/15 bg-[#050505]/70 backdrop-blur-2xl">
        <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-5 sm:py-5 lg:px-8">
          <div className="h-11 w-11 lg:hidden" aria-hidden="true" />

          <a
            href="#top"
            onClick={() => setMenuOpen(false)}
            className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[#F2D07C]/55 bg-[#050505] p-1 shadow-[0_0_40px_rgba(216,165,69,0.32)] transition hover:scale-105 sm:h-16 sm:w-16 sm:p-1.5 md:h-24 md:w-24"
            aria-label="Ashima Empowers logo"
          >
            <img src={brandLogo} alt="Ashima Empowers personalized life blueprint logo" className="h-full w-full rounded-full object-cover" />
          </a>

          <div className="hidden items-center gap-8 pl-0 lg:flex">
            {navItems.map(([label, href]) => (
              <a key={label} href={href} className="text-sm text-[#A0A0A0] transition hover:text-[#F2D07C]">
                {label}
              </a>
            ))}
          </div>

          <button
            onClick={scrollToOffer}
            className="hidden rounded-full border border-[#F2D07C]/40 bg-[#D8A545] px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-black shadow-[0_0_35px_rgba(216,165,69,0.22)] transition hover:-translate-y-0.5 hover:bg-[#F2D07C] lg:inline-flex"
          >
            Explore Services
          </button>

          <button
            className="grid h-11 w-11 place-items-center rounded-full border border-[#D8A545]/25 bg-white/5 lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-t border-[#D8A545]/10 bg-[#050505]/95 px-5 py-6 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-4">
              {navItems.map(([label, href]) => (
                <a key={label} href={href} onClick={() => setMenuOpen(false)} className="text-[#A0A0A0]">
                  {label}
                </a>
              ))}
              <button
                onClick={() => {
                  setMenuOpen(false)
                  scrollToOffer()
                }}
                className="rounded-full bg-[#D8A545] px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-black"
              >
                Explore Services
              </button>
            </div>
          </motion.div>
        )}
      </header>

      <main id="top" className="relative z-10">
        <section className="mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-4 pb-16 pt-28 sm:px-5 sm:pb-20 sm:pt-32 lg:grid-cols-[0.98fr_1.02fr] lg:gap-14 lg:px-8 lg:pb-28 lg:pt-36">
          <motion.div style={{ y: portraitY }} className="relative mx-auto w-full max-w-[560px] lg:max-w-none">
            <div className="relative aspect-[0.86] min-h-[390px] overflow-hidden rounded-[2rem] border border-[#D8A545]/25 bg-[#0D0D0D] p-3 shadow-[0_30px_120px_rgba(0,0,0,0.65)] min-[380px]:min-h-[430px] sm:min-h-[540px] sm:rounded-[2.5rem] sm:p-4">
              <ZodiacWheel />
              <div className="absolute inset-3 z-10 overflow-hidden rounded-[1.5rem] border border-white/10 bg-gradient-to-b from-white/5 to-black/40 sm:inset-4 sm:rounded-[2rem]">
                <img src={portrait} alt="Ashima Gautam astrologer numerologist and palm reader" className="h-full w-full object-cover object-center mix-blend-luminosity contrast-110" fetchPriority="high" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
              </div>
              <div className="absolute bottom-5 left-5 right-5 z-20 rounded-3xl border border-[#D8A545]/30 bg-black/45 p-4 backdrop-blur-2xl sm:bottom-8 sm:left-8 sm:right-8 sm:p-5">
                <p className="font-['Cinzel'] text-xl text-white sm:text-2xl">Ashima Gautam</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-[#D8A545] sm:text-sm sm:tracking-[0.18em] md:tracking-[0.24em]">Astrologer + Numerologist + Palm Reader</p>
              </div>
            </div>

            <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute left-1 top-12 z-30 rounded-2xl border border-[#D8A545]/25 bg-[#050505]/75 px-3 py-2 text-xs text-white backdrop-blur-xl sm:-left-8 sm:top-20 sm:px-4 sm:py-3 sm:text-sm">
              ✨ Personalized For You
            </motion.div>
            <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute right-1 top-1/2 z-30 rounded-2xl border border-[#D8A545]/25 bg-[#050505]/75 px-3 py-2 text-xs text-white backdrop-blur-xl sm:-right-7 sm:px-4 sm:py-3 sm:text-sm">
              💬 1:1 Consultation
            </motion.div>
          </motion.div>

          <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.12 }} className="relative">
            <motion.div
              variants={sectionVariant}
              className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-[#D8A545]/25 bg-white/[0.04] px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-[#F2D07C] backdrop-blur-xl sm:mb-7 sm:px-4 sm:text-xs sm:tracking-[0.24em]"
            >
              <LockKeyhole className="h-4 w-4" /> Created Specifically Using Your Birth Details
            </motion.div>

            <motion.h1 variants={sectionVariant} className="font-['Cinzel'] text-[2.75rem] leading-[0.98] tracking-[-0.04em] text-white min-[380px]:text-5xl sm:text-6xl lg:text-8xl">
              Your Life.
              <span className="mt-2 block bg-gradient-to-r from-[#F2D07C] via-white to-[#D8A545] bg-clip-text text-transparent">
                Written In The Stars.
              </span>
            </motion.h1>

            <motion.p variants={sectionVariant} className="mt-6 max-w-2xl font-['Cormorant_Garamond'] text-[1.45rem] leading-relaxed text-[#d8d8d8] sm:mt-8 sm:text-3xl">
              Every journey is unique. Receive personalized Clarity through Astrology, Numerology, and Palmistry—whether you prefer a short video report/recording or a private 1:1 consultation with Ashima.
            </motion.p>

            <motion.div variants={sectionVariant} className="mt-9 flex flex-col gap-5 sm:mt-10 sm:flex-row sm:items-center">
              <button
                onClick={scrollToOffer}
                className="luxury-cta group relative w-full overflow-visible rounded-full border border-[#F2D07C]/80 px-5 py-5 text-center text-[11px] font-black uppercase tracking-[0.1em] text-black shadow-[0_0_55px_rgba(216,165,69,0.28)] transition hover:-translate-y-1 sm:w-auto sm:px-10 sm:py-6 sm:text-sm sm:tracking-[0.16em]"
              >
                <span className="absolute inset-0 overflow-hidden rounded-full">
                  <span className="absolute inset-0 bg-[#D8A545]" />
                  <span className="luxury-cta-orb luxury-cta-orb-one" />
                  <span className="luxury-cta-orb luxury-cta-orb-two" />
                  <span className="luxury-cta-glow" />
                  <span className="luxury-cta-lines" />
                  <span className="luxury-cta-spark luxury-cta-spark-one" />
                  <span className="luxury-cta-spark luxury-cta-spark-two" />
                  <span className="luxury-cta-spark luxury-cta-spark-three" />
                </span>
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Explore Personalized Guidance <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </button>
              <div className="w-full rounded-2xl border border-[#D8A545]/20 bg-[#0D0D0D]/80 px-5 py-3 backdrop-blur-xl sm:w-auto">
                <p className="font-['Cinzel'] text-xl text-[#F2D07C]">Premium Services</p>
                <p className="mt-1 text-xs uppercase tracking-[0.22em] text-[#A0A0A0]">Options from ₹499</p>
              </div>
            </motion.div>

            <motion.div variants={sectionVariant} id="benefits" className="mt-7 grid gap-3 sm:mt-9 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3 text-sm text-[#D7D7D7]">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-[#D8A545]/35 bg-[#D8A545]/10">
                    <Check className="h-3.5 w-3.5 text-[#F2D07C]" />
                  </span>
                  {benefit}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        <section id="offer" className="mx-auto max-w-7xl px-4 py-16 sm:px-5 sm:py-24 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-xs uppercase tracking-[0.24em] text-[#D8A545] sm:tracking-[0.35em]">Premium Offerings</p>
            <h2 className="mt-4 font-['Cinzel'] text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
              Choose The Guidance That Fits Your Needs
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3 items-stretch">
            {/* Service 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-[#D8A545]/20 bg-[#0D0D0D]/75 p-6 sm:p-8 backdrop-blur-2xl transition hover:border-[#D8A545]/45 hover:shadow-[0_0_50px_rgba(216,165,69,0.08)]"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-[#D8A545]">Recorded Video</p>
                <h3 className="mt-3 font-['Cinzel'] text-2xl text-white">
                  10-Minute Personalized Video Report
                </h3>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="font-['Cinzel'] text-4xl text-[#F2D07C]">₹499</span>
                  <span className="text-sm text-[#A0A0A0] line-through">₹3,999</span>
                </div>
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-sm text-[#D7D7D7]">
                    <span className="text-[#D8A545] text-base">✦</span>
                    <span>Astrology + Numerology will be analysed</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-sm text-[#D7D7D7]">
                    <span className="text-red-500 text-sm">❌</span>
                    <span>no 1:1 Interaction</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-sm text-[#D7D7D7]">
                    <span className="text-red-500 text-sm">❌</span>
                    <span>no voice call / video call</span>
                  </div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={goToPayment}
                className="w-full mt-8 rounded-full bg-[#D8A545]/10 border border-[#D8A545]/45 hover:bg-[#D8A545] hover:text-black py-4 text-center text-xs font-black uppercase tracking-[0.12em] text-[#F2D07C] transition-all duration-300 shadow-[0_0_30px_rgba(216,165,69,0.05)] cursor-pointer"
              >
                <span className="flex items-center justify-center gap-2">
                  Get My Video Report <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </motion.button>
            </motion.div>

            {/* Service 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-[#D8A545]/20 bg-[#0D0D0D]/75 p-6 sm:p-8 backdrop-blur-2xl transition hover:border-[#D8A545]/45 hover:shadow-[0_0_50px_rgba(216,165,69,0.08)]"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-[#D8A545]">Live Session</p>
                <h3 className="mt-3 font-['Cinzel'] text-2xl text-white">
                  25-Minute Private Consultation
                </h3>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="font-['Cinzel'] text-4xl text-[#F2D07C]">$120 CAD 🇨🇦</span>
                  <span className="text-sm text-[#A0A0A0] line-through">$450</span>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-['Cinzel'] text-4xl text-[#F2D07C]">🇮🇳 ₹6,100</span>
                </div>
                <p className="mt-2 font-['Cormorant_Garamond'] text-lg text-[#D7D7D7]">
                  <span className="rounded-md bg-[#D8A545]/25 px-2 py-0.5 font-bold text-[#F2D07C]">Special Offer</span> for Indian Clients
                </p>
                <p className="mt-1.5">
                  <span className="rounded-md border border-[#F2D07C]/40 bg-[#D8A545]/15 px-2.5 py-1 text-sm font-bold tracking-wide text-[#F2D07C]">(Limited-Time-Offer)</span>
                </p>
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-sm text-[#D7D7D7]">
                    <span className="text-[#D8A545] text-base">✦</span>
                    <span>voice/video call</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-sm text-[#D7D7D7]">
                    <span className="text-[#D8A545] text-base">✦</span>
                    <span>Astrology + Numerology + Palmistry Analysis</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-sm text-[#D7D7D7]">
                    <span className="text-[#D8A545] text-base">✦</span>
                    <span>Relevant for 2-3 Questions</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-sm text-[#D7D7D7]">
                    <span className="text-[#D8A545] text-base">✦</span>
                    <span>1:1 Consultation</span>
                  </div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setPaymentModal('25min')}
                className="w-full mt-8 rounded-full bg-[#D8A545]/10 border border-[#D8A545]/45 hover:bg-[#D8A545] hover:text-black py-4 text-center text-xs font-black uppercase tracking-[0.12em] text-[#F2D07C] transition-all duration-300 shadow-[0_0_30px_rgba(216,165,69,0.05)] cursor-pointer"
              >
                <span className="flex items-center justify-center gap-2">
                  Book 25-Min Consultation <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </motion.button>
            </motion.div>

            {/* Service 3 (Highlighted) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-[#D8A545]/45 bg-[radial-gradient(circle_at_top,rgba(216,165,69,0.18),rgba(13,13,13,0.98)_55%)] p-6 sm:p-8 shadow-[0_0_80px_rgba(216,165,69,0.15)] backdrop-blur-2xl"
            >
              <div className="absolute right-6 top-6 rounded-full bg-[#D8A545] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-black">
                Most Popular
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-[#F2D07C]">Premium Experience</p>
                <h3 className="mt-3 font-['Cinzel'] text-2xl text-white">
                  60-Minute Complete Consultation
                </h3>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="font-['Cinzel'] text-4xl text-[#F2D07C]">$200 CAD 🇨🇦</span>
                  <span className="text-sm text-[#A0A0A0] line-through">$750</span>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-['Cinzel'] text-4xl text-[#F2D07C]">🇮🇳 ₹11,000</span>
                </div>
                <p className="mt-2 font-['Cormorant_Garamond'] text-lg text-white">
                  <span className="rounded-md bg-[#D8A545]/25 px-2 py-0.5 font-bold text-[#F2D07C]">Special</span> Offer for Indian Clients
                </p>
                <p className="mt-1.5">
                  <span className="rounded-md border border-[#F2D07C]/40 bg-[#D8A545]/15 px-2.5 py-1 text-sm font-bold tracking-wide text-[#F2D07C]">(Limited-Time-Offer)</span>
                </p>
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 rounded-xl border border-[#D8A545]/20 bg-[#D8A545]/5 px-4 py-3 text-sm text-white">
                    <span className="text-[#F2D07C] text-base">✦</span>
                    <span>comprehensive one-on-one consultation</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl border border-[#D8A545]/20 bg-[#D8A545]/5 px-4 py-3 text-sm text-white">
                    <span className="text-[#F2D07C] text-base">✦</span>
                    <span>detailed Kundli analysis, Astrology, Numerology, Palmistry</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl border border-[#D8A545]/20 bg-[#D8A545]/5 px-4 py-3 text-sm text-white">
                    <span className="text-[#F2D07C] text-base">✦</span>
                    <span>Relevant if want to have a deep soulfull session</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl border border-[#D8A545]/20 bg-[#D8A545]/5 px-4 py-3 text-sm text-white">
                    <span className="text-[#F2D07C] text-base">✦</span>
                    <span>Life/Spiritual Guidance</span>
                  </div>
                </div>
              </div>
              <motion.button
                whileHover="hover"
                whileTap="tap"
                variants={{
                  hover: { scale: 1.03, y: -2 },
                  tap: { scale: 0.98 }
                }}
                onClick={() => setPaymentModal('60min')}
                className="luxury-cta no-offer-badge group relative mt-8 w-full overflow-visible rounded-full border border-[#F2D07C]/80 py-4 text-center text-xs font-black uppercase tracking-[0.12em] text-[#F2D07C] shadow-[0_0_40px_rgba(216,165,69,0.22)] transition hover:bg-[#F2D07C] cursor-pointer"
              >
                <span className="absolute inset-0 overflow-hidden rounded-full">
                  <span className="absolute inset-0 bg-[#D8A545]" />
                  <span className="luxury-cta-orb luxury-cta-orb-one" />
                  <span className="luxury-cta-orb luxury-cta-orb-two" />
                  <span className="luxury-cta-glow" />
                  <span className="luxury-cta-lines" />
                  <span className="luxury-cta-spark luxury-cta-spark-one" />
                  <span className="luxury-cta-spark luxury-cta-spark-two" />
                  <span className="luxury-cta-spark luxury-cta-spark-three" />
                </span>
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Book Complete Consultation{" "}
                  <motion.span
                    variants={{
                      hover: { x: 4 },
                      tap: { x: 0 }
                    }}
                    className="inline-block"
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                  </motion.span>
                </span>
              </motion.button>
            </motion.div>
          </div>
        </section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.08 }}
          className="mx-auto max-w-7xl px-4 py-16 sm:px-5 sm:py-24 lg:px-8"
        >
          <motion.h2 variants={sectionVariant} className="mx-auto mt-4 max-w-4xl text-center font-['Cinzel'] text-3xl leading-tight text-white sm:text-4xl md:text-6xl">
            You've Wondered About These Things Before
          </motion.h2>
          <div className="mt-10 grid gap-4 sm:mt-14 md:grid-cols-5">
            {questions.map((question, index) => (
              <motion.div
                key={question}
                variants={sectionVariant}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group min-h-36 rounded-[1.5rem] border border-[#D8A545]/15 bg-[#0D0D0D]/70 p-5 backdrop-blur-xl transition hover:border-[#D8A545]/45 hover:bg-[#14110b] sm:min-h-48 sm:rounded-[2rem] sm:p-6"
              >
                <span className="font-['Cinzel'] text-4xl text-[#D8A545]/25 sm:text-5xl">0{index + 1}</span>
                <p className="mt-5 font-['Cormorant_Garamond'] text-[1.65rem] leading-tight text-white sm:mt-8 sm:text-2xl">{question}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <section id="inside" className="relative mx-auto max-w-7xl px-4 py-16 sm:px-5 sm:py-24 lg:px-8">
          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, rotateX: 8, y: 50 }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative mx-auto w-full max-w-[520px]"
            >
              <div className="absolute inset-0 rotate-2 rounded-[1.5rem] border border-[#D8A545]/20 bg-[#D8A545]/5 sm:rotate-3 sm:rounded-[2rem]" />
              <div className="relative rounded-[1.5rem] border border-[#D8A545]/35 bg-[#0D0D0D] p-4 shadow-[0_40px_120px_rgba(216,165,69,0.12)] sm:rounded-[2rem] sm:p-7">
                <div className="rounded-[1.25rem] border border-[#D8A545]/20 bg-black p-5 sm:rounded-[1.5rem] sm:p-8">
                  <div className="flex items-center justify-between border-b border-[#D8A545]/20 pb-6">
                    <span className="text-xs uppercase tracking-[0.26em] text-[#D8A545] sm:tracking-[0.4em]">Confidential</span>
                    <LockKeyhole className="h-5 w-5 text-[#F2D07C]" />
                  </div>
                  <h3 className="mt-10 font-['Cinzel'] text-3xl leading-tight text-white sm:mt-14 sm:text-4xl">Personal Life Blueprint</h3>
                  <p className="mt-4 font-['Cormorant_Garamond'] text-2xl text-[#F2D07C] sm:mt-5">Prepared for one individual</p>
                  <div className="mt-12 space-y-4">
                    {blueprintPreview.slice(0, 5).map((item, index) => (
                      <div key={item} className="flex items-center justify-between border-b border-white/10 pb-3">
                        <span className="text-[#A0A0A0]">{item}</span>
                        <span className="font-['Cinzel'] text-[#D8A545]">{String(index + 1).padStart(2, '0')}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-10 min-h-24 rounded-2xl border border-[#D8A545]/20 bg-[linear-gradient(135deg,rgba(216,165,69,.12),rgba(255,255,255,.02))] p-5 sm:mt-12">
                    <p className="text-xs uppercase leading-relaxed tracking-[0.18em] text-[#D8A545] sm:tracking-[0.25em]">Private interpretation enclosed by ASHIMA</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-4 py-16 sm:px-5 sm:py-24 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
              <div className="absolute inset-8 rounded-full bg-[#D8A545]/15 blur-3xl" />
              <img src={portrait} alt="Ashima Gautam creating personalized life reports" className="relative aspect-[4/5] w-full rounded-[2rem] border border-[#D8A545]/25 object-cover shadow-2xl grayscale-[20%] sm:rounded-[2.5rem]" loading="lazy" />
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariant}>
              <p className="text-xs uppercase tracking-[0.24em] text-[#D8A545] sm:tracking-[0.35em]">About Ashima</p>
              <h2 className="mt-4 font-['Cinzel'] text-3xl leading-tight sm:text-4xl md:text-6xl">Guidance Without Fear.</h2>
              <p className="mt-6 font-['Cormorant_Garamond'] text-2xl leading-relaxed text-white sm:mt-7 sm:text-3xl">
                Ashima combines Astrology, Numerology and Palmistry to help people understand themselves more clearly.
              </p>
              <p className="mt-5 text-lg leading-relaxed text-[#A0A0A0]">
                Her work is designed for clarity, awareness, guidance and self-understanding — never pressure, superstition or manipulation.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {['No Fear Tactics', 'No Fake Remedies', 'No Gemstone Selling', 'Only Personalized Guidance'].map((badge) => (
                  <span key={badge} className="rounded-full border border-[#D8A545]/25 bg-white/[0.035] px-4 py-2 text-sm text-[#F2D07C]">
                    {badge}
                  </span>
                ))}
              </div>
              <a href="https://www.instagram.com/ashima_empowers" target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-3 text-[#F2D07C] hover:text-white">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
                </svg>
                @ashima_empowers
              </a>
            </motion.div>
          </div>
        </section>

        <section id="reviews" className="overflow-hidden py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 text-center lg:px-8">
            <p className="text-xs uppercase tracking-[0.24em] text-[#D8A545] sm:tracking-[0.35em]">Private client notes</p>
            <h2 className="mt-4 font-['Cinzel'] text-3xl sm:text-4xl md:text-6xl">Felt Written Specifically For Me</h2>
          </div>
          <div className="mx-4 mt-10 max-w-6xl rounded-[2rem] border border-[#D8A545]/20 bg-[#0D0D0D]/75 p-3 shadow-[0_0_80px_rgba(216,165,69,0.1)] backdrop-blur-2xl sm:mx-auto sm:mt-14 sm:rounded-[2.5rem] sm:p-4 md:p-8">
            <div className="elfsight-app-5a7a8e6f-1515-45fa-8f33-81aa6506c964" data-elfsight-app-lazy />
          </div>

          {/* Handcrafted Luxury Client Testimonials */}
          <div className="mx-auto max-w-7xl px-4 mt-12 grid gap-6 sm:grid-cols-3 lg:px-8">
            <div className="rounded-3xl border border-[#D8A545]/15 bg-[#0D0D0D]/60 p-6 backdrop-blur-xl">
              <div className="flex items-center gap-1 text-[#F2D07C] mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[#D8A545] text-[#D8A545]" />
                ))}
              </div>
              <p className="font-['Cormorant_Garamond'] text-xl italic leading-relaxed text-white">
                "The 10-Minute Video Report was incredibly accurate. Ashima picked up on career timing that played out exactly as she predicted. I love that I can watch it whenever I need guidance."
              </p>
              <p className="mt-4 text-xs uppercase tracking-wider text-[#D8A545] font-semibold">— Rahul M., Delhi</p>
            </div>

            <div className="rounded-3xl border border-[#D8A545]/25 bg-[#D8A545]/5 p-6 backdrop-blur-xl shadow-[0_0_40px_rgba(216,165,69,0.05)]">
              <div className="flex items-center gap-1 text-[#F2D07C] mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[#D8A545] text-[#D8A545]" />
                ))}
              </div>
              <p className="font-['Cormorant_Garamond'] text-xl italic leading-relaxed text-white">
                "My 60-Minute Complete Consultation with Ashima was life-changing. We did a deep dive into my Kundli, Palmistry, and Numerology. Being able to ask questions live gave me so much clarity."
              </p>
              <p className="mt-4 text-xs uppercase tracking-wider text-[#F2D07C] font-semibold">— Sneha R., Mumbai</p>
            </div>

            <div className="rounded-3xl border border-[#D8A545]/15 bg-[#0D0D0D]/60 p-6 backdrop-blur-xl">
              <div className="flex items-center gap-1 text-[#F2D07C] mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[#D8A545] text-[#D8A545]" />
                ))}
              </div>
              <p className="font-['Cormorant_Garamond'] text-xl italic leading-relaxed text-white">
                "The 25-Minute Private Consultation was perfect. I had two very specific questions about my business transition, and Ashima gave me precise, actionable guidance without any fear tactics."
              </p>
              <p className="mt-4 text-xs uppercase tracking-wider text-[#D8A545] font-semibold">— Arjun K., Bangalore</p>
            </div>
          </div>
        </section>

        <section id="faq" className="mx-auto max-w-4xl px-4 py-16 sm:px-5 sm:py-24 lg:px-8">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.24em] text-[#D8A545] sm:tracking-[0.35em]">FAQ</p>
            <h2 className="mt-4 font-['Cinzel'] text-3xl sm:text-4xl md:text-6xl">Before You Unlock It</h2>
          </div>
          <div className="mt-10 space-y-4 sm:mt-12">
            {faqs.map((faq, index) => (
              <div key={faq.question} className="rounded-[1.5rem] border border-[#D8A545]/15 bg-[#0D0D0D]/75 backdrop-blur-xl">
                <button
                  className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                >
                  <span className="font-['Cinzel'] text-base leading-relaxed text-white sm:text-lg">{faq.question}</span>
                  <ChevronDown className={`h-5 w-5 text-[#D8A545] transition ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === index && (
                  <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="px-5 pb-5 text-sm leading-relaxed text-[#A0A0A0] sm:px-6 sm:pb-6 sm:text-base">
                    {faq.answer}
                  </motion.p>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-5 sm:py-24 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-[2rem] border border-[#D8A545]/20 bg-[#0D0D0D]/60 p-5 backdrop-blur-2xl sm:rounded-[3rem] sm:p-8 md:p-16">
            <Eye className="mx-auto mb-8 h-10 w-10 text-[#F2D07C]" />
            <h2 className="font-['Cinzel'] text-3xl leading-tight sm:text-4xl md:text-7xl">
              Your Future Is Already Written.
              <span className="block text-[#F2D07C]">Choose Your Path.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl font-['Cormorant_Garamond'] text-xl sm:text-2xl text-[#A0A0A0]">
              Whether you prefer a private custom video report or a live, in-depth personal conversation, find the guidance that best matches your needs.
            </p>
            <button onClick={scrollToOffer} className="mt-10 w-full rounded-full bg-[#D8A545] px-5 py-5 text-xs font-black uppercase tracking-[0.12em] text-black transition hover:-translate-y-1 hover:bg-[#F2D07C] sm:w-auto sm:px-9 sm:text-sm sm:tracking-[0.18em] cursor-pointer">
              Choose Your Guidance Service
            </button>
          </motion.div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-[#D8A545]/15 px-4 py-10 pb-28 sm:px-5 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 text-sm text-[#A0A0A0] md:flex-row md:items-center">
          <p className="font-['Cinzel'] tracking-[0.24em] text-white">ASHIMA EMPOWERS</p>
          <p>Personalized clarity, awareness and self-understanding. No fear tactics. No superstition.</p>
        </div>
      </footer>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: showSticky ? 1 : 0, y: showSticky ? 0 : 30, pointerEvents: showSticky ? 'auto' : 'none' }}
        className="fixed bottom-3 left-1/2 z-50 w-[calc(100%-1rem)] max-w-4xl -translate-x-1/2 rounded-[1.75rem] border border-[#D8A545]/35 bg-[#050505]/78 p-3 shadow-[0_0_60px_rgba(216,165,69,0.2)] backdrop-blur-2xl sm:bottom-4 sm:rounded-full md:bottom-6 md:p-3.5"
      >
        <div className="flex items-center justify-between gap-3">
          <div className="hidden items-center gap-5 pl-5 lg:flex">
            <div>
              <p className="font-['Cinzel'] text-sm text-white">Personalized Guidance</p>
              <p className="text-xs text-[#A0A0A0]">By Ashima Gautam</p>
            </div>
            <p className="text-sm text-[#A0A0A0]">Options from</p>
            <p className="font-['Cinzel'] text-2xl text-[#F2D07C]">₹499</p>
            <p className="text-sm text-[#F2D07C]">{trustMessages[messageIndex]}</p>
          </div>
          <div className="flex min-w-0 items-center gap-2 pl-1 sm:gap-3 sm:pl-3 lg:hidden">
            <p className="font-['Cinzel'] text-2xl text-[#F2D07C]">₹499</p>
            <p className="truncate text-xs text-[#F2D07C]">{trustMessages[messageIndex]}</p>
          </div>
          <button onClick={scrollToOffer} className="shrink-0 rounded-full bg-[#D8A545] px-4 py-4 text-[11px] font-black uppercase tracking-[0.08em] text-black transition hover:bg-[#F2D07C] sm:px-5 sm:text-xs sm:tracking-[0.12em] md:px-7 md:py-4.5">
            <span className="hidden lg:inline">Book Now →</span>
            <span className="lg:hidden">Book Now</span>
          </button>
        </div>
      </motion.div>

      {paymentModal && (
        <PaymentModal
          type={paymentModal}
          onClose={() => setPaymentModal(null)}
        />
      )}
    </div>
  )
}

function PaymentModal({ type, onClose }: { type: '25min' | '60min'; onClose: () => void }) {
  const option = paymentOptions[type]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] grid place-items-center bg-black/75 px-4 py-8 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0, y: 20 }}
        transition={{ type: 'spring', stiffness: 200, damping: 18 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-[#D8A545]/40 bg-[#0D0D0D] p-6 shadow-[0_0_90px_rgba(216,165,69,0.25)] backdrop-blur-2xl sm:p-8"
      >
        <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-[#D8A545]/15 blur-[80px]" />

        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-full border border-[#D8A545]/25 bg-white/5 text-[#A0A0A0] transition hover:text-white"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative z-10 text-center">
          <p className="text-xs uppercase tracking-[0.24em] text-[#D8A545]">Select Payment Option</p>
          <h3 className="mt-3 font-['Cinzel'] text-2xl text-white sm:text-3xl">{option.title}</h3>
          <p className="mt-3 text-sm text-[#A0A0A0]">Choose your preferred payment method below to continue.</p>
          <div className="mx-auto mt-5 h-px max-w-[180px] bg-gradient-to-r from-transparent via-[#F2D07C] to-transparent" />
        </div>

        <div className="relative z-10 mt-7 space-y-4">
          <a
            href={option.india.url}
            className="group flex items-center justify-between gap-4 rounded-2xl border border-[#D8A545]/30 bg-[#D8A545]/8 p-5 transition hover:border-[#F2D07C]/70 hover:bg-[#D8A545]/15"
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl">{option.india.flags}</span>
              <div>
                <p className="font-['Cinzel'] text-lg text-white">{option.india.label}</p>
                <p className="text-xs text-[#A0A0A0]">Pay via UPI / Stripe</p>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-[#F2D07C] transition group-hover:translate-x-1" />
          </a>

          <a
            href={option.foreign.url}
            className="group flex items-center justify-between gap-4 rounded-2xl border border-[#D8A545]/30 bg-[#D8A545]/8 p-5 transition hover:border-[#F2D07C]/70 hover:bg-[#D8A545]/15"
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl">{option.foreign.flags}</span>
              <div>
                <p className="font-['Cinzel'] text-lg text-white">{option.foreign.label}</p>
                <p className="text-xs text-[#A0A0A0]">International payment via Stripe</p>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-[#F2D07C] transition group-hover:translate-x-1" />
          </a>
        </div>

        <p className="relative z-10 mt-6 text-center text-[11px] text-[#A0A0A0]">
          🔒 Secure payment powered by Stripe
        </p>
      </motion.div>
    </motion.div>
  )
}

function App() {
  if (window.location.pathname === '/admin') {
    return <AdminPage />
  }

  if (window.location.pathname === '/thankyoupage') {
    return <ThankYouPage />
  }

  return <LandingPage />
}

export default App

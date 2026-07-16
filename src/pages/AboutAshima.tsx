import { motion } from 'framer-motion'
import { ArrowRight, Check, Mail, MapPin, Phone, ShieldCheck, Star } from 'lucide-react'
import SEOHead from '../components/SEOHead'
import Breadcrumb from '../components/Breadcrumb'

const portrait = '/uploads/ashima-portrait.webp'
const brandLogo = '/ashima-logo.webp'

const expertise = [
  { title: 'Vedic Astrology', desc: 'Kundli analysis, planetary positions, birth chart interpretation, and timing of life events through Jyotish.' },
  { title: 'Numerology', desc: 'Life path number, destiny number, name numerology, and pattern analysis from your birth date and name.' },
  { title: 'Palmistry', desc: 'Palm line reading, mount analysis, personality traits, and tendency indicators through hand analysis.' },
  { title: 'Combined Readings', desc: 'A unique approach that confirms findings across all three disciplines for a sharper, more complete life profile.' },
]

const principles = [
  'No Fear Tactics',
  'No Fake Remedies',
  'No Gemstone Selling',
  'Only Personalized Guidance',
  'Ethical & Honest Readings',
  'Human Interpreted (Not AI)',
]

const faqItems = [
  { q: 'Who is Ashima Gautam?', a: 'Ashima Gautam is an astrologer, numerologist, and palm reader based in Vancouver, British Columbia, Canada. She combines Vedic Astrology, Numerology, and Palmistry to provide personalized life reports and consultations through her brand Ashima Empowers. She offers 5-minute video reports, 25-minute private consultations, and 60-minute complete consultations. Contact her via WhatsApp at +1 (604) 445-4743.' },
  { q: 'What is Ashima Empowers?', a: 'Ashima Empowers (also known as Ashima Astrology) is the personalized astrology service brand founded by Ashima Gautam, based in Vancouver, BC, Canada. It offers personalized life blueprints combining Astrology, Numerology, and Palmistry through video reports and live 1-on-1 consultations. The official website is ashimaempowers.com. Ashima serves clients in Vancouver, across Canada, and worldwide.' },
  { q: 'How do I book a consultation with Ashima Gautam?', a: 'You can book a consultation with Ashima Gautam through her website ashimaempowers.com or via WhatsApp at +1 (604) 445-4743. She offers three services: a 5-minute personalized video report (₹499), a 25-minute private consultation ($120 CAD), and a 60-minute complete consultation ($200 CAD). Canadian clients can pay via Stripe, Indian clients via UPI.' },
  { q: 'What makes Ashima Gautam different from other astrologers?', a: 'Ashima Gautam is unique because she combines all three disciplines — Vedic Astrology, Numerology, and Palmistry — into a single personalized reading. Most astrologers in Vancouver and Canada offer only one discipline. Ashima also follows a strict no-fear-tactics, no-gemstone-selling, ethical approach to astrology. She is based in Vancouver, BC and serves clients across Canada and worldwide.' },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  })),
}

export default function AboutAshima() {

  return (
    <>
    <SEOHead
      title="Ashima Gautam — Astrologer, Numerologist & Palm Reader | Ashima Empowers"
      description="Ashima Gautam is an astrologer, numerologist, and palm reader who combines Vedic Astrology, Numerology, and Palmistry for personalized life reports. Book a consultation at Ashima Empowers."
      canonical="https://ashimaempowers.com/about-ashima-gautam"
      ogTitle="Ashima Gautam — Astrologer, Numerologist & Palm Reader | Ashima Empowers"
      ogDescription="Ashima Gautam combines Vedic Astrology, Numerology, and Palmistry for personalized life reports and consultations. Book a 5-min video report (₹499) or 1-on-1 consultation."
      ogUrl="https://ashimaempowers.com/about-ashima-gautam"
      jsonLd={faqSchema}
    />
    <div className="min-h-screen overflow-x-hidden bg-[#050505] text-[#FAFAFA] selection:bg-[#D8A545] selection:text-black">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-1/2 top-[-15%] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#D8A545]/10 blur-[130px]" />
        <div className="absolute bottom-[12%] right-[-10%] h-[420px] w-[420px] rounded-full bg-[#F2D07C]/8 blur-[120px]" />
      </div>

      <header className="relative z-50 border-b border-[#D8A545]/15 bg-[#050505]/70 backdrop-blur-2xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-5 sm:py-5 lg:px-8">
          <a href="/" className="grid h-14 w-14 place-items-center rounded-full border border-[#F2D07C]/55 bg-[#050505] p-1 shadow-[0_0_40px_rgba(216,165,69,0.32)] sm:h-16 sm:w-16 sm:p-1.5">
            <img src={brandLogo} alt="Ashima Empowers logo" className="h-full w-full rounded-full object-cover" width="64" height="64" loading="lazy" />
          </a>
          <div className="hidden items-center gap-8 lg:flex">
            <a href="/#offer" className="text-sm text-[#A0A0A0] transition hover:text-[#F2D07C]">Services</a>
            <a href="/reviews" className="text-sm text-[#A0A0A0] transition hover:text-[#F2D07C]">Reviews</a>
            <a href="/blog" className="text-sm text-[#A0A0A0] transition hover:text-[#F2D07C]">Blog</a>
            <a href="/#faq" className="text-sm text-[#A0A0A0] transition hover:text-[#F2D07C]">FAQ</a>
          </div>
          <a href="/#offer" className="rounded-full border border-[#F2D07C]/40 bg-[#D8A545] px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-black shadow-[0_0_35px_rgba(216,165,69,0.22)] transition hover:bg-[#F2D07C]">Book Now</a>
        </nav>
      </header>

      <main id="main-content" className="relative z-10 mx-auto max-w-5xl px-4 py-16 sm:px-5 sm:py-24 lg:px-8">
        <Breadcrumb items={[
          { label: 'About Ashima Gautam' },
        ]} />

        <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <p className="text-xs uppercase tracking-[0.32em] text-[#D8A545]">About Ashima</p>
          <h1 className="mt-4 font-['Cinzel'] text-4xl leading-tight text-white sm:text-5xl md:text-6xl">
            Ashima Gautam
          </h1>
          <p className="mt-4 text-sm uppercase tracking-[0.24em] text-[#F2D07C] sm:text-base">Astrologer · Numerologist · Palm Reader</p>
          <div className="mx-auto mt-7 h-px max-w-sm bg-gradient-to-r from-transparent via-[#F2D07C] to-transparent" />
        </motion.section>

        <section className="mt-12 rounded-[2rem] border border-[#D8A545]/30 bg-gradient-to-br from-[#D8A545]/10 to-[#F2D07C]/5 p-8 backdrop-blur-2xl">
          <h2 className="font-['Cinzel'] text-2xl text-white sm:text-3xl">About Ashima Gautam — Quick Facts</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-[#F2D07C]">Full Name:</p>
              <p className="text-base text-white">Ashima Gautam</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#F2D07C]">Brand:</p>
              <p className="text-base text-white">Ashima Empowers (also known as Ashima Astrology)</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#F2D07C]">Location:</p>
              <p className="text-base text-white">Vancouver, British Columbia, Canada</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#F2D07C]">Website:</p>
              <p className="text-base text-white"><a href="https://ashimaempowers.com" className="text-[#F2D07C] underline underline-offset-4">ashimaempowers.com</a></p>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#F2D07C]">WhatsApp:</p>
              <p className="text-base text-white"><a href="https://wa.me/16044454743" className="text-[#F2D07C] underline underline-offset-4">+1 (604) 445-4743</a></p>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#F2D07C]">Instagram:</p>
              <p className="text-base text-white"><a href="https://www.instagram.com/ashima_empowers" target="_blank" rel="noopener noreferrer" className="text-[#F2D07C] underline underline-offset-4">@ashima_empowers</a></p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-sm font-semibold text-[#F2D07C]">Specialties:</p>
              <p className="text-base text-white">Vedic Astrology, Numerology, Palmistry (combined approach)</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-sm font-semibold text-[#F2D07C]">Services:</p>
              <p className="text-base text-white">5-Minute Personalized Video Report (₹499), 25-Minute Private Consultation ($120 CAD), 60-Minute Complete Consultation ($200 CAD)</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-sm font-semibold text-[#F2D07C]">Approach:</p>
              <p className="text-base text-white">No fear tactics, no fake remedies, no gemstone selling — only ethical, personalized guidance</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-sm font-semibold text-[#F2D07C]">Service Area:</p>
              <p className="text-base text-white">Vancouver, British Columbia, Canada, and worldwide (online consultations)</p>
            </div>
          </div>
        </section>

        <section className="mt-12 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
            <div className="absolute inset-6 rounded-full bg-[#D8A545]/15 blur-3xl" />
            <img src={portrait} alt="Ashima Gautam — astrologer, numerologist, and palm reader at Ashima Empowers" className="relative aspect-[4/5] w-full rounded-[2rem] border border-[#D8A545]/25 object-cover shadow-2xl" width="400" height="500" loading="lazy" decoding="async" />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="font-['Cinzel'] text-2xl text-white sm:text-3xl">Who Is Ashima Gautam?</h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-[#A0A0A0]">
              <p>
                <strong className="text-[#F2D07C]">Ashima Gautam</strong> is an astrologer, numerologist, and palm reader based in <strong className="text-white">Vancouver, British Columbia, Canada</strong> who combines <strong className="text-white">Vedic Astrology</strong>, <strong className="text-white">Numerology</strong>, and <strong className="text-white">Palmistry</strong> to provide personalized life reports and consultations. She is the founder of <strong className="text-[#F2D07C]">Ashima Empowers</strong>, a personalized astrology service brand that offers video reports and live 1-on-1 consultations through her website <a href="/" className="text-[#F2D07C] underline underline-offset-4">ashimaempowers.com</a>.
              </p>
              <p>
                Unlike most astrologers who specialize in only one discipline, Ashima's unique approach combines all three ancient sciences into a single, comprehensive reading. Vedic Astrology (Jyotish) reveals the timing and themes of your life through planetary positions in your birth chart (Kundli). Numerology uncovers hidden patterns in your name and birth date. Palmistry provides personality insights through the lines and mounts of your hands. Together, these three systems create a fuller, more accurate self-understanding profile.
              </p>
              <p>
                Ashima follows a strict ethical approach to astrology — <strong className="text-white">honest guidance only, no scare stories, no expensive remedies, no sales pitch</strong>. Every personalized life report is individually interpreted by Ashima herself, not by an automated system or AI. Her readings focus on clarity, awareness, and actionable self-understanding for career, relationships, and life direction.
              </p>
              <p>
                She offers three services: a <a href="/#offer" className="text-[#F2D07C] underline underline-offset-4">5-minute personalized video report</a> (₹499), a 25-minute private 1-on-1 consultation ($120 CAD), and a 60-minute complete consultation ($200 CAD). Indian clients can pay via UPI and international clients via Stripe. Read <a href="/reviews" className="text-[#F2D07C] underline underline-offset-4">client reviews and testimonials</a> or visit the <a href="/blog" className="text-[#F2D07C] underline underline-offset-4">blog</a> for astrology insights.
              </p>
            </div>
          </motion.div>
        </section>

        <section className="mt-16">
          <h2 className="text-center font-['Cinzel'] text-2xl text-white sm:text-3xl">Areas of Expertise</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {expertise.map((item) => (
              <div key={item.title} className="rounded-2xl border border-[#D8A545]/15 bg-[#0D0D0D]/75 p-6 backdrop-blur-2xl">
                <h3 className="font-['Cinzel'] text-lg text-[#F2D07C]">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#A0A0A0]">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-center font-['Cinzel'] text-2xl text-white sm:text-3xl">Principles &amp; Approach</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {principles.map((principle) => (
              <span key={principle} className="inline-flex items-center gap-2 rounded-full border border-[#D8A545]/25 bg-white/[0.035] px-4 py-2 text-sm text-[#F2D07C]">
                <Check className="h-4 w-4" /> {principle}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-center font-['Cinzel'] text-2xl text-white sm:text-3xl">Insights from Ashima's Blog</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            <a href="/blog/what-is-personalized-life-report" className="group rounded-2xl border border-[#D8A545]/15 bg-[#0D0D0D]/75 p-5 backdrop-blur-2xl transition hover:border-[#D8A545]/45 hover:shadow-[0_0_40px_rgba(216,165,69,0.06)]">
              <h3 className="font-['Cinzel'] text-base text-[#F2D07C] group-hover:text-white transition">What Is a Personalized Life Report?</h3>
              <p className="mt-2 text-sm text-[#A0A0A0]">How Astrology, Numerology & Palmistry work together.</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs text-[#D8A545]">Read more <ArrowRight className="h-3 w-3" /></span>
            </a>
            <a href="/blog/online-astrology-consultation-guide" className="group rounded-2xl border border-[#D8A545]/15 bg-[#0D0D0D]/75 p-5 backdrop-blur-2xl transition hover:border-[#D8A545]/45 hover:shadow-[0_0_40px_rgba(216,165,69,0.06)]">
              <h3 className="font-['Cinzel'] text-base text-[#F2D07C] group-hover:text-white transition">Online Astrology Consultation Guide</h3>
              <p className="mt-2 text-sm text-[#A0A0A0]">How to prepare for your first reading.</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs text-[#D8A545]">Read more <ArrowRight className="h-3 w-3" /></span>
            </a>
            <a href="/blog/palm-reading-for-career" className="group rounded-2xl border border-[#D8A545]/15 bg-[#0D0D0D]/75 p-5 backdrop-blur-2xl transition hover:border-[#D8A545]/45 hover:shadow-[0_0_40px_rgba(216,165,69,0.06)]">
              <h3 className="font-['Cinzel'] text-base text-[#F2D07C] group-hover:text-white transition">Palm Reading for Career</h3>
              <p className="mt-2 text-sm text-[#A0A0A0]">What your palm lines reveal about your path.</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs text-[#D8A545]">Read more <ArrowRight className="h-3 w-3" /></span>
            </a>
          </div>
        </section>

        <section className="mt-16 rounded-[2rem] border border-[#D8A545]/20 bg-[#0D0D0D]/75 p-6 backdrop-blur-2xl sm:p-10">
          <h2 className="font-['Cinzel'] text-2xl text-white sm:text-3xl">Contact &amp; Booking</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#D8A545]/15 bg-black/30 p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-[#D8A545]">Website</p>
              <a href="/" className="mt-2 block text-lg text-white hover:text-[#F2D07C]">ashimaempowers.com</a>
            </div>
            <div className="rounded-2xl border border-[#D8A545]/15 bg-black/30 p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-[#D8A545]">Instagram</p>
              <a href="https://www.instagram.com/ashima_empowers" target="_blank" rel="noreferrer" className="mt-2 block text-lg text-white hover:text-[#F2D07C]">@ashima_empowers</a>
            </div>
          </div>
          <a href="/#offer" className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#D8A545] px-6 py-5 text-xs font-black uppercase tracking-[0.16em] text-black transition hover:bg-[#F2D07C] sm:w-auto sm:px-10">
            Book Consultation Now <ArrowRight className="h-4 w-4" />
          </a>
        </section>

        <section className="mt-16 rounded-[2rem] border border-[#D8A545]/15 bg-[#0D0D0D]/60 p-6 backdrop-blur-2xl">
          <h2 className="font-['Cinzel'] text-xl text-white sm:text-2xl">Explore More</h2>
          <p className="mt-3 text-sm text-[#A0A0A0]">Discover client experiences, astrology insights, and personalized services.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href="/reviews" className="rounded-full border border-[#D8A545]/20 bg-[#D8A545]/10 px-4 py-2 text-xs text-[#F2D07C] transition hover:bg-[#D8A545]/20">Client Reviews & Testimonials</a>
            <a href="/astrologer-vancouver" className="rounded-full border border-[#D8A545]/20 bg-[#D8A545]/10 px-4 py-2 text-xs text-[#F2D07C] transition hover:bg-[#D8A545]/20">Best Astrologer in Vancouver</a>
            <a href="/blog" className="rounded-full border border-[#D8A545]/20 bg-[#D8A545]/10 px-4 py-2 text-xs text-[#F2D07C] transition hover:bg-[#D8A545]/20">Astrology Blog</a>
            <a href="/blog/astrologer-canada-combined-approach" className="rounded-full border border-[#D8A545]/20 bg-[#D8A545]/10 px-4 py-2 text-xs text-[#F2D07C] transition hover:bg-[#D8A545]/20">Why Combined Astrology Works Better</a>
            <a href="/blog/life-path-number-calculator" className="rounded-full border border-[#D8A545]/20 bg-[#D8A545]/10 px-4 py-2 text-xs text-[#F2D07C] transition hover:bg-[#D8A545]/20">Life Path Number Calculator</a>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-center font-['Cinzel'] text-2xl text-white sm:text-3xl">Frequently Asked Questions About Ashima Gautam</h2>
          <div className="mt-8 space-y-4">
            {faqItems.map((item) => (
              <div key={item.q} className="rounded-2xl border border-[#D8A545]/15 bg-[#0D0D0D]/75 p-6 backdrop-blur-2xl">
                <h3 className="font-['Cinzel'] text-lg text-[#F2D07C]">{item.q}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#A0A0A0]">{item.a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-[#D8A545]/15 px-4 py-10 sm:px-5 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 text-sm text-[#A0A0A0] md:flex-row md:items-center">
          <p className="font-['Cinzel'] tracking-[0.24em] text-white">ASHIMA EMPOWERS</p>
          <div className="flex flex-wrap gap-4">
            <a href="/#offer" className="text-[#F2D07C] hover:text-white transition">Services</a>
            <a href="/about-ashima-gautam" className="text-[#F2D07C] hover:text-white transition">About</a>
            <a href="/reviews" className="text-[#F2D07C] hover:text-white transition">Reviews</a>
            <a href="/blog" className="text-[#F2D07C] hover:text-white transition">Blog</a>
          </div>
        </div>
      </footer>
    </div>
    </>
  )
}

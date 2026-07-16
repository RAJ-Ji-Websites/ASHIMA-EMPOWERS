import { motion } from 'framer-motion'
import { ArrowRight, Clock } from 'lucide-react'
import SEOHead from '../components/SEOHead'
import Breadcrumb from '../components/Breadcrumb'

const brandLogo = '/ashima-logo.webp'

const articles = [
  {
    slug: 'palm-reading-marriage-love',
    title: 'Palm Reading for Marriage & Love: What Your Heart Line Reveals About Relationships',
    excerpt: 'Learn what your heart line reveals about love, marriage, and relationship compatibility. Expert palmistry guide by Ashima Gautam, Vancouver palm reader.',
    keywords: 'palm reading marriage, heart line palmistry, palm reading love',
    readTime: '9 min',
    date: '2025-02-20',
  },
  {
    slug: 'life-path-number-calculator',
    title: 'Life Path Number Calculator: Find Your Numerology Life Path from Date of Birth',
    excerpt: 'Calculate your Life Path Number and learn what it reveals about your personality, career, and destiny. Free numerology guide by Ashima Gautam.',
    keywords: 'life path number calculator, numerology calculator, life path number meaning',
    readTime: '11 min',
    date: '2025-02-15',
  },
  {
    slug: 'free-kundli-analysis',
    title: 'Free Kundli Analysis: What Your Birth Chart Reveals About Your Future',
    excerpt: 'Learn what your Kundli (birth chart) reveals about career, relationships, health, and life timing. Free guide to Vedic Astrology birth charts.',
    keywords: 'free kundli analysis, birth chart reading, vedic astrology chart',
    readTime: '10 min',
    date: '2025-02-10',
  },
  {
    slug: 'astrologer-canada-combined-approach',
    title: 'Astrologer in Canada: Why Combined Astrology + Numerology + Palmistry Works Better',
    excerpt: 'Discover why the best astrologers in Canada combine Vedic Astrology, Numerology, and Palmistry for more accurate readings.',
    keywords: 'astrologer canada, vedic astrology canada, numerology canada',
    readTime: '8 min',
    date: '2025-02-05',
  },
  {
    slug: 'best-astrologer-vancouver',
    title: 'Best Astrologer in Vancouver: How to Choose the Right One (2025 Guide)',
    excerpt: 'Looking for the best astrologer in Vancouver? Learn how to choose a qualified astrologer who combines Vedic Astrology, Numerology & Palmistry.',
    keywords: 'best astrologer vancouver, top astrologer vancouver, astrologer vancouver bc',
    readTime: '9 min',
    date: '2025-02-01',
  },
  {
    slug: 'what-is-personalized-life-report',
    title: 'What Is a Personalized Life Report? How Astrology, Numerology & Palmistry Work Together',
    excerpt: 'Discover how combining Vedic Astrology, Numerology, and Palmistry creates a deeper, more precise life reading than any single discipline alone.',
    keywords: 'personalized life report, combined astrology numerology palmistry, kundli analysis',
    readTime: '8 min',
    date: '2025-01-15',
  },
  {
    slug: 'online-astrology-consultation-guide',
    title: 'How to Prepare for Your First Online Astrology Consultation',
    excerpt: 'Everything you need to know before booking an online astrology consultation — what details to prepare, what questions to ask, and what to expect.',
    keywords: 'online astrology consultation, book astrology reading, astrology consultation guide',
    readTime: '6 min',
    date: '2025-01-20',
  },
  {
    slug: 'palm-reading-for-career',
    title: 'Palm Reading for Career: What Your Palm Lines Reveal About Your Professional Path',
    excerpt: 'Learn how palmistry can reveal career strengths, timing, and professional direction through the analysis of your palm lines and mounts.',
    keywords: 'palm reading career, palmistry career line, online palmistry consultation',
    readTime: '7 min',
    date: '2025-01-25',
  },
]

const blogSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Astrology, Numerology & Palmistry Blog — Ashima Empowers',
  description: 'Expert articles on personalized astrology, numerology, palmistry, kundli analysis, and online consultations by Ashima Gautam.',
  url: 'https://ashimaempowers.com/blog',
  isPartOf: { '@type': 'WebSite', name: 'Ashima Empowers', url: 'https://ashimaempowers.com' },
  about: { '@type': 'Person', name: 'Ashima Gautam' },
}

export default function BlogHub() {
  return (
    <>
    <SEOHead
      title="Astrology, Numerology & Palmistry Blog — Ashima Empowers"
      description="Read insightful blog articles about personalized astrology, numerology, palmistry, kundli analysis, and online consultations by Ashima Gautam of Ashima Empowers."
      canonical="https://ashimaempowers.com/blog"
      ogTitle="Astrology, Numerology & Palmistry Blog — Ashima Empowers"
      ogDescription="Expert articles on personalized astrology readings, kundli analysis, palmistry, and numerology by Ashima Gautam. Learn how combined readings work."
      ogUrl="https://ashimaempowers.com/blog"
      jsonLd={blogSchema}
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
            <a href="/about-ashima-gautam" className="text-sm text-[#A0A0A0] transition hover:text-[#F2D07C]">About</a>
            <a href="/reviews" className="text-sm text-[#A0A0A0] transition hover:text-[#F2D07C]">Reviews</a>
            <a href="/#faq" className="text-sm text-[#A0A0A0] transition hover:text-[#F2D07C]">FAQ</a>
          </div>
          <a href="/#offer" className="rounded-full border border-[#F2D07C]/40 bg-[#D8A545] px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-black shadow-[0_0_35px_rgba(216,165,69,0.22)] transition hover:bg-[#F2D07C]">Book Now</a>
        </nav>
      </header>

      <main id="main-content" className="relative z-10 mx-auto max-w-4xl px-4 py-16 sm:px-5 sm:py-24 lg:px-8">
        <Breadcrumb items={[
          { label: 'Blog' },
        ]} />

        <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <p className="text-xs uppercase tracking-[0.32em] text-[#D8A545]">Blog</p>
          <h1 className="mt-4 font-['Cinzel'] text-4xl leading-tight text-white sm:text-5xl md:text-6xl">
            Astrology, Numerology &amp; Palmistry Insights
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[#A0A0A0]">
            Expert articles on personalized astrology readings, kundli analysis, palmistry, and numerology by Ashima Gautam.
          </p>
          <div className="mx-auto mt-7 h-px max-w-sm bg-gradient-to-r from-transparent via-[#F2D07C] to-transparent" />
        </motion.section>

        <section className="mt-12 space-y-6">
          {articles.map((article, index) => (
            <motion.a
              key={article.slug}
              href={`/blog/${article.slug}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group block rounded-[2rem] border border-[#D8A545]/15 bg-[#0D0D0D]/75 p-6 backdrop-blur-2xl transition hover:border-[#D8A545]/45 hover:shadow-[0_0_50px_rgba(216,165,69,0.08)] sm:p-8"
            >
              <div className="flex items-center gap-4 text-xs text-[#A0A0A0]">
                <span className="rounded-full border border-[#D8A545]/20 bg-[#D8A545]/10 px-3 py-1 text-[#F2D07C]">{article.keywords.split(',')[0]}</span>
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" aria-hidden="true" /> {article.readTime} read</span>
                <time dateTime={article.date}>{new Date(article.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</time>
              </div>
              <h2 className="mt-4 font-['Cinzel'] text-xl text-white transition group-hover:text-[#F2D07C] sm:text-2xl">{article.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-[#A0A0A0]">{article.excerpt}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#F2D07C]">Read Article <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
            </motion.a>
          ))}
        </section>

        <section className="mt-12 rounded-[2rem] border border-[#D8A545]/15 bg-[#0D0D0D]/60 p-6 backdrop-blur-2xl">
          <h2 className="font-['Cinzel'] text-xl text-white sm:text-2xl">Learn More About Ashima Gautam</h2>
          <p className="mt-3 text-sm text-[#A0A0A0]">Discover more about Ashima's expertise, client experiences, and personalized astrology services.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href="/about-ashima-gautam" className="rounded-full border border-[#D8A545]/20 bg-[#D8A545]/10 px-4 py-2 text-xs text-[#F2D07C] transition hover:bg-[#D8A545]/20">About Ashima Gautam</a>
            <a href="/reviews" className="rounded-full border border-[#D8A545]/20 bg-[#D8A545]/10 px-4 py-2 text-xs text-[#F2D07C] transition hover:bg-[#D8A545]/20">Client Reviews</a>
            <a href="/astrologer-vancouver" className="rounded-full border border-[#D8A545]/20 bg-[#D8A545]/10 px-4 py-2 text-xs text-[#F2D07C] transition hover:bg-[#D8A545]/20">Best Astrologer in Vancouver</a>
            <a href="/#offer" className="rounded-full border border-[#D8A545]/20 bg-[#D8A545]/10 px-4 py-2 text-xs text-[#F2D07C] transition hover:bg-[#D8A545]/20">Book a Consultation</a>
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

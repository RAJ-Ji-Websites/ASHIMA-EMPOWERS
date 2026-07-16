import { motion } from 'framer-motion'
import { ArrowRight, Star } from 'lucide-react'
import SEOHead from '../components/SEOHead'
import Breadcrumb from '../components/Breadcrumb'

const brandLogo = '/ashima-logo.webp'

const reviews = [
  { name: 'Rahul M.', location: 'Delhi, India', service: '5-Minute Video Report', serviceSlug: 'video-report', rating: 5, text: 'The 5-Minute Video Report was incredibly accurate. Ashima picked up on career timing that played out exactly as she predicted. I love that I can watch it whenever I need guidance.', date: '2025-01-10' },
  { name: 'Sneha R.', location: 'Mumbai, India', service: '60-Minute Complete Consultation', serviceSlug: 'consultation-60', rating: 5, text: 'My 60-Minute Complete Consultation with Ashima was life-changing. We did a deep dive into my Kundli, Palmistry, and Numerology. Being able to ask questions live gave me so much clarity.', date: '2025-01-12' },
  { name: 'Arjun K.', location: 'Bangalore, India', service: '25-Minute Private Consultation', serviceSlug: 'consultation-25', rating: 5, text: 'The 25-Minute Private Consultation was perfect. I had two very specific questions about my business transition, and Ashima gave me precise, actionable guidance without any fear tactics.', date: '2025-01-15' },
  { name: 'Priya S.', location: 'Toronto, Canada', service: 'Combined Numerology & Palmistry Reading', serviceSlug: 'video-report', rating: 5, text: 'I was skeptical about online palmistry, but Ashima\'s combined numerology and palm reading was incredibly accurate. She identified career patterns I\'d been struggling with and gave me a clear direction. No gemstone selling, no fear — just honest guidance.', date: '2025-01-18' },
  { name: 'Meera T.', location: 'London, UK', service: '5-Minute Video Report', serviceSlug: 'video-report', rating: 5, text: 'The kundli analysis was spot on. Ashima combined astrology and numerology in a way I\'d never seen before. The 5-minute video report felt deeply personal — like she truly understood my life path and relationship patterns.', date: '2025-01-20' },
  { name: 'Vikram N.', location: 'Pune, India', service: '60-Minute Complete Consultation', serviceSlug: 'consultation-60', rating: 5, text: 'Ashima\'s combined approach is genuinely different. She used my Kundli, numerology, and palm lines together to give me career guidance that actually made sense. No fear-mongering, no upselling — just real insight. Worth every rupee.', date: '2025-01-22' },
]

const reviewSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'Ashima Empowers',
      url: 'https://ashimaempowers.com',
      logo: 'https://ashimaempowers.com/ashima-logo.webp',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5.0',
        reviewCount: String(reviews.length),
        bestRating: '5',
        worstRating: '1',
      },
    },
    ...reviews.map((review) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: review.name },
      datePublished: review.date,
      reviewBody: review.text,
      reviewRating: { '@type': 'Rating', ratingValue: String(review.rating), bestRating: '5' },
      itemReviewed: { '@type': 'Service', name: review.service },
    })),
  ],
}

export default function ReviewsPage() {
  return (
    <>
    <SEOHead
      title="Ashima Empowers Reviews — Personalized Astrology Reading Testimonials"
      description="Read genuine client reviews and testimonials for Ashima Empowers. Clients share their experience with personalized astrology, numerology, and palmistry readings by Ashima Gautam."
      canonical="https://ashimaempowers.com/reviews"
      ogTitle="Ashima Empowers Reviews — 5-Star Personalized Astrology Testimonials"
      ogDescription="Genuine 5-star reviews from clients who received personalized astrology, numerology, and palmistry readings by Ashima Gautam. Video reports and 1-on-1 consultations."
      ogUrl="https://ashimaempowers.com/reviews"
      jsonLd={reviewSchema}
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
            <a href="/blog" className="text-sm text-[#A0A0A0] transition hover:text-[#F2D07C]">Blog</a>
            <a href="/#faq" className="text-sm text-[#A0A0A0] transition hover:text-[#F2D07C]">FAQ</a>
          </div>
          <a href="/#offer" className="rounded-full border border-[#F2D07C]/40 bg-[#D8A545] px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-black shadow-[0_0_35px_rgba(216,165,69,0.22)] transition hover:bg-[#F2D07C]">Book Now</a>
        </nav>
      </header>

      <main id="main-content" className="relative z-10 mx-auto max-w-5xl px-4 py-16 sm:px-5 sm:py-24 lg:px-8">
        <Breadcrumb items={[
          { label: 'Client Reviews' },
        ]} />

        <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <p className="text-xs uppercase tracking-[0.32em] text-[#D8A545]">Client Reviews</p>
          <h1 className="mt-4 font-['Cinzel'] text-4xl leading-tight text-white sm:text-5xl md:text-6xl">
            Ashima Empowers Reviews
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[#A0A0A0]">
            Genuine testimonials from clients who received personalized astrology, numerology, and palmistry readings by Ashima Gautam.
          </p>
          <div className="mt-6 flex items-center justify-center gap-2">
            {[...Array(5)].map((_, i) => <Star key={i} className="h-6 w-6 fill-[#D8A545] text-[#D8A545]" />)}
            <span className="ml-2 font-['Cinzel'] text-2xl text-[#F2D07C]">5.0</span>
            <span className="text-sm text-[#A0A0A0]">· {reviews.length}+ reviews</span>
          </div>
          <div className="mx-auto mt-7 h-px max-w-sm bg-gradient-to-r from-transparent via-[#F2D07C] to-transparent" />
        </motion.section>

        <section className="mt-12">
          <div className="mx-4 max-w-6xl rounded-[2rem] border border-[#D8A545]/20 bg-[#0D0D0D]/75 p-3 shadow-[0_0_80px_rgba(216,165,69,0.1)] backdrop-blur-2xl sm:mx-auto sm:rounded-[2.5rem] sm:p-4 md:p-8">
            <div className="elfsight-app-5a7a8e6f-1515-45fa-8f33-81aa6506c964" data-elfsight-app-lazy />
          </div>
        </section>

        <section className="mt-12">
          <div className="mx-auto max-w-3xl rounded-[2rem] border border-[#D8A545]/30 bg-gradient-to-br from-[#D8A545]/10 to-[#F2D07C]/5 p-8 text-center backdrop-blur-2xl">
            <div className="mb-4 flex justify-center gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-8 w-8 fill-[#D8A545] text-[#D8A545]" />)}
            </div>
            <h2 className="font-['Cinzel'] text-2xl text-white sm:text-3xl">See Our Google Reviews</h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#A0A0A0]">
              Read verified 5-star reviews from our clients on Google. See why Ashima Gautam is trusted by clients across Canada and worldwide for personalized astrology, numerology, and palmistry readings.
            </p>
            <a
              href="https://share.google/JhDj0VmTtsSK0NYfG"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#D8A545] px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-black shadow-[0_0_40px_rgba(216,165,69,0.3)] transition hover:bg-[#F2D07C] hover:shadow-[0_0_50px_rgba(216,165,69,0.4)]"
            >
              View All Google Reviews
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>

        <section className="mt-12 grid gap-6 sm:grid-cols-2">
          {reviews.map((review, index) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className={`rounded-3xl border p-6 backdrop-blur-xl ${index % 3 === 1 ? 'border-[#D8A545]/25 bg-[#D8A545]/5 shadow-[0_0_40px_rgba(216,165,69,0.05)]' : 'border-[#D8A545]/15 bg-[#0D0D0D]/60'}`}
            >
              <div className="flex items-center gap-1 text-[#F2D07C] mb-4">
                {[...Array(review.rating)].map((_, i) => <Star key={i} className="h-4 w-4 fill-[#D8A545] text-[#D8A545]" />)}
              </div>
              <p className="font-['Cormorant_Garamond'] text-xl italic leading-relaxed text-white">"{review.text}"</p>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-[#F2D07C]">— {review.name}</p>
                  <p className="text-xs text-[#A0A0A0]">{review.location}</p>
                  <time dateTime={review.date} className="text-xs text-[#A0A0A0]/60">{new Date(review.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</time>
                </div>
                <a href={`/#offer`} className="rounded-full border border-[#D8A545]/20 bg-[#D8A545]/10 px-3 py-1 text-xs text-[#F2D07C] transition hover:bg-[#D8A545]/20" aria-label={`Book ${review.service}`}>{review.service}</a>
              </div>
            </motion.div>
          ))}
        </section>

        <section className="mt-16 text-center">
          <p className="mb-4 text-sm text-[#A0A0A0]">Ready to experience a personalized astrology reading?</p>
          <a href="/#offer" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D8A545] px-8 py-5 text-xs font-black uppercase tracking-[0.16em] text-black transition hover:bg-[#F2D07C]" aria-label="Book your personalized astrology reading">
            Book Your Personalized Reading <ArrowRight className="h-4 w-4" />
          </a>
          <p className="mt-6 text-xs text-[#A0A0A0]">
            Choose from a <a href="/#offer" className="text-[#F2D07C] underline underline-offset-4">5-minute video report (₹499)</a>, <a href="/#offer" className="text-[#F2D07C] underline underline-offset-4">25-minute private consultation</a>, or <a href="/#offer" className="text-[#F2D07C] underline underline-offset-4">60-minute complete consultation</a>.
          </p>
        </section>

        <section className="mt-12 rounded-[2rem] border border-[#D8A545]/15 bg-[#0D0D0D]/60 p-6 backdrop-blur-2xl">
          <h2 className="font-['Cinzel'] text-xl text-white sm:text-2xl">Learn More About Ashima Gautam</h2>
          <p className="mt-3 text-sm text-[#A0A0A0]">Discover more about Ashima's expertise, approach, and astrology insights.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href="/about-ashima-gautam" className="rounded-full border border-[#D8A545]/20 bg-[#D8A545]/10 px-4 py-2 text-xs text-[#F2D07C] transition hover:bg-[#D8A545]/20">About Ashima Gautam</a>
            <a href="/astrologer-vancouver" className="rounded-full border border-[#D8A545]/20 bg-[#D8A545]/10 px-4 py-2 text-xs text-[#F2D07C] transition hover:bg-[#D8A545]/20">Best Astrologer in Vancouver</a>
            <a href="/blog" className="rounded-full border border-[#D8A545]/20 bg-[#D8A545]/10 px-4 py-2 text-xs text-[#F2D07C] transition hover:bg-[#D8A545]/20">Astrology Blog</a>
            <a href="/blog/what-is-personalized-life-report" className="rounded-full border border-[#D8A545]/20 bg-[#D8A545]/10 px-4 py-2 text-xs text-[#F2D07C] transition hover:bg-[#D8A545]/20">What Is a Personalized Life Report?</a>
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

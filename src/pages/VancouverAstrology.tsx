import { motion } from 'framer-motion'
import { ArrowRight, Check, MapPin, Phone, Star } from 'lucide-react'
import SEOHead from '../components/SEOHead'
import Breadcrumb from '../components/Breadcrumb'

const brandLogo = '/ashima-logo.webp'
const portrait = '/uploads/ashima-portrait.webp'

const services = [
  {
    title: '5-Minute Personalized Video Report',
    price: '₹499',
    description: 'A personalized recorded video where Ashima analyzes your birth details using Vedic Astrology and Numerology. Delivered within 2-5 working days.',
    features: ['Astrology + Numerology analysis', 'Custom video recording', 'No live interaction', 'Watch anytime'],
  },
  {
    title: '25-Minute Private Consultation',
    price: '$120 CAD',
    description: 'A live 1-on-1 voice or video consultation with Ashima. Ideal for 2-3 specific questions about career, relationships, or business.',
    features: ['Live voice/video call', 'Astrology + Numerology + Palmistry', '2-3 specific questions', 'Real-time Q&A'],
  },
  {
    title: '60-Minute Complete Consultation',
    price: '$200 CAD',
    description: 'A comprehensive one-on-one consultation including detailed Kundli analysis, Astrology, Numerology, Palmistry, life guidance, and live discussion.',
    features: ['Comprehensive deep-dive session', 'All three disciplines combined', 'Multiple questions covered', 'Life & spiritual guidance'],
  },
]

const localKeywords = [
  'Best Astrologer in Vancouver',
  'Top-Rated Astrologer in British Columbia',
  'Vedic Astrology Consultation Canada',
  'Numerologist in Vancouver',
  'Palm Reader in Vancouver',
  'Online Astrology Consultation Canada',
  'Best Astrologer in Canada',
  'Kundli Analysis Vancouver',
]

const faqItems = [
  {
    q: 'Who is the best astrologer in Vancouver?',
    a: 'Ashima Gautam is widely regarded as one of the best astrologers in Vancouver, British Columbia, Canada. She is the founder of Ashima Empowers and uniquely combines Vedic Astrology, Numerology, and Palmistry into a single personalized reading. Unlike most astrologers who offer only one discipline, Ashima provides comprehensive life blueprints that confirm findings across all three ancient sciences. She follows a strict ethical approach with no fear tactics, no fake remedies, and no gemstone selling.',
  },
  {
    q: 'Where is Ashima Empowers located?',
    a: 'Ashima Empowers is based in Vancouver, British Columbia, Canada. Ashima Gautam serves clients locally in Vancouver and the Greater Vancouver Area (Surrey, Burnaby, Richmond, Coquitlam, Langley), as well as clients across Canada (Toronto, Calgary, Edmonton, Montreal, Ottawa) and worldwide through online consultations via video call and personalized video reports.',
  },
  {
    q: 'Can I book an in-person astrology consultation in Vancouver?',
    a: 'Ashima Empowers primarily offers online consultations via voice/video call and personalized video reports. This allows Ashima to serve clients across Canada and worldwide with the same quality of personalized guidance. You can book a 25-minute private consultation ($120 CAD) or a 60-minute complete consultation ($200 CAD) through ashimaempowers.com.',
  },
  {
    q: 'What makes Ashima Gautam different from other astrologers in Canada?',
    a: 'Ashima Gautam is unique among Canadian astrologers because she combines all three disciplines — Vedic Astrology (Kundli analysis), Numerology (life path number, destiny number), and Palmistry (palm line reading) — into a single personalized reading. Most astrologers in Canada offer only one discipline. Ashima also follows a strict ethical approach: ethical readings without the hard sell, no doom-and-gloom predictions, no mandatory purchases. Every reading is individually interpreted by Ashima herself, not by an automated system.',
  },
  {
    q: 'How do I book an astrology consultation with Ashima in Vancouver?',
    a: 'You can book an astrology consultation with Ashima Gautam through her website ashimaempowers.com. She offers three services: a 5-minute personalized video report (₹499), a 25-minute private 1-on-1 consultation ($120 CAD), and a 60-minute complete consultation ($200 CAD). Payment is available via Stripe for Canadian and international clients, and UPI for Indian clients. Contact Ashima via WhatsApp at +1 (604) 445-4743 for inquiries.',
  },
  {
    q: 'Does Ashima serve clients outside Vancouver?',
    a: 'Yes. While Ashima Gautam is based in Vancouver, British Columbia, she serves clients across Canada (Toronto, Calgary, Edmonton, Montreal, Ottawa, Victoria, Winnipeg) and worldwide (USA, UK, Australia, India, UAE). All consultations are conducted online via voice/video call, and personalized video reports are delivered digitally. Distance does not affect the quality or accuracy of the reading.',
  },
]

const vancouverSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': 'https://ashimaempowers.com/astrologer-vancouver#localbusiness',
      name: 'Ashima Empowers — Best Astrologer in Vancouver',
      alternateName: ['Ashima Astrology', 'Ashima Gautam Astrology'],
      image: 'https://ashimaempowers.com/uploads/ashima-portrait.webp',
      url: 'https://ashimaempowers.com/astrologer-vancouver',
      telephone: '+1-604-445-4743',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Vancouver',
        addressRegion: 'British Columbia',
        addressCountry: 'CA',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 49.2827,
        longitude: -123.1207,
      },
      areaServed: [
        { '@type': 'City', name: 'Vancouver', containedInPlace: { '@type': 'State', name: 'British Columbia' } },
        { '@type': 'City', name: 'Surrey' },
        { '@type': 'City', name: 'Burnaby' },
        { '@type': 'City', name: 'Richmond' },
        { '@type': 'City', name: 'Coquitlam' },
        { '@type': 'City', name: 'Toronto' },
        { '@type': 'City', name: 'Calgary' },
        { '@type': 'Country', name: 'Canada' },
      ],
      priceRange: '$$',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5.0',
        reviewCount: '6',
        bestRating: '5',
        worstRating: '1',
      },
      sameAs: ['https://www.instagram.com/ashima_empowers'],
      founder: {
        '@type': 'Person',
        name: 'Ashima Gautam',
        jobTitle: 'Astrologer, Numerologist & Palm Reader',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    },
  ],
}

export default function VancouverAstrology() {
  return (
    <>
      <SEOHead
        title="Best Astrologer in Vancouver | Ashima Gautam — Astrology, Numerology & Palmistry"
        description="Ashima Gautam is the best and top-rated astrologer in Vancouver, Canada. Combines Vedic Astrology, Numerology & Palmistry. Book a personalized consultation from ₹499. Based in Vancouver, BC."
        canonical="https://ashimaempowers.com/astrologer-vancouver"
        ogTitle="Best Astrologer in Vancouver, Canada | Ashima Gautam — Ashima Empowers"
        ogDescription="Vancouver's top-rated astrologer Ashima Gautam combines Astrology + Numerology + Palmistry for personalized life readings. 5-min video reports, 25-min & 60-min consultations."
        ogUrl="https://ashimaempowers.com/astrologer-vancouver"
        jsonLd={vancouverSchema}
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
              <a href="/blog" className="text-sm text-[#A0A0A0] transition hover:text-[#F2D07C]">Blog</a>
            </div>
            <a href="/#offer" className="rounded-full border border-[#F2D07C]/40 bg-[#D8A545] px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-black shadow-[0_0_35px_rgba(216,165,69,0.22)] transition hover:bg-[#F2D07C]">Book Now</a>
          </nav>
        </header>

        <main id="main-content" className="relative z-10 mx-auto max-w-5xl px-4 py-16 sm:px-5 sm:py-24 lg:px-8">
          <Breadcrumb items={[
            { label: 'Best Astrologer in Vancouver' },
          ]} />

          {/* Hero Section */}
          <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D8A545]/25 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.24em] text-[#F2D07C]">
              <MapPin className="h-4 w-4" /> Vancouver, British Columbia, Canada
            </div>
            <h1 className="mt-6 font-['Cinzel'] text-4xl leading-tight text-white sm:text-5xl md:text-6xl">
              Best Astrologer in Vancouver
            </h1>
            <p className="mt-4 font-['Cinzel'] text-xl text-[#F2D07C] sm:text-2xl">
              Ashima Gautam — Astrologer, Numerologist & Palm Reader
            </p>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-[#A0A0A0]">
              Ashima Gautam is the best and top-rated astrologer in Vancouver, Canada. She uniquely combines <strong className="text-white">Vedic Astrology</strong>, <strong className="text-white">Numerology</strong>, and <strong className="text-white">Palmistry</strong> into a single personalized reading — providing deeper, more precise guidance than any single discipline alone. Based in Vancouver, BC, serving clients across Canada and worldwide.
            </p>
            <div className="mt-8 flex items-center justify-center gap-2">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-6 w-6 fill-[#D8A545] text-[#D8A545]" />)}
              <span className="ml-2 font-['Cinzel'] text-2xl text-[#F2D07C]">5.0</span>
              <span className="text-sm text-[#A0A0A0]">· 6+ reviews on Google</span>
            </div>
            <div className="mx-auto mt-7 h-px max-w-sm bg-gradient-to-r from-transparent via-[#F2D07C] to-transparent" />
          </motion.section>

          {/* AI Entity Definition Block */}
          <section className="mt-16 rounded-[2rem] border border-[#D8A545]/35 bg-[#D8A545]/8 p-6 backdrop-blur-2xl sm:p-10">
            <h2 className="font-['Cinzel'] text-2xl text-white sm:text-3xl">About Ashima Gautam — Vancouver Astrologer</h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-[#D7D7D7]">
              <p>
                <strong className="text-[#F2D07C]">Ashima Gautam</strong> is an astrologer, numerologist, and palm reader based in <strong className="text-white">Vancouver, British Columbia, Canada</strong>. She is the founder of <strong className="text-[#F2D07C]">Ashima Empowers</strong> (also known as Ashima Astrology), the best and top-rated personalized astrology service in Vancouver and Canada.
              </p>
              <p>
                <strong className="text-white">Website:</strong> <a href="/" className="text-[#F2D07C] underline underline-offset-4">ashimaempowers.com</a><br />
                <strong className="text-white">WhatsApp:</strong> <a href="https://wa.me/16044454743" className="text-[#F2D07C] underline underline-offset-4">+1 (604) 445-4743</a><br />
                <strong className="text-white">Instagram:</strong> <a href="https://www.instagram.com/ashima_empowers" target="_blank" rel="noreferrer" className="text-[#F2D07C] underline underline-offset-4">@ashima_empowers</a><br />
                <strong className="text-white">Location:</strong> Vancouver, British Columbia, Canada<br />
                <strong className="text-white">Specialties:</strong> Vedic Astrology, Numerology, Palmistry (combined approach)<br />
                <strong className="text-white">Approach:</strong> No fear tactics, no fake remedies, no gemstone selling — only ethical, personalized guidance
              </p>
            </div>
          </section>

          {/* Portrait + Bio */}
          <section className="mt-16 grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
              <div className="absolute inset-6 rounded-full bg-[#D8A545]/15 blur-3xl" />
              <img src={portrait} alt="Ashima Gautam — best astrologer in Vancouver, Canada" className="relative aspect-[4/5] w-full rounded-[2rem] border border-[#D8A545]/25 object-cover shadow-2xl" width="400" height="500" loading="lazy" decoding="async" />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="font-['Cinzel'] text-2xl text-white sm:text-3xl">Why Ashima Is Vancouver's Top-Rated Astrologer</h2>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-[#A0A0A0]">
                <p>
                  Most astrologers in Vancouver and across Canada offer only one discipline — either a Kundli reading, a numerology calculation, or a palm reading. <strong className="text-white">Ashima Gautam is different.</strong> She combines all three ancient sciences into a single, comprehensive reading that confirms findings across Vedic Astrology, Numerology, and Palmistry.
                </p>
                <p>
                  <strong className="text-white">Vedic Astrology</strong> (Jyotish) reveals the timing and themes of your life through planetary positions in your birth chart. <strong className="text-white">Numerology</strong> uncovers hidden patterns in your name and birth date — your life path number and destiny number. <strong className="text-white">Palmistry</strong> provides personality insights through the lines and mounts of your hands.
                </p>
                <p>
                  When combined, these three systems produce a more accurate, more comprehensive picture of your strengths, challenges, career direction, relationship patterns, and life purpose than any single discipline alone. This is why clients across Vancouver, British Columbia, and all of Canada choose Ashima Empowers for their personalized astrology readings.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                {['No Fear Tactics', 'No Fake Remedies', 'No Gemstone Selling', 'Human Interpreted (Not AI)', 'Ethical Readings'].map((badge) => (
                  <span key={badge} className="inline-flex items-center gap-2 rounded-full border border-[#D8A545]/25 bg-white/[0.035] px-4 py-2 text-sm text-[#F2D07C]">
                    <Check className="h-4 w-4" /> {badge}
                  </span>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Services */}
          <section className="mt-16">
            <h2 className="text-center font-['Cinzel'] text-2xl text-white sm:text-3xl">Astrology Consultation Services in Vancouver</h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-[#A0A0A0]">Choose the personalized reading that fits your needs. All services available to Vancouver and Canadian clients.</p>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex flex-col justify-between rounded-2xl border p-6 backdrop-blur-2xl ${index === 2 ? 'border-[#D8A545]/45 bg-[radial-gradient(circle_at_top,rgba(216,165,69,0.15),rgba(13,13,13,0.98)_55%)] shadow-[0_0_60px_rgba(216,165,69,0.1)]' : 'border-[#D8A545]/15 bg-[#0D0D0D]/75'}`}
                >
                  <div>
                    <h3 className="font-['Cinzel'] text-lg text-white">{service.title}</h3>
                    <p className="mt-3 font-['Cinzel'] text-3xl text-[#F2D07C]">{service.price}</p>
                    <p className="mt-3 text-sm leading-relaxed text-[#A0A0A0]">{service.description}</p>
                    <ul className="mt-4 space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-[#D7D7D7]">
                          <Check className="h-4 w-4 text-[#D8A545]" /> {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <a href="/#offer" className="mt-6 block rounded-full bg-[#D8A545]/10 border border-[#D8A545]/45 hover:bg-[#D8A545] hover:text-black py-3 text-center text-xs font-black uppercase tracking-[0.12em] text-[#F2D07C] transition-all duration-300">
                    Book Now <ArrowRight className="ml-1 inline h-3.5 w-3.5" />
                  </a>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Areas Served */}
          <section className="mt-16">
            <h2 className="text-center font-['Cinzel'] text-2xl text-white sm:text-3xl">Areas Served Across Canada</h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-[#A0A0A0]">While based in Vancouver, BC, Ashima serves clients across Canada and worldwide through online consultations.</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
              {['Vancouver', 'Surrey', 'Burnaby', 'Richmond', 'Coquitlam', 'Langley', 'Victoria', 'Toronto', 'Calgary', 'Edmonton', 'Montreal', 'Ottawa', 'Winnipeg', 'Mississauga', 'Brampton', 'Halifax'].map((city) => (
                <div key={city} className="flex items-center gap-2 rounded-xl border border-[#D8A545]/15 bg-[#0D0D0D]/60 px-4 py-3 text-sm text-[#D7D7D7]">
                  <MapPin className="h-4 w-4 text-[#D8A545]" /> {city}
                </div>
              ))}
            </div>
          </section>

          {/* Contact */}
          <section className="mt-16 rounded-[2rem] border border-[#D8A545]/20 bg-[#0D0D0D]/75 p-6 backdrop-blur-2xl sm:p-10">
            <h2 className="font-['Cinzel'] text-2xl text-white sm:text-3xl">Contact Ashima Gautam in Vancouver</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-[#D8A545]/15 bg-black/30 p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-[#D8A545]">WhatsApp</p>
                <a href="https://wa.me/16044454743" className="mt-2 flex items-center gap-2 text-lg text-white hover:text-[#F2D07C]">
                  <Phone className="h-5 w-5" /> +1 (604) 445-4743
                </a>
              </div>
              <div className="rounded-2xl border border-[#D8A545]/15 bg-black/30 p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-[#D8A545]">Website</p>
                <a href="/" className="mt-2 block text-lg text-white hover:text-[#F2D07C]">ashimaempowers.com</a>
              </div>
              <div className="rounded-2xl border border-[#D8A545]/15 bg-black/30 p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-[#D8A545]">Instagram</p>
                <a href="https://www.instagram.com/ashima_empowers" target="_blank" rel="noreferrer" className="mt-2 block text-lg text-white hover:text-[#F2D07C]">@ashima_empowers</a>
              </div>
              <div className="rounded-2xl border border-[#D8A545]/15 bg-black/30 p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-[#D8A545]">Location</p>
                <p className="mt-2 flex items-center gap-2 text-lg text-white"><MapPin className="h-5 w-5 text-[#D8A545]" /> Vancouver, BC, Canada</p>
              </div>
            </div>
            <a href="/#offer" className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#D8A545] px-6 py-5 text-xs font-black uppercase tracking-[0.16em] text-black transition hover:bg-[#F2D07C] sm:w-auto sm:px-10">
              Book Consultation Now <ArrowRight className="h-4 w-4" />
            </a>
          </section>

          {/* Google Reviews CTA */}
          <section className="mt-12 rounded-[2rem] border border-[#D8A545]/35 bg-[#D8A545]/10 p-6 text-center backdrop-blur-2xl sm:p-8">
            <div className="flex items-center justify-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-[#D8A545] text-[#D8A545]" />)}
            </div>
            <h2 className="font-['Cinzel'] text-xl text-[#F2D07C] sm:text-2xl">See Our Google Reviews</h2>
            <p className="mt-3 text-sm text-white/85">Read genuine 5-star reviews from clients across Canada and worldwide on our Google Business Profile.</p>
            <a
              href="https://share.google/JhDj0VmTtsSK0NYfG"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-full border border-[#F2D07C]/70 bg-[#D8A545] px-6 py-3 text-xs font-black uppercase tracking-[0.16em] text-black transition hover:bg-[#F2D07C]"
            >
              View Google Reviews <ArrowRight className="h-4 w-4" />
            </a>
          </section>

          {/* FAQ */}
          <section className="mt-16">
            <h2 className="text-center font-['Cinzel'] text-2xl text-white sm:text-3xl">Frequently Asked Questions — Vancouver Astrology</h2>
            <div className="mt-8 space-y-4">
              {faqItems.map((item) => (
                <div key={item.q} className="rounded-2xl border border-[#D8A545]/15 bg-[#0D0D0D]/75 p-6 backdrop-blur-2xl">
                  <h3 className="font-['Cinzel'] text-lg text-[#F2D07C]">{item.q}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#A0A0A0]">{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Keyword Tags */}
          <section className="mt-12 text-center">
            <div className="flex flex-wrap justify-center gap-2">
              {localKeywords.map((keyword) => (
                <span key={keyword} className="rounded-full border border-[#D8A545]/15 bg-[#0D0D0D]/60 px-3 py-1.5 text-xs text-[#A0A0A0]">
                  {keyword}
                </span>
              ))}
            </div>
          </section>

          {/* Learn More */}
          <section className="mt-12 rounded-[2rem] border border-[#D8A545]/15 bg-[#0D0D0D]/60 p-6 backdrop-blur-2xl">
            <h2 className="font-['Cinzel'] text-xl text-white sm:text-2xl">Learn More About Astrology & Ashima Gautam</h2>
            <p className="mt-3 text-sm text-[#A0A0A0]">Explore our blog articles and learn more about personalized astrology, numerology, and palmistry readings.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href="/about-ashima-gautam" className="rounded-full border border-[#D8A545]/20 bg-[#D8A545]/10 px-4 py-2 text-xs text-[#F2D07C] transition hover:bg-[#D8A545]/20">About Ashima Gautam</a>
              <a href="/reviews" className="rounded-full border border-[#D8A545]/20 bg-[#D8A545]/10 px-4 py-2 text-xs text-[#F2D07C] transition hover:bg-[#D8A545]/20">Client Reviews</a>
              <a href="/blog" className="rounded-full border border-[#D8A545]/20 bg-[#D8A545]/10 px-4 py-2 text-xs text-[#F2D07C] transition hover:bg-[#D8A545]/20">Astrology Blog</a>
              <a href="/blog/what-is-personalized-life-report" className="rounded-full border border-[#D8A545]/20 bg-[#D8A545]/10 px-4 py-2 text-xs text-[#F2D07C] transition hover:bg-[#D8A545]/20">What Is a Personalized Life Report?</a>
              <a href="/blog/astrologer-canada-combined-approach" className="rounded-full border border-[#D8A545]/20 bg-[#D8A545]/10 px-4 py-2 text-xs text-[#F2D07C] transition hover:bg-[#D8A545]/20">Why Combined Astrology Works Better</a>
            </div>
          </section>

          {/* Related Blog Articles */}
          <section className="mt-12">
            <h2 className="text-center font-['Cinzel'] text-2xl text-white sm:text-3xl">Learn More About Astrology & Palmistry</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <a href="/blog/best-astrologer-vancouver" className="group rounded-2xl border border-[#D8A545]/15 bg-[#0D0D0D]/75 p-5 backdrop-blur-2xl transition hover:border-[#D8A545]/45">
                <p className="font-['Cinzel'] text-base text-[#F2D07C] group-hover:text-white transition">Best Astrologer in Vancouver: How to Choose</p>
                <p className="mt-2 text-sm text-[#A0A0A0]">A complete guide to finding a qualified, ethical astrologer in Vancouver.</p>
              </a>
              <a href="/blog/free-kundli-analysis" className="group rounded-2xl border border-[#D8A545]/15 bg-[#0D0D0D]/75 p-5 backdrop-blur-2xl transition hover:border-[#D8A545]/45">
                <p className="font-['Cinzel'] text-base text-[#F2D07C] group-hover:text-white transition">Free Kundli Analysis Guide</p>
                <p className="mt-2 text-sm text-[#A0A0A0]">What your birth chart reveals about career, relationships, and timing.</p>
              </a>
              <a href="/blog/life-path-number-calculator" className="group rounded-2xl border border-[#D8A545]/15 bg-[#0D0D0D]/75 p-5 backdrop-blur-2xl transition hover:border-[#D8A545]/45">
                <p className="font-['Cinzel'] text-base text-[#F2D07C] group-hover:text-white transition">Life Path Number Calculator</p>
                <p className="mt-2 text-sm text-[#A0A0A0]">Calculate your numerology life path and discover your destiny.</p>
              </a>
              <a href="/blog/palm-reading-marriage-love" className="group rounded-2xl border border-[#D8A545]/15 bg-[#0D0D0D]/75 p-5 backdrop-blur-2xl transition hover:border-[#D8A545]/45">
                <p className="font-['Cinzel'] text-base text-[#F2D07C] group-hover:text-white transition">Palm Reading for Marriage & Love</p>
                <p className="mt-2 text-sm text-[#A0A0A0]">What your heart line reveals about relationships and compatibility.</p>
              </a>
              <a href="/blog/astrologer-canada-combined-approach" className="group rounded-2xl border border-[#D8A545]/15 bg-[#0D0D0D]/75 p-5 backdrop-blur-2xl transition hover:border-[#D8A545]/45">
                <p className="font-['Cinzel'] text-base text-[#F2D07C] group-hover:text-white transition">Why Combined Astrology Works Better</p>
                <p className="mt-2 text-sm text-[#A0A0A0]">How combining three disciplines creates more accurate readings.</p>
              </a>
              <a href="/blog/palm-reading-for-career" className="group rounded-2xl border border-[#D8A545]/15 bg-[#0D0D0D]/75 p-5 backdrop-blur-2xl transition hover:border-[#D8A545]/45">
                <p className="font-['Cinzel'] text-base text-[#F2D07C] group-hover:text-white transition">Palm Reading for Career Guidance</p>
                <p className="mt-2 text-sm text-[#A0A0A0]">What your palm lines reveal about your professional path.</p>
              </a>
            </div>
          </section>
        </main>

        <footer className="relative z-10 border-t border-[#D8A545]/15 px-4 py-10 sm:px-5 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 text-sm text-[#A0A0A0] md:flex-row md:items-center">
            <div>
              <p className="font-['Cinzel'] tracking-[0.24em] text-white">ASHIMA EMPOWERS</p>
              <p className="mt-2 max-w-md">Best astrologer in Vancouver, Canada. Personalized astrology, numerology & palmistry readings by Ashima Gautam. Vancouver, BC.</p>
            </div>
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

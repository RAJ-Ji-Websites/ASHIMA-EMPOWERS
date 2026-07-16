import { ArrowRight, Home } from 'lucide-react'
import SEOHead from '../components/SEOHead'

const brandLogo = '/ashima-logo.webp'

export default function NotFoundPage() {
  return (
    <>
      <SEOHead
        title="Page Not Found | Ashima Empowers"
        description="The page you're looking for doesn't exist. Return to Ashima Empowers homepage for personalized astrology, numerology, and palmistry readings by Ashima Gautam."
        canonical="https://ashimaempowers.com/404"
        ogTitle="Page Not Found | Ashima Empowers"
        ogDescription="Return to Ashima Empowers homepage for personalized astrology readings."
        ogUrl="https://ashimaempowers.com/404"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Page Not Found',
          description: 'The requested page could not be found.',
        }}
      />
      <div className="flex min-h-screen items-center justify-center overflow-x-hidden bg-[#050505] px-4 text-[#FAFAFA] selection:bg-[#D8A545] selection:text-black">
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute left-1/2 top-[-15%] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#D8A545]/10 blur-[130px]" />
          <div className="absolute bottom-[12%] right-[-10%] h-[420px] w-[420px] rounded-full bg-[#F2D07C]/8 blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <a href="/" className="mx-auto mb-8 grid h-20 w-20 place-items-center rounded-full border border-[#F2D07C]/55 bg-[#050505] p-1.5 shadow-[0_0_40px_rgba(216,165,69,0.32)]">
            <img src={brandLogo} alt="Ashima Empowers logo" className="h-full w-full rounded-full object-cover" width="80" height="80" loading="lazy" />
          </a>

          <p className="text-xs uppercase tracking-[0.32em] text-[#D8A545]">Error 404</p>
          <h1 className="mt-4 font-['Cinzel'] text-5xl leading-tight text-white sm:text-6xl md:text-7xl">
            Page Not Found
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[#A0A0A0]">
            The page you're looking for doesn't exist or has been moved. Let us guide you back to personalized astrology, numerology, and palmistry readings by Ashima Gautam.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D8A545] px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-black shadow-[0_0_40px_rgba(216,165,69,0.3)] transition hover:bg-[#F2D07C] hover:shadow-[0_0_50px_rgba(216,165,69,0.4)]"
            >
              <Home className="h-4 w-4" />
              Return Home
            </a>
            <a
              href="/#offer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#D8A545]/30 bg-[#0D0D0D]/80 px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-[#F2D07C] backdrop-blur-2xl transition hover:border-[#D8A545]/60 hover:bg-[#D8A545]/10"
            >
              Explore Services
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-12 rounded-[2rem] border border-[#D8A545]/20 bg-[#0D0D0D]/75 p-6 backdrop-blur-2xl">
            <h2 className="font-['Cinzel'] text-xl text-white">Popular Pages</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <a href="/about-ashima-gautam" className="rounded-xl border border-[#D8A545]/15 bg-black/30 p-4 text-left transition hover:border-[#D8A545]/40">
                <p className="text-sm font-semibold text-[#F2D07C]">About Ashima Gautam</p>
                <p className="mt-1 text-xs text-[#A0A0A0]">Vancouver-based astrologer, numerologist & palm reader</p>
              </a>
              <a href="/reviews" className="rounded-xl border border-[#D8A545]/15 bg-black/30 p-4 text-left transition hover:border-[#D8A545]/40">
                <p className="text-sm font-semibold text-[#F2D07C]">Client Reviews</p>
                <p className="mt-1 text-xs text-[#A0A0A0]">5-star testimonials from satisfied clients</p>
              </a>
              <a href="/blog" className="rounded-xl border border-[#D8A545]/15 bg-black/30 p-4 text-left transition hover:border-[#D8A545]/40">
                <p className="text-sm font-semibold text-[#F2D07C]">Astrology Blog</p>
                <p className="mt-1 text-xs text-[#A0A0A0]">Insights on astrology, numerology & palmistry</p>
              </a>
              <a href="/astrologer-vancouver" className="rounded-xl border border-[#D8A545]/15 bg-black/30 p-4 text-left transition hover:border-[#D8A545]/40">
                <p className="text-sm font-semibold text-[#F2D07C]">Vancouver Astrology</p>
                <p className="mt-1 text-xs text-[#A0A0A0]">Best astrologer in Vancouver, BC</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

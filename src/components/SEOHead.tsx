import { useEffect } from 'react'

type SEOProps = {
  title: string
  description: string
  canonical: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogType?: string
  ogUrl?: string
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: string
  jsonLd?: Record<string, unknown>[] | Record<string, unknown>
}

export default function SEOHead({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogImage = 'https://ashimaempowers.com/uploads/ashima-portrait.webp',
  ogType = 'website',
  ogUrl,
  twitterTitle,
  twitterDescription,
  twitterImage,
  jsonLd,
}: SEOProps) {
  useEffect(() => {
    document.title = title

    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null
      if (!el) {
        el = document.createElement('meta')
        const match = selector.match(/name="([^"]+)"/) || selector.match(/property="([^"]+)"/)
        if (match) {
          const isProperty = match[1].includes('og:') || match[1].includes('article:')
          el.setAttribute(isProperty ? 'property' : 'name', match[1])
        }
        document.head.appendChild(el)
      }
      el.setAttribute(attr, value)
    }

    setMeta('meta[name="description"]', 'content', description)

    let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!canonicalEl) {
      canonicalEl = document.createElement('link')
      canonicalEl.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalEl)
    }
    canonicalEl.setAttribute('href', canonical)

    setMeta('meta[property="og:type"]', 'content', ogType)
    setMeta('meta[property="og:title"]', 'content', ogTitle || title)
    setMeta('meta[property="og:description"]', 'content', ogDescription || description)
    setMeta('meta[property="og:image"]', 'content', ogImage)
    setMeta('meta[property="og:url"]', 'content', ogUrl || canonical)
    setMeta('meta[property="og:site_name"]', 'content', 'Ashima Empowers')
    setMeta('meta[property="og:locale"]', 'content', 'en_IN')

    setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image')
    setMeta('meta[name="twitter:title"]', 'content', twitterTitle || ogTitle || title)
    setMeta('meta[name="twitter:description"]', 'content', twitterDescription || ogDescription || description)
    setMeta('meta[name="twitter:image"]', 'content', twitterImage || ogImage)

    let jsonLdEl = document.getElementById('page-json-ld')
    if (jsonLd) {
      if (!jsonLdEl) {
        jsonLdEl = document.createElement('script')
        jsonLdEl.setAttribute('type', 'application/ld+json')
        jsonLdEl.setAttribute('id', 'page-json-ld')
        document.head.appendChild(jsonLdEl)
      }
      jsonLdEl.textContent = JSON.stringify(jsonLd)
    } else if (jsonLdEl) {
      jsonLdEl.remove()
    }

    return () => {
      const el = document.getElementById('page-json-ld')
      if (el) el.remove()
    }
  }, [title, description, canonical, ogTitle, ogDescription, ogImage, ogType, ogUrl, twitterTitle, twitterDescription, twitterImage, jsonLd])

  return null
}

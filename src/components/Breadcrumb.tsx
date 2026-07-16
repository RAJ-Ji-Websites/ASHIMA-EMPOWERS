import { useEffect } from 'react'
import { ChevronRight, Home } from 'lucide-react'

type BreadcrumbItem = {
  label: string
  href?: string
}

type BreadcrumbProps = {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  // Inject BreadcrumbList schema for JSON-LD
  useEffect(() => {
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://ashimaempowers.com',
        },
        ...items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 2,
          name: item.label,
          item: item.href ? `https://ashimaempowers.com${item.href}` : undefined,
        })),
      ],
    }

    // Remove any existing breadcrumb schema
    const existingEl = document.getElementById('breadcrumb-json-ld')
    if (existingEl) {
      existingEl.remove()
    }

    // Create and inject new schema
    const scriptEl = document.createElement('script')
    scriptEl.setAttribute('type', 'application/ld+json')
    scriptEl.setAttribute('id', 'breadcrumb-json-ld')
    scriptEl.textContent = JSON.stringify(breadcrumbSchema)
    document.head.appendChild(scriptEl)

    return () => {
      const el = document.getElementById('breadcrumb-json-ld')
      if (el) el.remove()
    }
  }, [items])

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-[#A0A0A0]">
        <li>
          <a href="/" className="inline-flex items-center gap-1 transition hover:text-[#F2D07C]">
            <Home className="h-4 w-4" />
            <span className="sr-only">Home</span>
          </a>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <ChevronRight className="h-4 w-4 text-[#D8A545]/50" />
            {item.href ? (
              <a href={item.href} className="transition hover:text-[#F2D07C]">
                {item.label}
              </a>
            ) : (
              <span className="text-[#F2D07C]">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

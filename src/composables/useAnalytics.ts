/**
 * useAnalytics.ts
 * Google Analytics 4 — G-E94CK6311V
 * Tracks: page_view (auto), cta_click, section_view, scroll_depth (25/50/75/100%)
 */
import { onMounted, onUnmounted } from 'vue'

const GA_ID = 'G-E94CK6311V'

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

function gtag(...args: unknown[]) {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(args)
}

export function useAnalytics() {
  let sectionObserver: IntersectionObserver | null = null
  const depthsMet = new Set<number>()

  function onScroll() {
    const total = document.body.scrollHeight - window.innerHeight
    if (total <= 0) return
    const pct = Math.round((window.scrollY / total) * 100);
    ([25, 50, 75, 100] as const).forEach((m) => {
      if (pct >= m && !depthsMet.has(m)) {
        depthsMet.add(m)
        gtag('event', 'scroll_depth', { event_category: 'engagement', event_label: `${m}%`, value: m })
      }
    })
  }

  onMounted(() => {
    // Inject gtag script
    const script    = document.createElement('script')
    script.async    = true
    script.src      = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
    document.head.appendChild(script)

    window.dataLayer = window.dataLayer || []
    window.gtag     = (...args: unknown[]) => window.dataLayer.push(args)
    window.gtag('js', new Date())
    window.gtag('config', GA_ID, { anonymize_ip: true })

    // CTA clicks
    document.querySelectorAll<HTMLElement>('.btn-primary, .btn-secondary').forEach((btn) => {
      btn.addEventListener('click', () => {
        gtag('event', 'cta_click', {
          event_category: 'engagement',
          event_label:    btn.textContent?.trim(),
        })
      })
    })

    // Section views (once per section)
    sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gtag('event', 'section_view', {
              event_category: 'engagement',
              event_label:    (entry.target as HTMLElement).id || entry.target.className,
            })
            sectionObserver?.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.4 }
    )
    document.querySelectorAll('section[id], div[id]').forEach((s) => sectionObserver!.observe(s))

    // Scroll depth
    window.addEventListener('scroll', onScroll, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
    sectionObserver?.disconnect()
  })
}

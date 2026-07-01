/**
 * useReveal.ts
 * IntersectionObserver that adds .visible to .reveal elements as they scroll in.
 * Stagger delay is applied to .why-item.reveal children.
 */
import { onMounted, onUnmounted } from 'vue'

export function useReveal() {
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer?.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )

    document.querySelectorAll<HTMLElement>('.reveal').forEach((el) => {
      observer!.observe(el)
    })

    // Stagger the feature-grid items
    document.querySelectorAll<HTMLElement>('.why-item.reveal').forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.08}s`
    })
  })

  onUnmounted(() => observer?.disconnect())
}

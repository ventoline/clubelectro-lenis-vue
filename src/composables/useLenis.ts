/**
 * useLenis.ts
 * Initialises Lenis smooth scroll and drives its RAF loop.
 * Exports the Lenis instance via a module-level ref so other composables
 * (useScrollProgress, useScene) can subscribe to scroll events.
 */
import { onMounted, onUnmounted, ref } from 'vue'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

export const lenisRef = ref<Lenis | null>(null)

export function useLenis() {
  let rafId = 0

  onMounted(() => {
    const lenis = new Lenis({
      duration:    1.2,
      easing:      (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      anchors:     true,
      overscroll:  false,   // prevents the bounce/repaint at scroll boundaries
    })

    lenisRef.value = lenis

    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)
  })

  onUnmounted(() => {
    cancelAnimationFrame(rafId)
    lenisRef.value?.destroy()
    lenisRef.value = null
  })
}

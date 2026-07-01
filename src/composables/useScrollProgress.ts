/**
 * useScrollProgress.ts
 * Keeps the progress bar width in sync with Lenis scroll position.
 * The Lenis scroll event passes the instance itself as the argument.
 */
import { onMounted, onUnmounted, type Ref } from 'vue'
import type Lenis from 'lenis'
import { lenisRef } from './useLenis'

export function useScrollProgress(barRef: Ref<HTMLElement | null>) {
  const update = (lenis: Lenis) => {
    const pct = lenis.progress * 100
    if (barRef.value) {
      barRef.value.style.width = `${pct}%`
      barRef.value.setAttribute('aria-valuenow', String(Math.round(pct)))
    }
  }

  onMounted(()  => lenisRef.value?.on('scroll', update))
  onUnmounted(() => lenisRef.value?.off('scroll', update))
}

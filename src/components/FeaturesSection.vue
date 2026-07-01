<script setup lang="ts">
interface Feature { title: string; desc: string; icon: string }

const features: Feature[] = [
  {
    title: 'Unified experience',
    desc:  'Gives all users the same buttery feel — trackpad, mouse wheel, or touch screen. You control the weight and responsiveness.',
    icon:  '<path d="M12 3v3M12 18v3M4.22 6.22l2.12 2.12M17.66 17.66l2.12 2.12M3 12h3M18 12h3M6.34 17.66l-2.12 2.12M19.78 6.22l-2.12-2.12" stroke="currentColor" stroke-linecap="round"/>',
  },
  {
    title: 'Reliable scroll sync',
    desc:  'Modern browsers run animations async — causing jitter. Smooth scroll synchronizes everything on the main thread for pixel-perfect results.',
    icon:  '<path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>',
  },
  {
    title: 'WebGL & Canvas friendly',
    desc:  'Exposes clean scroll values for driving Three.js, GSAP, or any WebGL scene — no hacks, just a reliable RAF loop.',
    icon:  '<rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor"/><path d="M9 9l6 6M15 9l-6 6" stroke="currentColor" stroke-linecap="round"/>',
  },
  {
    title: 'Accessible by design',
    desc:  'Respects prefers-reduced-motion, works with keyboard navigation, and doesn\'t break native scroll behaviors like anchor links.',
    icon:  '<path d="M12 22C6.48 22 2 17.52 2 12S6.48 2 12 2s10 4.48 10 10-4.48 10-10 10z" stroke="currentColor"/><path d="M12 8v4l3 3" stroke="currentColor" stroke-linecap="round"/>',
  },
  {
    title: 'Infinite scroll',
    desc:  'Built-in infinite scroll support — loop through content seamlessly with infinite: true and optional touch sync.',
    icon:  '<path d="M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" stroke="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/>',
  },
  {
    title: 'Framework agnostic',
    desc:  'Works with React, Vue, Svelte, Astro, plain JS — or anything. The community has integrations for every major framework.',
    icon:  '<path d="M9 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V9l-6-6z" stroke="currentColor"/><polyline points="9 3 9 9 15 9" stroke="currentColor" stroke-linejoin="round"/>',
  },
]
</script>

<template>
  <section id="features" aria-labelledby="features-heading">
    <div class="section-label reveal" aria-hidden="true">Why smooth scroll</div>
    <h2 id="features-heading" class="section-title reveal">
      The smoothest scroll<br>library on the web
    </h2>
    <p class="section-body reveal">
      Built to solve real problems: native scroll jank, unreliable animation
      sync, and inconsistent cross-device behavior.
    </p>

    <div class="why-grid">
      <div v-for="f in features" :key="f.title" class="why-item reveal">
        <div class="why-icon" aria-hidden="true">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <svg viewBox="0 0 24 24" fill="none" stroke-width="1.5" v-html="f.icon" />
        </div>
        <h3 class="why-title">{{ f.title }}</h3>
        <p class="why-desc">{{ f.desc }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  padding: 8rem 2rem;
  max-width: 1100px;
  margin: 0 auto;
}

.why-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem 6rem;
  margin-top: 5rem;
}
@media (max-width: 768px) {
  .why-grid { grid-template-columns: 1fr; gap: 3rem; }
}

.why-icon {
  width: 44px; height: 44px;
  border-radius: 10px;
  background: rgba(255,255,255,0.05);
  border: 1px solid var(--border);
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 1.25rem;
}
.why-icon svg { width: 20px; height: 20px; stroke: var(--text-muted); }

.why-title { font-size: 1.05rem; font-weight: 700; letter-spacing: -0.01em; margin-bottom: 0.6rem; }
.why-desc  { font-size: 0.875rem; color: var(--text-muted); line-height: 1.7; }
</style>

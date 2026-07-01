<script setup lang="ts">
import { ref } from "vue";
import { useLenis } from "@/composables/useLenis";
import { useScene } from "@/composables/useScene";
import { useScrollProgress } from "@/composables/useScrollProgress";
import { useReveal } from "@/composables/useReveal";
import { useAnalytics } from "@/composables/useAnalytics";

import NavBar from "@/components/NavBar.vue";
import HeroSection from "@/components/HeroSection.vue";
import StatsBar from "@/components/StatsBar.vue";
import MarqueeStrip from "@/components/MarqueeStrip.vue";
import FeaturesSection from "@/components/FeaturesSection.vue";
import CodeSection from "@/components/CodeSection.vue";
import OptionsSection from "@/components/OptionsSection.vue";
import UsedBySection from "@/components/UsedBySection.vue";
import EventsSection from "@/components/EventsSection.vue";
import MailingList from "@/components/MailingList.vue";
import CtaSection from "@/components/CtaSection.vue";
import SiteFooter from "@/components/SiteFooter.vue";

const canvasRef = ref<HTMLCanvasElement | null>(null);
const progressRef = ref<HTMLElement | null>(null);

useLenis(); // must be first — sets up lenisRef before others subscribe
useScene(canvasRef);
useScrollProgress(progressRef);
useReveal();
useAnalytics();
</script>

<template>
  <!-- Skip nav (WCAG 2.4.1) -->
  <a class="skip-nav" href="#main-content">Skip to main content</a>

  <!-- 3D canvas — decorative, hidden from screen readers -->
  <canvas
    ref="canvasRef"
    id="canvas-bg"
    role="presentation"
    aria-hidden="true"
  />

  <!-- Film grain (decorative) -->
  <div class="grain" aria-hidden="true" />

  <!-- Scroll progress bar -->
  <div
    ref="progressRef"
    id="progress"
    role="progressbar"
    aria-label="Page scroll progress"
    aria-valuemin="0"
    aria-valuemax="100"
    aria-valuenow="0"
  />

  <div class="wrapper">
    <NavBar />

    <main id="main-content">
      <HeroSection />
      <MarqueeStrip />
      <EventsSection />
      <MailingList />
      <FeaturesSection />
      <!-- CodeSection /-->
      <!--OptionsSection / -->
      <StatsBar />

      <!--UsedBySection /-->
      <CtaSection />
    </main>

    <SiteFooter />
  </div>
</template>

<style>
/* ── Canvas & grain ─────────────────────────────────────── */
#canvas-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  /* Promote to own GPU compositing layer — prevents scroll repaints */
  will-change: transform;
  transform: translateZ(0);
}

.grain {
  position: fixed;
  inset: -200%;
  z-index: 3;
  pointer-events: none;
  opacity: 0.1; /*.1;*/
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-size: 300px 300px;
  animation: grain 0.5s steps(1) infinite;
  will-change: transform;
}

@keyframes grain {
  0% {
    transform: translate(0, 0);
  }
  10% {
    transform: translate(-5%, -10%);
  }
  20% {
    transform: translate(-15%, 5%);
  }
  30% {
    transform: translate(7%, -25%);
  }
  40% {
    transform: translate(-5%, 25%);
  }
  50% {
    transform: translate(-15%, 10%);
  }
  60% {
    transform: translate(15%, 0);
  }
  70% {
    transform: translate(0, 15%);
  }
  80% {
    transform: translate(3%, 35%);
  }
  90% {
    transform: translate(-10%, 10%);
  }
  100% {
    transform: translate(0, 0);
  }
}

/* ── Skip nav ───────────────────────────────────────────── */
.skip-nav {
  position: absolute;
  top: -100%;
  left: 1rem;
  z-index: 9999;
  background: var(--accent);
  color: #0a0a0a;
  font-size: 0.85rem;
  font-weight: 700;
  padding: 0.6rem 1.2rem;
  border-radius: 0 0 8px 8px;
  text-decoration: none;
  transition: top 0.2s;
}
.skip-nav:focus {
  top: 0;
}

/* ── Progress bar ───────────────────────────────────────── */
#progress {
  position: fixed;
  top: 59px;
  left: 0;
  height: 2px;
  background: var(--accent);
  z-index: 200;
  width: 0%;
  transition: width 0.1s linear;
}

/* ── Layout wrapper ─────────────────────────────────────── */
.wrapper {
  position: relative;
  z-index: 2;
}

@media (prefers-reduced-motion: reduce) {
  #canvas-bg,
  .grain {
    display: none;
  }
}</style>

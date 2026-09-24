<script setup lang="ts">
interface Feature {
  title: string;
  desc: string;
  icon: string;
}

const features: Feature[] = [
  {
    title: "Menal Math",
    desc: "Ready, Set, Count! UI free intuitive app to train mental calculus, based on speech only, based on several math models to help identify diffculties ",
    icon: '<path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>',
    image: "/images/menalmath-screenshot.png",
    link: "https://menalmath.vercel.app/",
  },
  {
    title: "Wordle",
    desc: "Wordle is a word game where you have to guess a five-letter word in six tries. Each guess must be a valid five-letter word. After each guess, the color of the tiles will change to show how close your guess was to the word.",
    icon: '<rect x="3" y="3" width="18" height="18" stroke="currentColor"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18" stroke="currentColor"/>',
    link: "https://www.nytimes.com/games/wordle/index.html",
  },
  {
    title: "Crisse en 5",
    desc: "If wordle was Quebecois.. Coming soon",
    icon: '<path d="M12 3v3M12 18v3M4.22 6.22l2.12 2.12M17.66 17.66l2.12 2.12M3 12h3M18 12h3M6.34 17.66l-2.12 2.12M19.78 6.22l-2.12-2.12" stroke="currentColor" stroke-linecap="round"/>',
  },
  {
    title: "Ayoye AI!",
    desc: "Web is awesome platform, from Digital Moment, completes ressource to raise awareness with AI, learn web security and etiquette",
    icon: '<path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18ZM12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18ZM15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4M17.599 6.5a3 3 0 0 0 .399-1.375M6.003 5.125A3 3 0 0 0 6.401 6.5M3.477 10.896a4 4 0 0 1 .585-.396M19.938 10.5a4 4 0 0 1 .585.396M6 18a4 4 0 0 1-1.967-.516M19.967 17.484A4 4 0 0 1 18 18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>',
  },
];
</script>

<!--

  {
    title: "Accessible by design",
    desc: "Respects prefers-reduced-motion, works with keyboard navigation, and doesn't break native scroll behaviors like anchor links.",
    icon: '<path d="M12 22C6.48 22 2 17.52 2 12S6.48 2 12 2s10 4.48 10 10-4.48 10-10 10z" stroke="currentColor"/><path d="M12 8v4l3 3" stroke="currentColor" stroke-linecap="round"/>',
  },
  {
    title: "Infinite scroll",
    desc: "Built-in infinite scroll support — loop through content seamlessly with infinite: true and optional touch sync.",
    icon: '<path d="M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" stroke="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/>',
  },
  {
    title: "Framework agnostic",
    desc: "Works with React, Vue, Svelte, Astro, plain JS — or anything. The community has integrations for every major framework.",
    icon: '<path d="M9 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V9l-6-6z" stroke="currentColor"/><polyline points="9 3 9 9 15 9" stroke="currentColor" stroke-linejoin="round"/>',
  },
]; -->

<template>
  <section id="features" aria-labelledby="features-heading">
    <div class="section-label reveal" aria-hidden="true">Ze apps</div>
    <h2 id="features-heading" class="section-title reveal">
      Fun n learn<br />
    </h2>
    <p class="section-body reveal">
      Tools and Applications designed with Kids in mind to learn. Utilities you
      can use or embed on your own site. intuivitely.Free ressources removing
      barriers to learning, enhancing access to Technologie. Promoting local
      culture, French, accademic training and STEM.
    </p>

    <div class="why-grid">
      <div v-for="f in features" :key="f.title" class="why-item reveal">
        <div class="why-icon" aria-hidden="true">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke-width="1.5"
            v-html="f.icon"
          />
        </div>
        <h3 class="why-title">{{ f.title }}</h3>
        <p class="why-desc">{{ f.desc }}</p>

        <a v-if="f.link" :href="f.link" class="" target="_blank">
          <img
            v-if="f.image"
            :src="f.image"
            alt="f.title"
            class="feature-image"
        /></a>
        <a v-if="f.link" :href="f.link" class="btn-primary" target="_blank">
          Play!
        </a>
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
  .why-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

.why-icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.25rem;
}
.why-icon svg {
  width: 20px;
  height: 20px;
  stroke: var(--text-muted);
}

.why-title {
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  margin-bottom: 0.6rem;
}
.why-desc {
  font-size: 0.875rem;
  color: var(--text-muted);
  line-height: 1.7;
}

.feature-image {
  width: 100%;
  max-width: 350px;
  object-fit: cover;
  margin-bottom: -3rem;
}
</style>

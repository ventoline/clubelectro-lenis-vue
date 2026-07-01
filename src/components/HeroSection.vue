<script setup lang="ts">
// No props — static hero content
</script>

<template>
  <section class="hero" id="intro" aria-labelledby="hero-heading">
    <div class="hero-scroll-hint" aria-hidden="true">
      <span class="scroll-hint-text">scroll</span>
      <div class="scroll-hint-line" />
    </div>
    <div class="hero-eyebrow" aria-hidden="true">
      <div class="hero-eyebrow-dot" />
      STEM · Arts · Tech · AI
    </div>

    <h1 id="hero-heading" class="hero-title">
      <span class="hero-title-line">le club</span>
      <span class="hero-title-line"
        ><span class="word-smooth">electro</span></span
      >
    </h1>

    <p class="hero-sub">
      We offer activities for all, kids up to 99 years old. Workshop or courses
      at the intersection of Arts, Tech and STEM.
    </p>

    <div class="hero-ctas">
      <a href="mailto:leclubelectro@gmail.com" class="btn-primary">
        Get in touch
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          aria-hidden="true"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </a>
      <!--a href="#usage" class="btn-secondary">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          aria-hidden="true"
        >
          <path d="M16 18l6-6-6-6M8 6L2 12l6 6" />
        </svg>
        View usage
      </a -->
    </div>

    <!-- div class="hero-scroll-hint" aria-hidden="true">
      <span class="scroll-hint-text">scroll</span>
      <div class="scroll-hint-line" />
    </div -->
  </section>
</template>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 120px 2rem 80px;
  position: relative;
}

.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--accent-dim);
  border: 1px solid rgba(200, 255, 87, 0.2);
  border-radius: 999px;
  padding: 0.3rem 1rem;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 2.5rem;
  opacity: 0;
  animation: fadeUp 0.8s 0.2s ease forwards;
}

.hero-eyebrow-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.85);
  }
}

.hero-title {
  font-size: clamp(4rem, 14vw, 13rem);
  font-weight: 900;
  line-height: 0.88;
  letter-spacing: -0.04em;
  margin-bottom: 2rem;
  opacity: 0;
  animation: fadeUp 0.9s 0.35s ease forwards;
  user-select: none;
  -webkit-user-select: none;
}
.hero-title-line {
  display: block;
}
.word-smooth {
  color: var(--accent);
}

.hero-sub {
  font-size: clamp(1rem, 2.5vw, 1.3rem);
  font-weight: 400;
  color: var(--text-muted);
  max-width: 480px;
  line-height: 1.6;
  margin-bottom: 3rem;
  opacity: 0;
  animation: fadeUp 0.9s 0.5s ease forwards;
}

.hero-ctas {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  opacity: 0;
  animation: fadeUp 0.9s 0.65s ease forwards;
}

.hero-scroll-hint {
  position: absolute;
  top: 3.5em;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  opacity: 0;
  animation: fadeIn 1s 1.2s ease forwards;
}

.scroll-hint-text {
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-subtle);
}

.scroll-hint-line {
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, var(--text-subtle), transparent);
  animation: scrollLine 2s 1.5s ease infinite;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes scrollLine {
  0%   { transform: scaleY(0); transform-origin: top; }
  50%  { transform: scaleY(1); transform-origin: top; }
  51%  { transform: scaleY(1); transform-origin: bottom; }
  100% { transform: scaleY(0); transform-origin: bottom; }
}
</style>

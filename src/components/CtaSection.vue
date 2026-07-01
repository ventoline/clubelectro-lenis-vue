<script setup lang="ts">
// No props
</script>

<template>
  <section class="cta-section" aria-labelledby="cta-heading" id="cta">
    <h2 id="cta-heading" class="cta-title reveal">
      Plug n <em>Play</em><br />with us!
    </h2>
    <p class="cta-sub reveal">Book a workshop or enquire foor an activity.</p>
    <div class="cta-btns reveal">
      <a href="#events" class="btn-primary">
        Come play!
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
      <a href="mailto:leclubelectro@gmail.com" class="btn-secondary">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          aria-hidden="true"
        >
          <path d="M9 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V9l-6-6z" />
          <polyline points="9 3 9 9 15 9" />
        </svg>
        Get in touch
      </a>
    </div>
  </section>
</template>

<style scoped>
.cta-section {
  border-top: 1px solid var(--border);
  text-align: center;
  padding: 10rem 2rem;
  max-width: 1100px;
  margin: 0 auto;
}

.cta-title {
  font-size: clamp(2.5rem, 6vw, 5.5rem);
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 1;
  margin-bottom: 1.5rem;
}
.cta-title em {
  font-style: normal;
  color: var(--accent);
}

.cta-sub {
  font-size: 1rem;
  color: var(--text-muted);
  margin-bottom: 3rem;
}

.cta-btns {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}
</style>

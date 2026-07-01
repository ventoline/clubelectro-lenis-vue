<script setup lang="ts">
const groups = [
  'Creative Studios',
  'Digital Agencies',
  'Indie Developers',
  'Product Teams',
  'Freelancers',
  'Open Source Projects',
]
</script>

<template>
  <section class="used-by" aria-labelledby="usedby-heading">
    <div class="section-label reveal" aria-hidden="true">Ecosystem</div>
    <h2 id="usedby-heading" class="section-title reveal">Used by the best<br>studios on the web</h2>
    <p class="section-body reveal">
      Trusted by award-winning studios and developers worldwide to deliver
      smooth, polished web experiences.
    </p>
    <ul class="used-by-logos reveal" role="list" aria-label="Types of teams using smooth scroll">
      <li v-for="g in groups" :key="g" class="logo-pill">{{ g }}</li>
    </ul>
  </section>
</template>

<style scoped>
.used-by {
  border-top: 1px solid var(--border);
  padding: 8rem 2rem;
  max-width: 1100px;
  margin: 0 auto;
}

.used-by-logos {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 3rem;
  list-style: none;
}

.logo-pill {
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 0.6rem 1.2rem;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--text-muted);
  letter-spacing: 0.02em;
}
</style>

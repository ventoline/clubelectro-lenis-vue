<script setup lang="ts">
const tags = [
  'Lightweight','Scroll Sync','WebGL Ready','Parallax',
  'Accessible','Zero deps','Infinite scroll','Touch support','Horizontal scroll',
]
// Duplicate for seamless loop
const items = [...tags, ...tags]
</script>

<template>
  <div class="demo-strip" aria-hidden="true">
    <div class="marquee-track">
      <div v-for="(tag, i) in items" :key="i" class="marquee-item">
        {{ tag }} <span>✦</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-strip {
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  overflow: hidden;
}

.marquee-track {
  display: flex;
  white-space: nowrap;
  animation: marquee 18s linear infinite;
}
.marquee-track:hover { animation-play-state: paused; }

@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

.marquee-item {
  display: inline-flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.5rem 2.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
  border-right: 1px solid var(--border);
}
.marquee-item span { color: var(--accent); }
</style>

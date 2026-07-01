<script setup lang="ts">
interface Stat { value: string; accent: string; label: string }

const stats: Stat[] = [
  { value: '',    accent: '10M+',  label: 'Weekly Downloads' },
  { value: '',    accent: '14K+',  label: 'GitHub Stars'     },
  { value: '0',   accent: '',      label: 'Dependencies'     },
  { value: 'kb',  accent: '~4',    label: 'Gzipped Size'     },
]
</script>

<template>
  <div class="stats-bar reveal" role="region" aria-label="Key statistics">
    <div v-for="stat in stats" :key="stat.label" class="stat-item">
      <div class="stat-value">
        <span v-if="stat.accent">{{ stat.accent }}</span>{{ stat.value }}
      </div>
      <div class="stat-label">{{ stat.label }}</div>
    </div>
  </div>
</template>

<style scoped>
.stats-bar {
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  padding: 2.5rem 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
  max-width: 900px;
  margin: 0 auto;
}

.stat-item { text-align: center; }

.stat-value {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1;
  margin-bottom: 0.4rem;
}
.stat-value span { color: var(--accent); }

.stat-label {
  font-size: 0.75rem;
  color: var(--text-muted);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
</style>

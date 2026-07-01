<script setup lang="ts">
const links = [
  { label: 'Intro',    href: '#intro'    },
  { label: 'Features', href: '#features' },
  { label: 'Usage',    href: '#usage'    },
  { label: 'Options',  href: '#options'  },
]
</script>

<template>
  <footer role="contentinfo">
    <div class="footer-left">Open source under MIT.</div>
    <nav class="footer-links" aria-label="Footer navigation">
      <a v-for="link in links" :key="link.href" :href="link.href">
        {{ link.label }}
      </a>
    </nav>
  </footer>
</template>

<style scoped>
footer {
  border-top: 1px solid var(--border);
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-left { font-size: 0.78rem; color: var(--text-subtle); }

.footer-links { display: flex; gap: 1.5rem; }
.footer-links a {
  font-size: 0.78rem;
  color: var(--text-muted);
  text-decoration: none;
  transition: color 0.2s;
}
.footer-links a:hover { color: var(--text); }
</style>

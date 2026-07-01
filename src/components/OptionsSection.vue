<script setup lang="ts">
interface Option { name: string; type: string; desc: string }

const options: Option[] = [
  { name: 'lerp',               type: 'number',   desc: 'Linear interpolation intensity (0–1). Default: 0.1' },
  { name: 'duration',           type: 'number',   desc: 'Duration of scroll animation in seconds. Default: 1.2' },
  { name: 'easing',             type: 'function', desc: 'Easing function applied to scroll. Receives progress (0–1).' },
  { name: 'orientation',        type: 'string',   desc: 'Scroll direction — "vertical" or "horizontal".' },
  { name: 'gestureOrientation', type: 'string',   desc: 'Gesture input direction — "both", "vertical" or "horizontal".' },
  { name: 'smoothWheel',        type: 'boolean',  desc: 'Enable smooth scrolling on mouse wheel input. Default: true' },
  { name: 'infinite',           type: 'boolean',  desc: 'Enable infinite looping scroll. Default: false' },
  { name: 'autoRaf',            type: 'boolean',  desc: 'Automatically call raf in an internal requestAnimationFrame loop.' },
  { name: 'syncTouch',          type: 'boolean',  desc: 'Synchronize touch scroll with smooth behavior. Required for infinite on touch.' },
  { name: 'prevent',            type: 'function', desc: 'Callback to prevent scroll from being smoothed on specific elements.' },
]
</script>

<template>
  <section id="options" aria-labelledby="options-heading">
    <div class="section-label reveal" aria-hidden="true">Reference</div>
    <h2 id="options-heading" class="section-title reveal">Configuration options</h2>

    <table class="options-table reveal" aria-label="Scroll library configuration options">
      <caption>All available constructor options with types and descriptions</caption>
      <thead>
        <tr>
          <th scope="col">Option</th>
          <th scope="col">Type</th>
          <th scope="col">Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="opt in options" :key="opt.name">
          <td>{{ opt.name }}</td>
          <td>{{ opt.type }}</td>
          <td>{{ opt.desc }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style scoped>
section {
  padding: 8rem 2rem;
  max-width: 1100px;
  margin: 0 auto;
}

.options-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 3rem;
  font-size: 0.82rem;
}
.options-table caption { font-size: 0; }

.options-table th {
  text-align: left;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--border);
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-subtle);
  font-weight: 600;
}

.options-table td {
  padding: 0.85rem 1rem;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  color: var(--text-muted);
  vertical-align: top;
  line-height: 1.6;
}
.options-table td:first-child {
  color: var(--text);
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 0.78rem;
}
.options-table td:nth-child(2) {
  color: var(--accent);
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 0.75rem;
}
.options-table tr:hover td { background: rgba(255,255,255,0.02); }
</style>

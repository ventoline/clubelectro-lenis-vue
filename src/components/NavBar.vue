<script setup lang="ts">
// No props — static nav
</script>

<template>
  <nav aria-label="Main navigation">
    <a class="nav-logo" href="#" aria-label="Smooth Scroll — home">
      <div class="nav-logo-mark" aria-hidden="true">
        <svg viewBox="0 0 22 20">
          <path
            d="M13 10V3L4 14h7v7l9-11h-7z"
            stroke="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <span class="nav-logo-text">le Club electro</span>
    </a>
    <ul class="nav-links" role="list">
      <li><a href="#intro">LCE</a></li>
      <li><a href="#events">Wokshops</a></li>
      <li><a href="#features">Apps</a></li>
      <li><a href="#cta">Contact</a></li>
      <!--li><a href="#options">Options</a></li-->
    </ul>
  </nav>
</template>

<style scoped>
nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  height: 60px;
  border-bottom: 1px solid var(--border);
  background: rgba(10, 10, 10, 0.6);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: var(--text);
}

.nav-logo-mark {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
}
.nav-logo-mark svg {
  width: 16px;
  height: 16px;
}

.nav-logo-text {
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  list-style: none;
}

.nav-links a {
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: 500;
  padding: 0.4rem 0.75rem;
  border-radius: 6px;
  transition:
    color 0.2s,
    background 0.2s;
}
.nav-links a:hover {
  color: var(--text);
  background: rgba(255, 255, 255, 0.05);
}
</style>

<script setup lang="ts">
import { useCalendar } from '@/composables/useCalendar'

const { events, loading, error } = useCalendar()
</script>

<template>
  <section class="events-section" id="events" aria-labelledby="events-heading">
    <div class="section-label reveal" aria-hidden="true">Upcoming</div>
    <h2 id="events-heading" class="section-title reveal">Events</h2>

    <!-- Loading -->
    <div v-if="loading" class="events-state" aria-live="polite" aria-busy="true">
      <span class="events-spinner" aria-hidden="true" />
      Loading events…
    </div>

    <!-- Error -->
    <div v-else-if="error" class="events-state events-error" role="alert">
      {{ error }}
    </div>

    <!-- Empty -->
    <div v-else-if="events.length === 0" class="events-state" aria-live="polite">
      No upcoming events scheduled.
    </div>

    <!-- List -->
    <ul v-else class="events-list" role="list" aria-label="Upcoming events">
      <li
        v-for="event in events"
        :key="event.id"
        class="event-row"
      >
        <span class="event-date-label" aria-label="Date">{{ event.dateLabel }} {{ event.timeLabel }}</span>
        <span class="event-title">{{ event.title }}</span>

        <a
          v-if="event.ticketUrl"
          :href="event.ticketUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="event-btn"
          :aria-label="`Get tickets for ${event.title}`"
        >
          Tickets
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
            <path d="M7 17L17 7M7 7h10v10"/>
          </svg>
        </a>
        <span v-else class="event-btn event-btn--tba">TBA</span>

      </li>
    </ul>
  </section>
</template>

<style scoped>
.events-section {
  border-top: 1px solid var(--border);
  padding: 8rem 2rem;
  max-width: 1100px;
  margin: 0 auto;
}

/* ── State messages ─────────────────────────────────── */
.events-state {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--text-muted);
  font-size: 0.9rem;
  padding: 3rem 0;
}

.events-error { color: #ff6b6b; }

.events-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid var(--border);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  flex-shrink: 0;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ── List ───────────────────────────────────────────── */
.events-list {
  list-style: none;
  margin-top: 3rem;
}

/* ── Row — matches OptionsSection table row style ───── */
.event-row {
  display: grid;
  grid-template-columns: 10rem 1fr auto;
  align-items: center;
  gap: 0 1rem;
  padding: 0.45rem 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  transition: background 0.15s;
  animation: rowIn 0.5s ease both;
}

.event-row:hover { background: rgba(255, 255, 255, 0.02); }

/* Stagger each row by 60ms */
.event-row:nth-child(1)  { animation-delay: 0.05s; }
.event-row:nth-child(2)  { animation-delay: 0.11s; }
.event-row:nth-child(3)  { animation-delay: 0.17s; }
.event-row:nth-child(4)  { animation-delay: 0.23s; }
.event-row:nth-child(5)  { animation-delay: 0.29s; }
.event-row:nth-child(6)  { animation-delay: 0.35s; }
.event-row:nth-child(7)  { animation-delay: 0.41s; }
.event-row:nth-child(8)  { animation-delay: 0.47s; }
.event-row:nth-child(9)  { animation-delay: 0.53s; }
.event-row:nth-child(10) { animation-delay: 0.59s; }

@keyframes rowIn {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Date ───────────────────────────────────────────── */
.event-date-label {
  font-size: 0.82rem;
  font-weight: 400;
  color: var(--text-muted);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

/* ── Title — matches "type" column: accent + monospace ─ */
.event-title {
  color: var(--accent);
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 0.75rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ── Button ─────────────────────────────────────────── */
.event-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0.5rem 1.1rem;
  border-radius: 8px;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-decoration: none;
  white-space: nowrap;
  background: var(--accent-dim);
  color: var(--accent);
  border: 1px solid rgba(200, 255, 87, 0.2);
  transition: background 0.2s, border-color 0.2s;
  flex-shrink: 0;
}

.event-btn:hover {
  background: rgba(200, 255, 87, 0.2);
  border-color: rgba(200, 255, 87, 0.4);
}

.event-btn--tba {
  color: var(--text-subtle);
  background: transparent;
  border-color: var(--border);
  cursor: default;
  pointer-events: none;
}


/* ── Responsive ─────────────────────────────────────── */
@media (max-width: 640px) {
  .event-row {
    grid-template-columns: 1fr auto;
    grid-template-rows: auto auto;
    gap: 0.25rem 1rem;
  }
  .event-date-label { grid-column: 1; grid-row: 1; }
  .event-title      { grid-column: 1; grid-row: 2; }
  .event-btn        { grid-column: 2; grid-row: 1 / 3; align-self: center; }
}
</style>

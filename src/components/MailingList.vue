<script setup lang="ts">
import { ref } from "vue";

// Replace with your MailerLite group/subscriber API key
// Add to .env: VITE_MAILERLITE_API_KEY=your_key_here
const API_KEY = import.meta.env.VITE_MAILERLITE_API_KEY as string;

const email = ref("");
const name = ref("");
const status = ref<"idle" | "loading" | "success" | "error">("idle");
const message = ref("");

async function subscribe() {
  if (!email.value || status.value === "loading") return;
  status.value = "loading";
  message.value = "";

  try {
    const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        email: email.value,
        fields: { name: name.value },
        groups: [], // optional: add your MailerLite group ID strings here
      }),
    });

    if (res.ok || res.status === 201 || res.status === 200) {
      status.value = "success";
      message.value = "You're in. See you at the next event.";
      email.value = "";
      name.value = "";
    } else {
      const data = await res.json().catch(() => ({}));
      throw new Error(data?.message ?? `Error ${res.status}`);
    }
  } catch (e: any) {
    status.value = "error";
    message.value = e.message ?? "Something went wrong. Try again.";
  }
}
</script>

<template>
  <section
    class="mailing-section"
    id="mailing"
    aria-labelledby="mailing-heading"
  >
    <div class="mailing-inner">
      <div class="mailing-copy reveal">
        <div class="section-label" aria-hidden="true">Stay in the loop</div>
        <h2 id="mailing-heading" class="mailing-title">
          Stay tuned for updates
        </h2>
        <p class="mailing-sub">
          We will be adding more content and sessions in the near future.
        </p>
      </div>

      <form
        class="mailing-form reveal"
        @submit.prevent="subscribe"
        aria-label="Mailing list signup"
        novalidate
      >
        <div class="mailing-fields">
          <div class="field-wrap">
            <label for="ml-name" class="field-label">Name</label>
            <input
              id="ml-name"
              v-model="name"
              type="text"
              class="field-input"
              placeholder="Your name"
              autocomplete="given-name"
              :disabled="status === 'loading' || status === 'success'"
            />
          </div>

          <div class="field-wrap">
            <label for="ml-email" class="field-label"
              >Email <span aria-hidden="true">*</span></label
            >
            <input
              id="ml-email"
              v-model="email"
              type="email"
              class="field-input"
              placeholder="you@example.com"
              required
              autocomplete="email"
              :disabled="status === 'loading' || status === 'success'"
            />
          </div>
        </div>

        <button
          type="submit"
          class="mailing-btn"
          :disabled="status === 'loading' || status === 'success'"
          :aria-busy="status === 'loading'"
        >
          <span
            v-if="status === 'loading'"
            class="btn-spinner"
            aria-hidden="true"
          />
          <span v-else-if="status === 'success'">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              aria-hidden="true"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
            Subscribed
          </span>
          <span v-else>
            Subscribe
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
          </span>
        </button>

        <p
          v-if="message"
          class="mailing-message"
          :class="
            status === 'error'
              ? 'mailing-message--error'
              : 'mailing-message--success'
          "
          role="status"
          aria-live="polite"
        >
          {{ message }}
        </p>

        <p class="mailing-legal">
          By subscribing you agree to receive emails from
          <a href="https://leclubelectro.ca" target="_blank" rel="noopener"
            >le Club électro</a
          >. Unsubscribe anytime.
        </p>
      </form>
    </div>
  </section>
</template>

<style scoped>
.mailing-section {
  border-top: 1px solid var(--border);
  padding: 8rem 2rem;
}

.mailing-inner {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

/* ── Copy ───────────────────────────────────────────── */
.mailing-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin-bottom: 1rem;
}

.mailing-sub {
  font-size: 0.95rem;
  color: var(--text-muted);
  line-height: 1.7;
  max-width: 380px;
}

/* ── Form ───────────────────────────────────────────── */
.mailing-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.mailing-fields {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.field-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.field-label {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-subtle);
}

.field-input {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-size: 0.88rem;
  color: var(--text);
  font-family: inherit;
  outline: none;
  transition:
    border-color 0.2s,
    background 0.2s;
  width: 100%;
}

.field-input::placeholder {
  color: var(--text-subtle);
}

.field-input:focus {
  border-color: var(--accent);
  background: rgba(200, 255, 87, 0.04);
}

.field-input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ── Button ─────────────────────────────────────────── */
.mailing-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: var(--accent);
  color: #0a0a0a;
  font-size: 0.85rem;
  font-weight: 700;
  padding: 0.8rem 1.8rem;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-family: inherit;
  letter-spacing: 0.01em;
  transition:
    transform 0.2s,
    box-shadow 0.2s,
    opacity 0.2s;
  align-self: flex-start;
}

.mailing-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(200, 255, 87, 0.3);
}

.mailing-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* ── Spinner ────────────────────────────────────────── */
.btn-spinner {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(10, 10, 10, 0.3);
  border-top-color: #0a0a0a;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* ── Status messages ────────────────────────────────── */
.mailing-message {
  font-size: 0.82rem;
  padding: 0.6rem 0;
}
.mailing-message--success {
  color: var(--accent);
}
.mailing-message--error {
  color: #ff6b6b;
}

/* ── Legal ──────────────────────────────────────────── */
.mailing-legal {
  font-size: 0.72rem;
  color: var(--text-subtle);
  line-height: 1.6;
}
.mailing-legal a {
  color: var(--text-muted);
  text-decoration: underline;
  text-underline-offset: 2px;
}

/* ── Responsive ─────────────────────────────────────── */
@media (max-width: 768px) {
  .mailing-inner {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
}
</style>

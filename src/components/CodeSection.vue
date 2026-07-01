<script setup lang="ts">
// Static code display — no dynamic data needed
</script>

<template>
  <section class="code-section" id="usage" aria-labelledby="usage-heading">
    <div class="section-label reveal" aria-hidden="true">Get started</div>
    <h2 id="usage-heading" class="section-title reveal">Up and running<br>in minutes</h2>

    <div class="code-split">
      <!-- Left: import snippet -->
      <div class="reveal">
        <p class="section-body" style="margin-bottom:2rem;">
          Drop in a script tag or import the module. Initialize once, scroll forever.
        </p>
        <div class="code-block">
          <div class="code-header" aria-hidden="true">
            <div class="code-dot" /><div class="code-dot" /><div class="code-dot" />
            <span class="code-filename">index.html</span>
          </div>
          <pre aria-label="HTML import example"><span class="token-comment">&lt;!-- via CDN --&gt;</span>
<span class="token-keyword">&lt;script</span> <span class="token-prop">type</span><span class="token-punct">=</span><span class="token-string">"module"</span><span class="token-keyword">&gt;</span>
  <span class="token-keyword">import</span> SmoothScroll
    <span class="token-keyword">from</span> <span class="token-string">'./smooth-scroll.js'</span>
<span class="token-keyword">&lt;/script&gt;</span></pre>
        </div>
      </div>

      <!-- Right: initialization snippet -->
      <div class="reveal">
        <div class="code-block">
          <div class="code-header" aria-hidden="true">
            <div class="code-dot" /><div class="code-dot" /><div class="code-dot" />
            <span class="code-filename">main.js</span>
          </div>
          <pre aria-label="JavaScript initialization example"><span class="token-keyword">import</span> SmoothScroll <span class="token-keyword">from</span> <span class="token-string">'./smooth-scroll.js'</span>

<span class="token-comment">// Create a new instance</span>
<span class="token-keyword">const</span> <span class="token-var">scroll</span> = <span class="token-keyword">new</span> <span class="token-fn">SmoothScroll</span><span class="token-punct">({</span>
  <span class="token-prop">autoRaf</span><span class="token-punct">:</span> <span class="token-keyword">true</span><span class="token-punct">,</span>
  <span class="token-prop">lerp</span><span class="token-punct">:</span> <span class="token-num">0.1</span><span class="token-punct">,</span>
  <span class="token-prop">duration</span><span class="token-punct">:</span> <span class="token-num">1.2</span><span class="token-punct">,</span>
  <span class="token-prop">easing</span><span class="token-punct">:</span> <span class="token-punct">(</span><span class="token-var">t</span><span class="token-punct">) =&gt;</span> <span class="token-fn">Math</span><span class="token-punct">.</span><span class="token-fn">min</span><span class="token-punct">(</span><span class="token-num">1</span><span class="token-punct">,</span>
    <span class="token-num">1.001</span> <span class="token-punct">-</span> <span class="token-fn">Math</span><span class="token-punct">.</span><span class="token-fn">pow</span><span class="token-punct">(</span><span class="token-num">2</span><span class="token-punct">, -</span><span class="token-num">10</span> <span class="token-punct">*</span> <span class="token-var">t</span><span class="token-punct">))</span><span class="token-punct">,</span>
<span class="token-punct">})</span>

<span class="token-comment">// Listen to scroll events</span>
<span class="token-var">scroll</span><span class="token-punct">.</span><span class="token-fn">on</span><span class="token-punct">(</span><span class="token-string">'scroll'</span><span class="token-punct">,</span> <span class="token-punct">({ </span><span class="token-prop">scroll</span><span class="token-punct">,</span> <span class="token-prop">progress</span> <span class="token-punct">}) =&gt;</span> <span class="token-punct">{</span>
  <span class="token-fn">console</span><span class="token-punct">.</span><span class="token-fn">log</span><span class="token-punct">(</span><span class="token-var">scroll</span><span class="token-punct">,</span> <span class="token-var">progress</span><span class="token-punct">)</span>
<span class="token-punct">})</span></pre>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.code-section {
  border-top: 1px solid var(--border);
  padding: 8rem 2rem;
  max-width: 1100px;
  margin: 0 auto;
}

.code-split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
  margin-top: 3rem;
}
@media (max-width: 900px) { .code-split { grid-template-columns: 1fr; } }

.code-block {
  background: #111111;
  border: 1px solid var(--border);
  border-radius: 14px;
  overflow: hidden;
}

.code-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--border);
}

.code-dot {
  width: 10px; height: 10px;
  border-radius: 50%;
  background: rgba(255,255,255,0.12);
}
.code-dot:first-child  { background: #ff5f57; }
.code-dot:nth-child(2) { background: #ffbd2e; }
.code-dot:nth-child(3) { background: #28c840; }

.code-filename {
  margin-left: auto;
  font-size: 0.7rem;
  color: var(--text-subtle);
  font-family: 'SF Mono', 'Fira Code', monospace;
}

pre {
  padding: 1.5rem;
  overflow-x: auto;
  font-size: 0.82rem;
  line-height: 1.75;
  font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
}
</style>

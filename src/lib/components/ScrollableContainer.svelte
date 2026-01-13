<script lang="ts">
  let { title = "", maxHeight = 100, children } = $props();
</script>

<section class="wrapper" aria-label={title || "Scrollable content"}>
  {#if title}
    <header class="header">
      <h2>{title}</h2>
    </header>
  {/if}
  <div class="body" style={`max-height:${maxHeight}vh`}>
    {@render children?.()}
  </div>
</section>

<style>
  .wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    background: var(--color-bg);
    border: 1px solid var(--color-muted-teal);

    padding: 1rem;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  }

  .header h2 {
    margin: 0;
    font-size: 1.2rem;
    color: var(--color-dark-spruce);
    letter-spacing: 0.02em;
  }

  .body {
    overflow-y: auto;
    scrollbar-width: thin;
    padding-right: 0.25rem;
  }

  .body::-webkit-scrollbar {
    width: 8px;
  }

  .body::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 8px;
  }

  .body::-webkit-scrollbar-thumb {
    background: var(--color-muted-teal);
    border-radius: 8px;
  }
</style>

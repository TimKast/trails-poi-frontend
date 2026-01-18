<script lang="ts">
  let { images = [] } = $props();

  let currentIndex = $state(0);

  function next() {
    currentIndex = (currentIndex + 1) % images.length;
  }

  function previous() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
  }

  function goToSlide(index: number) {
    currentIndex = index;
  }
</script>

{#if images.length > 0}
  <div class="carousel">
    <button class="nav-button prev" onclick={previous} disabled={images.length <= 1}> ‹ </button>

    <div class="carousel-container">
      <img src={images[currentIndex]} alt="Trail {currentIndex + 1}" class="carousel-image" />
    </div>

    <button class="nav-button next" onclick={next} disabled={images.length <= 1}> › </button>

    {#if images.length > 1}
      <div class="dots">
        {#each images as _, index}
          <button
            class="dot"
            class:active={index === currentIndex}
            onclick={() => goToSlide(index)}
            aria-label="Go to image {index + 1}"
          ></button>
        {/each}
      </div>
    {/if}
  </div>
{:else}
  <div class="no-images">
    <p>No images available</p>
  </div>
{/if}

<style>
  .carousel {
    position: relative;
    width: 100%;
    max-width: 1200px;
    margin-bottom: 1rem;
  }

  .carousel-container {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    border-radius: 0.5rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .carousel-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .nav-button {
    position: absolute;
    top: 50%;
    background-color: rgba(255, 255, 255, 0.9);
    color: var(--color-dark-spruce);
    border: none;
    font-size: 3rem;
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10;
    transition: background-color 0.2s;
    padding: 0;
  }

  .nav-button:hover:not(:disabled) {
    background-color: var(--color-muted-teal);
    color: white;
  }

  .nav-button:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  .nav-button.prev {
    left: 1rem;
  }

  .nav-button.next {
    right: 1rem;
  }

  .dots {
    position: absolute;
    bottom: 1rem;
    left: 50%;
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 1rem;
  }

  .dot {
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
    background-color: var(--color-muted-teal);
    border: none;
    cursor: pointer;
    transition:
      background-color 0.2s,
      transform 0.2s;
    padding: 0;
  }

  .dot:hover {
    background-color: var(--color-dark-spruce);
    transform: scale(1.2);
  }

  .dot.active {
    background-color: var(--color-golden-earth);
    transform: scale(1.3);
  }

  .no-images {
    text-align: center;
    padding: 2rem;
    color: var(--color-muted-teal);
  }
</style>

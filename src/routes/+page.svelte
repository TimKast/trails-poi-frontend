<script lang="ts">
  import { loggedInUser } from "$lib/runes.svelte";
  import { goto } from "$app/navigation";
</script>

<div class="container">
  <header>
    <h1>Alpine Trails</h1>
    <p class="subtitle">Manage and explore trails and points of interest around you</p>
  </header>

  {#if loggedInUser.email}
    <section class="welcome">
      <p>Welcome back, <strong>{loggedInUser.email}</strong>!</p>
      <button class="btn" onclick={() => goto("/home")}> Start exploring! </button>
    </section>
  {:else}
    <section class="overview">
      <h2>About This Application</h2>
      <p>
        Trails & POI Explorer is your guide to discovering amazing hiking trails and points of
        interest in your area. Whether you're looking for a challenging mountain hike or a leisurely
        walk through nature, this app helps you find and explore the best outdoor destinations.
      </p>

      <h3>Features</h3>
      <ul>
        <li>Browse and explore hiking trails</li>
        <li>Discover points of interest along the way</li>
        <li>Interactive maps powered by OpenStreetMap</li>
      </ul>

      <div class="cta-buttons">
        <button class="btn" onclick={() => goto("/login")}> Log In </button>
        <button class="btn" onclick={() => goto("/signup")}> Create Account </button>
      </div>
    </section>
  {/if}

  <footer class="credits">
    <p>
      Map data © <a href="https://www.openstreetmap.org" target="_blank" rel="noopener">
        OpenStreetMap
      </a>
      contributors, licensed under the
      <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener"> ODbL </a>
    </p>
  </footer>
</div>

<style>
  .container {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem;
    font-family:
      -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  }

  header {
    text-align: center;
    margin-bottom: 3rem;
  }

  h1 {
    font-size: 2.5rem;
    margin: 0 0 0.5rem 0;
    color: var(--color-dark-spruce);
  }

  .subtitle {
    font-size: 1.1rem;
    color: #7f8c8d;
    margin: 0;
  }

  .welcome {
    text-align: center;
    padding: 2rem;
    background: #f8f9fa;
    border-radius: 8px;
    margin-bottom: 2rem;
    font-size: 1.1rem;
  }

  .overview {
    background: #f8f9fa;
    padding: 2rem;
    border-radius: 8px;
    margin-bottom: 2rem;
  }

  h2 {
    font-size: 1.8rem;
    color: #2c3e50;
    margin-top: 0;
  }

  h3 {
    font-size: 1.3rem;
    color: #34495e;
    margin-top: 1.5rem;
  }

  p {
    line-height: 1.6;
    color: #555;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    padding: 0.5rem 0 0.5rem 1.5rem;
    color: #555;
    position: relative;
  }

  li:before {
    content: "✓";
    position: absolute;
    left: 0;
    color: var(--color-dark-spruce);
    font-weight: bold;
  }

  .btn {
    background: var(--color-dark-spruce);
    color: #fff;
    border: none;
    padding: 0.75rem 1.5rem;
    margin: 0.5rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.3s ease;
  }

  .btn:hover {
    background: var(--color-muted-teal);
  }

  .credits {
    text-align: center;
    padding: 2rem;
    border-top: 1px solid #ecf0f1;
    margin-top: 2rem;
    color: #7f8c8d;
    font-size: 0.9rem;
  }

  .credits a {
    color: #3498db;
    text-decoration: none;
  }

  .credits a:hover {
    text-decoration: underline;
  }
</style>

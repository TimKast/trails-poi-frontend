<script lang="ts">
  import { loggedInUser } from "$lib/runes.svelte";
</script>

<nav class="navbar">
  <div class="navbar-container">
    <span class="navbar-brand">🏔️ Alpine Trails</span>

    <div class="navbar-menu">
      {#if loggedInUser.token}
        <a href="/home" class="nav-link">Home</a>
        <span class="nav-divider">|</span>
        <a href="/" class="nav-link">{loggedInUser.email}</a>
        <a href="/logout" class="nav-link logout-link">Logout</a>
      {/if}
    </div>
  </div>
</nav>

<style>
  .navbar {
    height: 6vh;
    background-color: var(--color-dark-spruce);
    padding: 1rem 2rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .navbar-container {
    max-width: 100vw;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .navbar-brand {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--color-lime-cream);
  }

  .navbar-menu {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .nav-link {
    color: var(--color-lime-cream);
    text-decoration: none;
    font-size: 1.1rem;
    font-weight: 500;
    transition: color 0.3s ease;
    padding: 0.5rem 0;
  }

  .nav-link:hover {
    color: var(--color-toasted-almond);
  }

  .logout-link {
    background-color: var(--color-lime-cream);
    color: var(--color-dark-spruce);
    padding: 0.5rem 1rem;
    border-radius: 4px;
    font-weight: 600;
  }

  .logout-link:hover {
    background-color: var(--color-golden-earth);
    color: var(--color-lime-cream);
  }

  .nav-divider {
    color: var(--color-muted-teal);
    opacity: 0.6;
  }

  @media (max-width: 600px) {
    .navbar {
      padding: 0.75rem 1rem;
    }

    .navbar-container {
      flex-direction: column;
      gap: 0.75rem;
    }

    .navbar-brand {
      font-size: 1.2rem;
    }

    .navbar-menu {
      gap: 1rem;
      width: 100%;
      justify-content: center;
      flex-wrap: wrap;
    }
  }
</style>

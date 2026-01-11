<script lang="ts">
  import favicon from "$lib/assets/favicon.svg";
  import "../app.css";
  import { loggedInUser } from "$lib/runes.svelte";
  export let data: any;
  if (data.session) {
    loggedInUser.email = data.session.name;
    loggedInUser.token = data.session.token;
  } else {
    loggedInUser.email = "";
    loggedInUser.token = "";
  }
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<div>
  {#if loggedInUser.token}
    <a data-sveltekit-preload-data="tap" class="navbar-item" href="/logout">
      Logout [{loggedInUser.email}]</a
    >
  {/if}
  <slot />
</div>

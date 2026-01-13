<script lang="ts">
  import favicon from "$lib/assets/favicon.svg";
  import Navbar from "$lib/components/Navbar.svelte";
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

<Navbar />
<slot />

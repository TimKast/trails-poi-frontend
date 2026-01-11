<script lang="ts">
  import { loggedInUser } from "$lib/runes.svelte";
</script>

<h1>Willkommen {loggedInUser.email}</h1>

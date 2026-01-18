<script lang="ts">
  import { goto } from "$app/navigation";
  import { browser } from "$app/environment";
  import { loggedInUser } from "$lib/runes.svelte";

  loggedInUser.email = "";
  loggedInUser.token = "";

  if (browser) goto("/login");
</script>

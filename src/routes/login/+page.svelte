<script lang="ts">
  import type { ActionData } from "./$types";
  import LoginForm from "./LoginForm.svelte";

  export let form: ActionData;
</script>

<section class="page">
  <h1>Alpine-Trails</h1>
  <LoginForm {form} />
</section>

<style>
  .page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    color: var(--color-dark-spruce);
  }
</style>

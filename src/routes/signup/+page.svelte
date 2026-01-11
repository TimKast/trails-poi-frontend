<script lang="ts">
  import type { ActionData } from "./$types";
  import SignupForm from "./SignupForm.svelte";

  export let form: ActionData;
</script>

<section class="page">
  <h1>Alpine-Trails - Sign Up</h1>
  <SignupForm {form} />
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

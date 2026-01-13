<script lang="ts">
  import type { ActionData } from "./$types";
  import CreateTrailForm from "./CreateTrailForm.svelte";

  export let form: ActionData;
</script>

<section class="page">
  <h1>Create Trail</h1>
  <CreateTrailForm {form} />
</section>

<style>
  .page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem 0;
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    color: var(--color-dark-spruce);
  }
</style>

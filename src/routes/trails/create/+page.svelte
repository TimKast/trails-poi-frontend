<script lang="ts">
  import CreateTrailForm from "./CreateTrailForm.svelte";

  let { form } = $props();
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

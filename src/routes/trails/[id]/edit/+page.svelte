<script lang="ts">
  import UpdateTrailForm from "./UpdateTrailForm.svelte";

  let { data } = $props();
</script>

<section class="page">
  <h1>Update Trail</h1>
  <UpdateTrailForm {data} />
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

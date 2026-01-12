<script lang="ts">
  export let data: any;
  console.log("Trail page data: ", data);
</script>

<section class="page">
  <div class="overview">
    <h1>{data.trail?.name}</h1>
    <p>{data.trail?.description}</p>
  </div>
</section>

<style>
  .page {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
  }

  .overview {
    max-width: 800px;
    text-align: center;
  }
</style>

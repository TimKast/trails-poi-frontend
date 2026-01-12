<script lang="ts">
  export let data: any;
  console.log("POI page data: ", data);
</script>

<section class="page">
  <div class="image-container">
    {#each data.poi?.images as image}
      <img src={image} alt="Point of Interest" />
    {/each}
  </div>
  <div class="overview">
    <h1>{data.poi?.name}</h1>
    <p>{data.poi?.description}</p>
  </div>
</section>

<style>
  .page {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
  }

  .image-container {
    display: flex;
    overflow-x: auto;
    margin-bottom: 1rem;

    img {
      height: 300px;
    }
  }

  .overview {
    max-width: 800px;
    text-align: center;
  }
</style>

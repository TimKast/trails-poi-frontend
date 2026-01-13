<script lang="ts">
  import LeafletMap from "$lib/components/LeafletMap.svelte";
  import { onMount } from "svelte";

  export let data: any;
  let map: LeafletMap;

  onMount(async () => {
    await map.addTrailMarker(data.trail);
  });
</script>

<section class="page">
  <div class="row">
    {#each data.trail?.images as image}
      <img src={image} alt="Trail" />
    {/each}
  </div>
  <div class="row">
    <div class="overview">
      <h1>{data.trail?.name}</h1>
      <p>{data.trail?.description}</p>
      <p>Lat: {data.trail?.location.lat}</p>
      <p>Lng: {data.trail?.location.lon}</p>
    </div>
    <LeafletMap height={50} width={50} location={data.trail?.location} bind:this={map} />
  </div>
</section>

<style>
  .page {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
  }

  img {
    width: 35rem;
    height: auto;
    margin: 0.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .row {
    display: flex;
    flex-direction: row;
    height: 50%;
    width: 100%;
    justify-content: center;
  }

  .overview {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    width: 100%;
  }
</style>

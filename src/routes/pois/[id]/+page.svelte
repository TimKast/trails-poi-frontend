<script lang="ts">
  import LeafletMap from "$lib/components/LeafletMap.svelte";
  import { onMount } from "svelte";

  export let data: any;
  let map: LeafletMap;

  onMount(async () => {
    await map.addPoiMarker(data.poi);
  });
</script>

<section class="page">
  <div class="column">
    <div class="overview">
      <h1>{data.poi?.name}</h1>
      <p>{data.poi?.description}</p>
      <p>Lat: {data.poi?.location.coordinates[1]}</p>
      <p>Lng: {data.poi?.location.coordinates[0]}</p>
    </div>
    <LeafletMap
      height={48}
      width={50}
      location={{ lat: data.poi?.location.coordinates[1], lon: data.poi?.location.coordinates[0] }}
      bind:this={map}
    />
  </div>
  <div class="column">
    <div class="image-container">
      {#each data.poi?.images as image}
        <img src={image} alt="Point of Interest" />
      {/each}
    </div>
  </div>
</section>

<style>
  .page {
    display: flex;
    flex-direction: row;
  }

  .column {
    display: flex;
    flex-direction: column;
    width: 50vw;
  }

  .overview {
    height: 40vh;
  }

  .image-container {
    display: flex;

    img {
      height: auto;
      width: 50vw;
    }
  }
</style>

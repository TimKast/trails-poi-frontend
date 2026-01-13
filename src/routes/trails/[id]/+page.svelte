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
  <div class="column">
    <div class="trail">
      <h1>{data.trail?.name}</h1>
      <p>{data.trail?.description}</p>
      <p>Lat: {data.trail?.location.lat}</p>
      <p>Lng: {data.trail?.location.lon}</p>
    </div>
  </div>
  <div class="column"></div>
  <LeafletMap height={50} location={data.trail?.location} bind:this={map} />
</section>

<style>
  .page {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 1rem;
  }

  .column {
    display: flex;
    flex-direction: column;
    width: 50%;
  }
</style>

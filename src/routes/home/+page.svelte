<script lang="ts">
  import LeafletMap from "$lib/components/LeafletMap.svelte";
  import { onMount } from "svelte";

  export let data: any;
  let map: LeafletMap;

  onMount(async () => {
    data.trails.forEach(async (trail: any) => {
      await map.addTrailMarker(trail);
    });
    data.pois.forEach(async (poi: any) => {
      await map.addPoiMarker(poi);
    });
  });
</script>

<section class="page">
  <h1>Welcome to Alpine-Trails</h1>
  <p>Explore the best trails and points of interest in the Alps!</p>
  <div class="content">
    <div class="map-container">
      <LeafletMap bind:this={map} />
    </div>
    <div class="list-container">
      <h2>Available Trails</h2>
      {#each data.trails as trail}
        <div class="trail-item">
          <h5>{trail.name}</h5>
          <p>{trail.description}</p>
          <a href={`/trails/${trail._id}`}>Learn more</a>
        </div>
      {/each}

      <h2>Points of Interest</h2>
      {#each data.pois as poi}
        <div class="poi-item">
          <h5>{poi.name}</h5>
          <p>{poi.description}</p>
          <a href={`/pois/${poi._id}`}>Learn more</a>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .page {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .content {
    width: 100%;
    display: flex;
    flex-direction: row;
  }
  .map-container {
    height: 100vh;
    width: 70%;
  }

  .list-container {
    width: 30%;
    padding: 1rem;
    box-sizing: border-box;
  }

  .trail-item,
  .poi-item {
    padding: 0.5rem 0;
    border-bottom: 1px solid #ccc;
  }
</style>

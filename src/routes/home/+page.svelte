<script lang="ts">
  import LeafletMap from "$lib/components/LeafletMap.svelte";
  import ScrollableContainer from "$lib/components/ScrollableContainer.svelte";
  import { onMount } from "svelte";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
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
  <div class="content">
    <div class="overview">
      <h1>Explorer</h1>
      <p>Find the best trails and points of interest in Bavaria!</p>
    </div>
    <div class="map">
      <div class="map-pane">
        <LeafletMap height={72} bind:this={map} />
      </div>
      <div class="lists">
        <ScrollableContainer title="Available Trails" maxHeight={28}>
          {#each data.trails as trail}
            <div class="list-item">
              <h5>{trail.name}</h5>
              <p>{trail.description}</p>
              <a href={`/trails/${trail._id}`}>Learn more</a>
            </div>
          {/each}
        </ScrollableContainer>
        <ScrollableContainer title="Points of Interest" maxHeight={28}>
          {#each data.pois as poi}
            <div class="list-item">
              <h5>{poi.name}</h5>
              <p>{poi.description}</p>
              <a href={`/pois/${poi._id}`}>Learn more</a>
            </div>
          {/each}
        </ScrollableContainer>
      </div>
    </div>
  </div>
</section>

<style>
  .page {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    overflow-x: hidden;
  }
  .content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    height: calc(100vh - 5rem);
    margin: 0 auto;
    box-sizing: border-box;
  }

  .overview {
    text-align: center;
  }

  .overview h1 {
    font-size: 2.3rem;
    color: var(--color-dark-spruce);
  }

  .map {
    display: flex;
    flex-direction: row;
    flex: 1;
    min-height: 0;
    gap: 1rem;
  }

  .map-pane {
    flex: 1 1 0;
    min-width: 0;
    display: flex;
  }

  .map-pane :global(.leaflet-container) {
    width: 100%;
    height: 100%;
  }

  .lists {
    flex: 0 0 32%;
    max-width: 360px;
    min-width: 240px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    box-sizing: border-box;
  }

  .list-item {
    padding: 0.5rem 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  .list-item a {
    color: var(--color-dark-spruce);
    text-decoration: none;
    font-weight: 600;
  }

  .list-item a:hover {
    color: var(--color-muted-teal);
    text-decoration: underline;
  }

  @media (max-width: 960px) {
    .content {
      height: auto;
      width: min(100%, 720px);
    }

    .map {
      flex-direction: column;
    }

    .map-pane {
      min-height: 360px;
    }

    .lists {
      flex: 1 1 auto;
      max-width: 100%;
      min-width: 0;
    }
  }
</style>

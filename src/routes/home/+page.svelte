<script lang="ts">
  import LeafletMap from "$lib/components/LeafletMap.svelte";
  import { onMount } from "svelte";

  export let data: any;
  let map: LeafletMap;

  onMount(async () => {
    data.trails.forEach(async (trail: any) => {
      await map.addMarker(
        trail.location.lat,
        trail.location.lon,
        `<b>${trail.name}</b><br/>${trail.description}`
      );
    });
  });
</script>

<LeafletMap bind:this={map} />

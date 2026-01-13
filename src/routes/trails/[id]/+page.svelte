<script lang="ts">
  import { goto } from "$app/navigation";
  import LeafletMap from "$lib/components/LeafletMap.svelte";
  import { trailService } from "$lib/services/trail-service";
  import { onMount } from "svelte";

  export let data: any;
  let map: LeafletMap;
  console.log("Trail data:", data);
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
      <div>
        <h1>{data.trail?.name}</h1>
        <p>{data.trail?.description}</p>
        <p>Lat: {data.trail?.location.lat}</p>
        <p>Lng: {data.trail?.location.lon}</p>
      </div>
      <div class="actions">
        <button type="button" onclick={() => alert("Map integration coming soon!")}>
          Add images (Coming Soon)
        </button>
        <button
          type="button"
          onclick={() =>
            trailService
              .deleteTrail(data.trail?._id, data.session.token)
              .then(() => {
                alert("Trail deleted successfully.");
                goto("/home");
              })
              .catch((error) => {
                alert("Error deleting trail: " + error.message);
              })}
        >
          Delete
        </button>
      </div>
    </div>
    <LeafletMap height={50} width={100} location={data.trail?.location} bind:this={map} />
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
    justify-content: space-between;
    padding: 1rem;
    width: 100%;
  }
</style>

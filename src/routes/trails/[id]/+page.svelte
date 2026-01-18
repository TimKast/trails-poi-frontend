<script lang="ts">
  import { goto } from "$app/navigation";
  import ElevationProfile from "$lib/components/ElevationProfile.svelte";
  import ImageCarousel from "$lib/components/ImageCarousel.svelte";
  import LeafletMap from "$lib/components/LeafletMap.svelte";
  import { trailService } from "$lib/services/trail-service";
  import { onMount } from "svelte";
  import { CldUploadWidget } from "svelte-cloudinary";

  let { data } = $props();
  let map: LeafletMap;
  onMount(async () => {
    await map.addTrailMarker(data.trail!);
    await map.drawTrailPath(data.trail!);
  });

  function onSuccess(result: any) {
    if (result.event === "success") {
      trailService.addImages(data.trail!._id, [result.info.secure_url], data.session!.token);
    } else if (result.event === "error") {
      alert("Error uploading image: " + result.error.message);
    }
  }
</script>

<section class="page">
  <div class="row">
    <ImageCarousel images={data.trail?.images} />
  </div>
  <div class="row">
    <div class="column">
      <div class="overview">
        <div>
          <h1>{data.trail?.name}</h1>
          <p>{data.trail?.description}</p>
          <h4>Startingpoint:</h4>
          <p>Lat: {data.trail?.geometry.coordinates[0][1]}</p>
          <p>Lng: {data.trail?.geometry.coordinates[0][0]}</p>
        </div>
        <div class="actions">
          <CldUploadWidget uploadPreset="unsigned_upload" let:open let:isLoading {onSuccess}>
            <button onclick={() => open()} disabled={isLoading}> Add Image </button>
          </CldUploadWidget>
          <button onclick={() => goto(`/trails/${data.trail!._id}/edit`)}>Edit</button>
          <button
            type="button"
            onclick={() =>
              trailService
                .deleteTrail(data.trail!._id, data.session!.token)
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
      <ElevationProfile trail={data.trail} />
    </div>
    <LeafletMap
      height={50}
      width={100}
      zoom={14}
      location={{
        lat: data.trail?.geometry.coordinates[0][1],
        lon: data.trail?.geometry.coordinates[0][0]
      }}
      bind:this={map}
    />
  </div>
</section>

<style>
  .page {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
  }

  .row {
    display: flex;
    flex-direction: row;
    height: 50%;
    width: 100%;
    justify-content: center;
  }

  .column {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-right: 1rem;
  }

  .overview {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1rem;
    width: 100%;
  }
</style>

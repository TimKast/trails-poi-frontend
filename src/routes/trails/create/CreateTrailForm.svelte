<script lang="ts">
  import { CldUploadWidget } from "svelte-cloudinary";

  let { form } = $props();
  let uploadedImages = $state<string[]>([]);
  let coordinates = $state([["", "", ""]]);

  function onSuccess(result: any) {
    if (result.event === "success") {
      uploadedImages.push(result.info.secure_url);
    } else if (result.event === "error") {
      alert("Error uploading image: " + result.error.message);
    }
  }

  function addCoordinate() {
    coordinates.push(["", "", ""]);
  }

  function removeCoordinate(id: number) {
    coordinates = coordinates.filter((c, index) => index !== id);
  }
</script>

<form method="POST" action="?/create">
  <div class="content">
    <div>
      <label for="name">Trail Name</label>
      <input
        id="name"
        type="text"
        name="name"
        placeholder="Enter trail name"
        value={form?.name ?? ""}
        required
      />
    </div>
    <div>
      <label for="description">Description</label>
      <textarea
        id="description"
        name="description"
        placeholder="Describe the trail..."
        value={form?.description ?? ""}
        rows="4"
        required
      ></textarea>
    </div>

    <div class="coordinates-section">
      <h3>Trail Coordinates</h3>
      <button type="button" onclick={addCoordinate} class="add-btn"> + Add Coordinate </button>

      {#if coordinates.length > 0}
        <div class="coordinates-list">
          {#each coordinates as coord, i}
            <div class="coordinate-item">
              <div class="coord-inputs">
                <div>
                  <label for="lat-{i}">Latitude</label>
                  <input
                    id="lat-{i}"
                    type="number"
                    bind:value={coord[1]}
                    placeholder="e.g. 47.5"
                    step="0.00001"
                    max="90"
                    min="-90"
                    required
                  />
                </div>
                <div>
                  <label for="lon-{i}">Longitude</label>
                  <input
                    id="lon-{i}"
                    type="number"
                    bind:value={coord[0]}
                    placeholder="e.g. 11.5"
                    step="0.00001"
                    max="180"
                    min="-180"
                    required
                  />
                </div>
                <div>
                  <label for="elev-{i}">Elevation (m)</label>
                  <input
                    id="elev-{i}"
                    type="number"
                    bind:value={coord[2]}
                    placeholder="Optional"
                    step="1"
                    max="9000"
                    min="-100"
                  />
                </div>
              </div>
              <button type="button" onclick={() => removeCoordinate(i)} class="remove-btn">
                Remove
              </button>
            </div>
          {/each}
        </div>
      {/if}

      {#each coordinates as coord}
        <input
          type="hidden"
          name="coordinates"
          value={JSON.stringify([coord[0], coord[1], coord[2]])}
        />
      {/each}
    </div>

    <div class="image-upload">
      <CldUploadWidget uploadPreset="unsigned_upload" let:open let:isLoading {onSuccess}>
        <button type="button" onclick={() => open()} disabled={isLoading}> Add Image </button>
      </CldUploadWidget>

      <p>
        Images uploaded: {uploadedImages.length}
      </p>
      {#each uploadedImages as imgUrl}
        <input type="hidden" name="images" value={imgUrl} />
      {/each}
    </div>
  </div>

  {#if form?.error}
    <div class="error">
      {form.error}
    </div>
  {/if}

  <div class="actions">
    <button type="submit">Create Trail</button>
    <a class="cancel" href="/home">Cancel</a>
  </div>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 60vw;
    padding: 2rem;
    border: 1px solid var(--color-muted-teal);
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .image-upload {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border: 1px solid var(--color-muted-teal);
    padding: 1rem;
    border-radius: 4px;
    margin-top: 1rem;
  }

  .coordinates-section {
    margin-top: 1.5rem;
    padding: 1rem;
    border: 1px solid var(--color-muted-teal);
    border-radius: 4px;
  }

  .coordinates-section h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: var(--color-dark-spruce);
    font-size: 1.1rem;
  }

  .add-btn {
    padding: 0.5rem 1rem;
    margin-bottom: 1rem;
    font-weight: 600;
  }

  .coordinates-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .coordinate-item {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    border-radius: 4px;
    align-items: flex-end;
  }

  .coord-inputs {
    display: flex;
    gap: 1rem;
    flex: 1;
  }

  .coord-inputs div {
    flex: 1;
    min-width: 120px;
  }

  label {
    display: block;
    font-weight: 600;
    color: var(--color-dark-spruce);
    margin-bottom: 0.25rem;
    font-size: 0.9rem;
  }

  .coord-inputs input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-family: inherit;
  }

  .remove-btn {
    padding: 0.5rem 1rem;
    background-color: #f0f0f0;
    color: #d32f2f;
    border: 1px solid #d32f2f;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 600;
    white-space: nowrap;
  }

  .remove-btn:hover {
    background-color: #fde;
  }

  .actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.5rem;
  }

  label {
    font-weight: 600;
    color: var(--color-dark-spruce);
  }

  input,
  textarea {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-family: inherit;
    box-sizing: border-box;
  }

  textarea {
    resize: vertical;
  }

  input:focus,
  textarea:focus {
    outline: none;
    border-color: var(--color-dark-spruce);
  }

  .cancel {
    text-decoration: none;
    color: var(--color-dark-spruce);
    border: 1px solid var(--color-dark-spruce);
    padding: 0.5rem 1rem;
    margin-right: 0.25rem;
    border-radius: 4px;
  }

  .cancel:hover {
    background-color: var(--color-muted-teal);
    color: #fff;
  }

  .error {
    margin-top: 0.5rem;
    padding: 0.75rem;
    background-color: #fee;
    border: 1px solid #fcc;
    border-radius: 4px;
    color: #c33;
  }
</style>

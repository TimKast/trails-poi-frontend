<script lang="ts">
  import { CldUploadWidget } from "svelte-cloudinary";

  let { form } = $props();
  let uploadedImages = $state<string[]>([]);

  function onSuccess(result: any) {
    if (result.event === "success") {
      uploadedImages.push(result.info.secure_url);
    } else if (result.event === "error") {
      alert("Error uploading image: " + result.error.message);
    }
  }
</script>

<form method="POST" action="?/create">
  <div class="content">
    <div class="column-60">
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
    </div>

    <div class="column-40">
      <div class="location">
        <div>
          <label for="lat">Latitude</label>
          <input
            id="lat"
            type="number"
            name="lat"
            placeholder="e.g. 47.5"
            value={form?.lat ?? ""}
            step="0.00001"
            required
          />
        </div>

        <div>
          <label for="lon">Longitude</label>
          <input
            id="lon"
            type="number"
            name="lon"
            placeholder="e.g. 11.5"
            value={form?.lon ?? ""}
            step="0.00001"
            required
          />
        </div>
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
    flex-direction: row;
    gap: 1.5rem;
  }

  .column-60 {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 60%;
    margin-bottom: 1rem;
    gap: 1rem;
  }

  .column-40 {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 40%;
    margin-bottom: 1rem;
  }
  .image-upload {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 1rem;
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

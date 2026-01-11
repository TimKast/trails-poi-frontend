<script lang="ts">
  import type { ActionData } from "./$types";

  export let form: ActionData;
</script>

<form method="POST" action="?/login">
  <label for="email">Email</label>
  <div>
    <input
      id="email"
      type="email"
      name="email"
      placeholder="Email address"
      value={form?.email ?? ""}
      required
    />
  </div>

  <label for="password">Password</label>
  <div>
    <input id="password" type="password" name="password" placeholder="Password" required />
  </div>

  <div>
    <button type="submit">Sign in</button>
  </div>

  {#if form?.error}
    <div class="error">
      {form.error}
    </div>
  {/if}
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 300px;
    padding: 2rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
  }

  label {
    font-weight: bold;
  }

  input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    padding: 0.75rem;
    background-color: var(--color-dark-spruce);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: var(--color-muted-teal);
  }

  .error {
    color: var(--color-dark-spruce);
    font-weight: bold;
  }
</style>

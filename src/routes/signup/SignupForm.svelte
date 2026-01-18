<script lang="ts">
  import type { ActionData } from "./$types";

  export let form: ActionData;
</script>

<form method="POST" action="?/signup">
  <label for="email">Email</label>
  <div>
    <input id="email" type="email" name="email" placeholder="Email address" required />
  </div>

  <label for="password">Password</label>
  <div>
    <input id="password" type="password" name="password" placeholder="Password" required />
  </div>

  <div class="actions">
    <button type="submit">Sign up</button>
    <a href="/login">Already have an account? Log in here.</a>
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
    width: 400px;
    padding: 2rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
  }

  .actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
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

  input:focus {
    outline: none;
    border-color: var(--color-dark-spruce);
  }

  button {
    padding: 0.75rem;
    background-color: var(--color-dark-spruce);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover,
  button:focus {
    outline: none;
    background-color: var(--color-muted-teal);
  }

  a {
    color: var(--color-dark-spruce);
    text-decoration: none;
  }

  a:hover,
  a:focus {
    outline: none;
    color: var(--color-muted-teal);
    text-decoration: underline;
  }

  .error {
    color: var(--color-dark-spruce);
    font-weight: bold;
  }
</style>

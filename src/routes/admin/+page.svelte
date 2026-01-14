<script lang="ts">
  import { invalidate, invalidateAll } from "$app/navigation";
  import ScrollableContainer from "$lib/components/ScrollableContainer.svelte";
  import { userService } from "$lib/services/user-service.js";

  let { data } = $props();
</script>

<section class="page">
  <div class="overview">
    <h1>Admin Dashboard</h1>
    <p>Welcome to the admin dashboard. Here you can manage the application.</p>
  </div>
  <div class="user-list">
    <ScrollableContainer title="User Actions" maxHeight={35}>
      {#each data.users as user}
        <div class="user-item">
          <div class="attribute">User ID: {user._id}</div>
          <div class="attribute">Email: {user.email}</div>
          <div class="attribute">Role: {user.role}</div>
          <div class="actions">
            <button
              type="button"
              onclick={() =>
                userService
                  .makeAdmin(user._id, data.session!.token)
                  .then(() => {
                    invalidateAll();
                    alert(`User ${user.email} promoted to admin.`);
                  })
                  .catch((error) => {
                    alert("Error promoting user: " + error.message);
                  })}
            >
              Promote to Admin
            </button>
            <button
              type="button"
              onclick={() =>
                userService
                  .deleteUser(user._id, data.session!.token)
                  .then(() => {
                    invalidateAll();
                    alert(`User ${user.email} deleted.`);
                  })
                  .catch((error) => {
                    alert("Error deleting user: " + error.message);
                  })}
            >
              Delete User
            </button>
          </div>
        </div>
      {/each}
    </ScrollableContainer>
  </div>
</section>

<style>
  .page {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 0;
    width: 100%;
  }

  .overview {
    text-align: center;
    margin-bottom: 2rem;
  }

  .overview h1 {
    font-size: 2.5rem;
    color: var(--color-dark-spruce);
  }

  .user-list {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .user-item {
    height: 80px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--color-muted-teal);
  }
  .attribute {
    width: 22%;
  }

  .actions {
    display: flex;
    flex-direction: row-reverse;
    gap: 0.5rem;
  }
</style>

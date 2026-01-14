<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import ScrollableContainer from "$lib/components/ScrollableContainer.svelte";
  import { userService } from "$lib/services/user-service.js";
  import { onMount } from "svelte";
  import Chart from "svelte-frappe-charts";

  let mounted = $state(false);
  let { data } = $props();

  const chartData = {
    labels: ["User", "Admin"],
    datasets: [
      {
        values: [
          data.users.filter((user) => user.role === "user").length,
          data.users.filter((user) => user.role === "admin").length
        ]
      }
    ]
  };
  onMount(() => {
    mounted = true;
  });
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
  {#if mounted}
    <div class="charts">
      <div class="chart-container">
        <Chart data={chartData} type="pie" />
      </div>
    </div>
  {/if}
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

  .charts {
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 100%;
    width: 100%;
  }
  .chart-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 460px;
    height: 460px;
    border: 1px solid var(--color-muted-teal);
    margin: 1rem;
    margin-bottom: 0;
  }
</style>

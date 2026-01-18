<script lang="ts">
  import { onMount } from "svelte";
  import { Chart, registerables } from "chart.js";
  import type { Trail } from "$lib/types/object-types";

  Chart.register(...registerables);

  let canvasEl: HTMLCanvasElement;

  let { trail } = $props();

  function haversine([lon1, lat1]: [number, number], [lon2, lat2]: [number, number]): number {
    const R = 6371; // radius of earth in km
    const toRad = (x: number) => (x * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  function getTrailProfile(trail: Trail) {
    const coords = trail.geometry.coordinates;
    let distance = 0;
    const distances: string[] = ["0 km"];
    const elevations: number[] = [coords[0][2] ?? 0];

    for (let i = 1; i < coords.length; i++) {
      distance += haversine([coords[i - 1][0], coords[i - 1][1]], [coords[i][0], coords[i][1]]);
      distances.push(distance.toFixed(2) + " km");
      elevations.push(coords[i][2] ?? 0);
    }
    return { distances, elevations };
  }

  function weightedMovingAverage(values: number[]): number[] {
    const weights = [1, 2, 3, 2, 1];
    const half = Math.floor(weights.length / 2);
    const weightSum = weights.reduce((a, b) => a + b, 0);

    return values.map((_, i) => {
      let sum = 0;

      for (let j = -half; j <= half; j++) {
        let idx = i + j;

        if (idx < 0) idx = 0;
        if (idx >= values.length) idx = values.length - 1;

        sum += values[idx] * weights[j + half];
      }

      return Math.round(sum / weightSum);
    });
  }

  // svelte-ignore state_referenced_locally
  const { distances, elevations } = getTrailProfile(trail);

  //I decided to use the actual elevation data instead of the smoothed one for better accuracy
  // const smoothedElevations = weightedMovingAverage(elevations);

  let chart: Chart;

  onMount(() => {
    const styles = getComputedStyle(document.documentElement);
    const toastedAlmond = styles.getPropertyValue("--color-toasted-almond").trim();

    chart = new Chart(canvasEl, {
      type: "line",
      data: {
        labels: distances,
        datasets: [
          {
            label: "Height (m)",
            data: elevations,
            borderColor: toastedAlmond,
            backgroundColor: "rgba(255, 218, 185, 0.2)",
            fill: true,
            tension: 0.3
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function (ctx) {
                return ctx.parsed.y + " m";
              }
            }
          }
        },
        scales: {
          y: {
            title: { display: true, text: "Height (m)" }
          },
          x: {
            title: { display: true, text: "Distance (km)" }
          }
        }
      }
    });
  });
</script>

<div>
  <h3>Elevation Profile</h3>
  <canvas bind:this={canvasEl}></canvas>
</div>

<style>
  canvas {
    max-width: 100%;
    max-height: 250px;
    height: auto;
  }
</style>

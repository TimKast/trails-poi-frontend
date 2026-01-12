<script lang="ts">
  import "leaflet/dist/leaflet.css";
  import { onMount } from "svelte";
  import type { Control, Map as LeafletMap } from "leaflet";

  let { height = 80 } = $props();
  let id = "home-map-id";
  let location = { lat: 48, lng: 11 };
  let zoom = 8;
  let minZoom = 6;
  let activeLayer = "Terrain";

  let imap: LeafletMap;
  let control: Control.Layers;
  let overlays: Control.LayersObject = {};
  let baseLayers: any;
  let L: any;

  onMount(async () => {
    const leaflet = await import("leaflet");
    L = leaflet.default;
    baseLayers = {
      Terrain: leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 17,
        attribution:
          'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
      }),
      Topology: leaflet.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
        maxZoom: 17,
        attribution: "© OpenStreetMap contributors, © OpenTopoMap"
      })
    };
    let defaultLayer = baseLayers[activeLayer];
    imap = leaflet.map(id, {
      center: [location.lat, location.lng],
      zoom: zoom,
      minZoom: minZoom,
      layers: [defaultLayer]
    });
    control = leaflet.control.layers(baseLayers, overlays).addTo(imap);
  });

  export async function addMarker(lat: number, lon: number, popupText?: string) {
    const leaflet = await import("leaflet");
    const L = leaflet.default;
    const marker = L.marker([lat, lon]).addTo(imap);
    if (popupText) {
      marker.bindTooltip(popupText);
    }
  }
</script>

<div {id} style="height: {height}vh"></div>

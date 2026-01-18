<script lang="ts">
  import { onMount } from "svelte";
  import type { Control, Layer, LayerGroup, Map as LeafletMap } from "leaflet";
  import type { Poi, Trail } from "$lib/types/object-types";

  let id = "home-map-id";
  let { height = 100, width = 100, location = { lat: 48, lon: 11 }, zoom = 9 } = $props();
  let minZoom = 6;
  let activeLayer = "Terrain";

  let map: LeafletMap;
  let control: Control.Layers;
  let overlays: Control.LayersObject = {};
  let baseLayers: any;
  let peakLayer: LayerGroup;
  let hutLayer: LayerGroup;
  let lakeLayer: LayerGroup;
  let trailLayer: LayerGroup;
  let L: any;

  onMount(async () => {
    const leaflet = await import("leaflet");
    L = leaflet.default;

    baseLayers = {
      Terrain: leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 20,
        attribution:
          'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
      }),
      Topology: leaflet.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap contributors, © OpenTopoMap"
      })
    };
    let defaultLayer = baseLayers[activeLayer];

    map = L.map(id, {
      center: [location.lat, location.lon],
      zoom: zoom,
      minZoom: minZoom,
      layers: [defaultLayer]
    });
    control = leaflet.control.layers(baseLayers, overlays).addTo(map);
  });

  export async function addTrailMarker(trail: Trail) {
    const leaflet = await import("leaflet");
    const L = leaflet.default;
    if (!trailLayer) {
      trailLayer = L.layerGroup().addTo(map);
      control.addOverlay(trailLayer, "Trails");
    }
    const marker = L.marker([
      trail.geometry.coordinates[0][1],
      trail.geometry.coordinates[0][0]
    ]).addTo(trailLayer);
    marker.bindTooltip(`<b>${trail.name}</b>`);
  }

  export async function drawTrailPath(trail: Trail) {
    const leaflet = await import("leaflet");
    const L = leaflet.default;

    L.geoJSON(trail.geometry).addTo(map);
  }

  export async function addPoiMarker(poi: Poi) {
    const leaflet = await import("leaflet");
    const L = leaflet.default;

    let layer;
    switch (poi.category) {
      case "peak":
        if (!peakLayer) {
          peakLayer = L.layerGroup().addTo(map);
          control.addOverlay(peakLayer, "Peaks");
        }
        layer = peakLayer;
        break;
      case "hut":
        if (!hutLayer) {
          hutLayer = L.layerGroup().addTo(map);
          control.addOverlay(hutLayer, "Huts");
        }
        layer = hutLayer;
        break;
      case "lake":
        if (!lakeLayer) {
          lakeLayer = L.layerGroup().addTo(map);
          control.addOverlay(lakeLayer, "Lakes");
        }
        layer = lakeLayer;
        break;
      default:
        return;
    }
    const marker = L.marker([poi.location.coordinates[1], poi.location.coordinates[0]]).addTo(
      layer!
    );
    const popupText = `<b>${poi.name}</b>`;
    marker.bindTooltip(popupText);

    const iconElement = marker.getElement();
    if (iconElement) {
      iconElement.style.filter = "hue-rotate(120deg)";
    }
  }
</script>

<div {id} style="height: {height}vh; width: {width}vw;"></div>

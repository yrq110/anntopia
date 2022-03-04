<template>
  <div>
    <canvas-wrapper :points="points" :polygons="polygons" :circles="circles" />
    <div>{{ description }}</div>
  </div>
</template>

<script setup lang="ts">
import {
  Chan,
  Shoelace,
  VoronoiDiagram,
  LargestEmptyCircle,
} from "@anntopia/geometry";
import { uniform } from "../utils";

const props = defineProps({
  type: {
    type: String,
    required: false,
  },
});
const { type } = props;

let points = uniform(40);
let polygons;
let circles;
let description = "";

let line;
switch (type) {
  case "VoronoiDiagram": {
    let edges = VoronoiDiagram(points);
    polygons = edges.map((edge) => edge.flat());
    break;
  }
  case "LargestEmptyCircle": {
    const circle = LargestEmptyCircle(points);
    circles = [circle];
    break;
  }
  case "Shoelace": {
    const polygon = Chan(points);
    const area = Shoelace(polygon);
    polygons = [polygon]
    description = `Polygon area: ${area}`;
    break;
  }
  default:
    break;
}
</script>

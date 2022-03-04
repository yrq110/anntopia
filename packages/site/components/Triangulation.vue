<template>
  <div>
    <canvas-wrapper :points="points" :polygons="polys" />
  </div>
</template>

<script setup lang="ts">
import {
  Chan,
  DelaunayTriangulation,
  MinWeightTriangulation,
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
let polys;

switch (type) {
  case "DelaunayTriangulation": {
    const triangles = DelaunayTriangulation(points);
    const vertices: number[][] = [];
    triangles.forEach((triangle) => {
      vertices.push(triangle.flat());
    });
    polys = vertices;
    break;
  }
  case "MinWeightTriangulation": {
    const polygon = Chan(points)
    polys = MinWeightTriangulation(polygon)
    break;
  }
  default:
    break;
}
</script>

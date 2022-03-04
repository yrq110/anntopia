<template>
  <div>
    <canvas-wrapper :points="points" :polygons="polys" />
  </div>
</template>

<script setup lang="ts">
import { GrahamScan, JarvisMarch, Chan } from "@anntopia/geometry";
import { uniform } from "../utils";

const props = defineProps({
  type: {
    type: String,
    required: false,
  },
});
const { type } = props;

let points = uniform(40);
let poly;

switch (type) {
  case "GrahamScan": {
    poly= GrahamScan(points)
    break;
  }
  case "JarvisMarch": {
    poly = JarvisMarch(points)
    break;
  }
  case "Chan": {
    poly = Chan(points)
    break;
  }
  default:
    break;
}
const polys = poly ? [poly] : [];
</script>

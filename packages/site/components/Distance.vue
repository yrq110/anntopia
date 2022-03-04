<template>
  <div>
    <canvas-wrapper :points="points" :lines="lines" />
    <div>{{ description }}</div>
  </div>
</template>

<script setup lang="ts">
import { ClosestPair, FarthestPair } from "@anntopia/geometry";
import { uniform } from "../utils";

const props = defineProps({
  type: {
    type: String,
    required: false,
  },
});
const { type } = props;

let points = uniform(10);
let lines;
let description = "";

let line
switch (type) {
  case "ClosestPair": {
    const { distance, begin, end } = ClosestPair(points);
    line = [...begin, ...end];
    description = `Closest pair points distance: ${distance}`;
    break;
  }
  case "FarthestPair": {
    const { distance, begin, end } = FarthestPair(points);
    line = [...begin, ...end];
    description = `Farthest pair points distance: ${distance}`;
    break;
  }
  default:
    break;
}
lines = line ? [line] : [];
</script>

<template>
  <div>
    <canvas-wrapper :points="points" :polygons="rects" />
  </div>
</template>

<script setup lang="ts">
import { AABB, MinAreaBox, MinPerimeterBox } from "@anntopia/geometry";
import { uniform } from "../utils";

const props = defineProps({
  type: {
    type: String,
    required: false,
  },
});
const { type } = props;

let points;
let rect;

switch (type) {
  case "AxisAlignedBoundingBox": {
    points = uniform(10);
    rect = AABB(points);
    break;
  }
  case "MinAreaBox": {
    points = uniform(10, 30, 30);
    rect = MinAreaBox(points);
    break;
  }
  case "MinPerimeterBox": {
    points = uniform(10, 30, 30);
    rect = MinPerimeterBox(points);
    break;
  }
  default:
    break;
}
const rects = rect ? [rect] : [];
</script>

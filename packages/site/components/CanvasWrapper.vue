<template>
  <canvas ref="canvasRef" class="canvas" width="520" height="320"></canvas>
</template>

<script setup lang="ts">
import { ICircle } from "@anntopia/geometry";
import { onMounted, PropType, ref } from "vue";
import {
  setBackgroundColor,
  drawLines,
  drawPoints,
  drawCircle,
} from "../utils";

const props = defineProps({
  points: {
    type: Array as PropType<Array<number>>,
    required: false,
  },
  lines: {
    type: Array as PropType<Array<Array<number>>>,
    required: false,
  },
  polygons: {
    type: Array as PropType<Array<Array<number>>>,
    required: false,
  },
  circles: {
    type: Array as PropType<Array<ICircle>>,
    required: false,
  },
});
const canvasRef = ref(null);
const render = () => {
  if (!canvasRef.value) return;
  const canvas = canvasRef.value as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  setBackgroundColor("#ffffff", ctx);

  const { points, lines, polygons, circles } = props;
  if (lines) {
    lines.forEach((line) => drawLines(line, ctx));
  }
  if (polygons) {
    polygons.forEach((polygon) => {
      polygon.push(polygon[0], polygon[1]);
      drawLines(polygon, ctx);
    });
  }
  if (circles) {
    circles.forEach((circle) => {
      const {
        r,
        center: [x, y],
      } = circle;
      drawCircle(x, y, r, ctx);
    });
  }
  if (points) drawPoints(points, ctx);
};

onMounted(() => {
  render();
});

defineExpose({ canvasRef })
</script>

<style>
.canvas {
  margin: 10px 0px;
  border: 1px lightgrey solid;
}
</style>
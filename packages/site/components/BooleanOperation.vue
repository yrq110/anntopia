<template>
  <div>
    <canvas-wrapper :points="points" :lines="lines" :polygons="polygons" />
    <div> {{ description }}</div>
  </div>
</template>

<script setup lang="ts">
import {
  LinesIntersection,
  LineSegmentsIntersection,
  isPointInPolygon,
  isPolygonsIntersection,
} from "@anntopia/geometry";

const props = defineProps({
  type: {
    type: String,
    required: false,
  },
});
const { type } = props;

let lines;
let polygons;
let points;
let description = '';

switch (type) {
  case "LinesIntersection": {
    const lineA = [20, 50, 50, 120];
    const lineB = [30, 300, 120, 30];
    const intersect = LinesIntersection(
      [lineA[0], lineA[1]],
      [lineA[2], lineA[3]],
      [lineB[0], lineB[1]],
      [lineB[2], lineB[3]]
    );
    lines = [lineA, lineB];
    description = `intersect: ${ intersect ? intersect.join(', ') : 'null' }`
    break;
  }
  case "LineSegmentsIntersection": {
    const lineA = [20, 50, 50, 120];
    const lineB = [30, 300, 120, 30];
    const intersect = LineSegmentsIntersection(
      [lineA[0], lineA[1]],
      [lineA[2], lineA[3]],
      [lineB[0], lineB[1]],
      [lineB[2], lineB[3]]
    );
    lines = [lineA, lineB];
    description = `intersect: ${ intersect ? intersect.join(', ') : 'null' }`
    break;
  }
  case "isPointInPolygon": {
    const point: any = [110, 90];
    const polygon = [100, 20, 30, 200, 180, 270];
    const isInPolygon = isPointInPolygon(point, polygon);
    polygons = [polygon]
    points = point
    description = `Point in polygon: ${isInPolygon}`
    break;
  }
  case "isPolygonsIntersection": {
    const polygonA = [50, 70, 200, 30, 100, 200];
    const polygonB = [100, 20, 30, 200, 180, 270];
    const isPolyonIntersection = isPolygonsIntersection(polygonA, polygonB);
    polygons = [polygonA, polygonB];
    description = `Polygon intersection: ${isPolyonIntersection}`
    break;
  }
  default:
    break;
}
</script>

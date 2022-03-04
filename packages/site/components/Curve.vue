<template>
  <div>
    <canvas-wrapper :points="dataPoints" :lines="lines" />
  </div>
</template>

<script setup lang="ts">
import {
  CubicSpline,
  CubicParameterSpline,
  HermiteSpline,
  CardinalSpline,
  BezierSpline,
  CatmullRomSpline,
  BSpline,
  NURBS,
  BoundaryCondition,
  createQuasiUniformKnots,
  createNonUniformKnots,
} from "@anntopia/geometry";

const props = defineProps({
  type: {
    type: String,
    required: false,
  },
});
const { type } = props;

let dataPoints = [50, 250, 200, 150, 100, 50, 250, 70, 400, 50, 450, 250];

let spline;

switch (type) {
  case "CubicSpline": {
    dataPoints = [50, 250, 100, 50, 200, 150, 250, 70, 380, 100, 450, 250];
    spline = new CubicSpline(dataPoints);
    spline.setConfig({
      boundary: BoundaryCondition.Clamped, // or 1
    });
    break;
  }
  case "CubicParameterSpline": {
    spline = new CubicParameterSpline(dataPoints);
    spline.setConfig({
      boundary: BoundaryCondition.NotAKnot,
    });
    break;
  }
  case "CatmullRomSpline": {
    spline = new CatmullRomSpline(dataPoints);
    spline.setConfig({ tension: 0.7, closed: true });
    spline.setStep(0.001);
    break;
  }
  case "HermiteSpline": {
    const derivatives = [100, 50, 0, -100, 200, 10, 0, 100, 100, 20, 0, -100];
    spline = new HermiteSpline(dataPoints);
    spline.setConfig({ derivatives });
    break;
  }
  case "CardinalSpline": {
    spline = new CardinalSpline(dataPoints);
    spline.setConfig({ tension: 0.2 });
    break;
  }
  case "BezierSpline": {
    spline = new BezierSpline(dataPoints);
    spline.setConfig({ tension: 0.7, closed: true });
    spline.setStep(0.001);
    break;
  }
  case "BSpline": {
    spline = new BSpline(dataPoints);
    spline.setStep(0.001);
    spline.setConfig({
      k: 4,
      knots: createQuasiUniformKnots({ points: dataPoints, k: 4 }),
    });
    break;
  }
  case "NURBS": {
    spline = new NURBS(dataPoints);
    spline.setStep(0.001);
    spline.setConfig({
      k: 4,
      knots: createNonUniformKnots({ points: dataPoints, k: 4 }),
    });
    spline.insertKnot(0.35);
    break;
  }
  default:
    break;
}
const line = spline?.getInterpolation();
const lines = line ? [line] : [];
</script>

# Overview


This package contains computing geometry algorithms and split into the following categories:

* [**Curve**](./curve.md) - multiple types of interpolating spline
* [**Bounding Box**](./bounding-box.md) - the minimum or smallest bounding or enclosing box
* [**Convex Hull**](./convex-hull.md) - the smallest convex set that contains target points 
* [**Triangulation**](./triangulation.md) - determining the location of a point by forming triangles to the point from known points
* [**Boolean Operation**](./boolean-operation.md) - a set of Boolean Operation on one or more sets of primitives
* [**Distance**](./distance.md) - min/max distance or path among points 
* [**Area**](./area.md) - get target area from point set or polygon

## Install

```shell
$ yarn add @anntopia/geometry
# or
$ npm install @anntopia/geometry
```

## Use

```js
import { Chan, BezierSpline } from '@anntopia/geometry'

const randomPoints = uniform(40) // [x0, y0, x1, y1, ...]
const polygon = Chan(randomPoints)

const dataPoints = [50, 250, 200, 150, 100, 50, 250, 70, 400, 50, 450, 250]
const spline = new BezierSpline(dataPoints, { tension: 0.3 }, 0.01)
let splinePoints = spline.getInterpolation()
spline.setConfig({ tension: 0.7 })
spline.setStep(0.005)
splinePoints = spline.getInterpolation()
```

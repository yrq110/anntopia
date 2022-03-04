---
sidebarDepth: 1
---
# Curve

## Overview

Contains these main types of interpolating spline:

* [Cubic Spline](#cubic-spline)
* [Hermite Spline](#hermite-spline)
* [Bezier Spline](#bezier-spline)
* [B Spline](#b-spline)

### Common Props

* **dataPoints** - The data points of spline

### Common Methods

* constructor(dataPoints: number[], config?: Partial<Config\>, step?: number)
* getInterpolation(forceUpdate: boolean = true)
* setConfig(config: Object) & getConfig()
* setStep(step: number) & getStep()

### Example

```ts
import { BezierSpline } from '@anntopia/geometry'
const dataPoints = [
  50, 250,
  200, 150,
  100, 50,
  250, 70,
  400, 50,
  450, 250,
]
const spline = new BezierSpline(dataPoints, { tension: 0.5 }, 0.01)
let points = spline.getInterpolation() // get interpolatin points
// spline.dataPoints: [50, 250, 200, 150, 100, 50, 250, 70, 400, 50, 450, 250]
// points: [50, 250, 52.67857360839844, 249.23570251464844, 55.333335876464844, 248.4666748046875, ...]
spline.setConfig({ tension: 0.7 }) // change config
spline.setStep(0.001) // change step
points = spline.getInterpolation() // get interpolating points with the new config and step
// points: [50, 250, 50.256561279296875, 249.97325134277344, 50.512908935546875, 249.94638061523438, ...]
```

## Cubic Spline

<Curve type="CubicSpline" id="23"/>

### Config

name | type | description 
--- | ---- | -----
boundary | `0 - natural; 1 - clamped; 2 - not-a-knot` | Boundary type. Default is `0`
derivatives | `[number, number]` | First derivatives of x in start and end points. Need to set this if the boundary type is 0(natural). Default is `[0, 0]`

## Cubic Parameter Spline

<Curve type="CubicParameterSpline" />

### Config

Same as the Config in [CubicSpline](#cubic-spline)

## Hermite Spline

<Curve type="HermiteSpline" />

### Config

name | type | description 
--- | ---- | -----
derivatives | number[] | First derivatives of x and y in every data points.

## Cardinal Spline

<Curve type="CardinalSpline" />

### Config

name | type | description 
--- | ---- | -----
vs | [number, number] | Virtual start point. Default position has the offset by [0.01,0.01] from the first data point.
ve | [number, number] | Virtual end point. Default position has the offset by [0.01,0.01] from the end data point.
tension | number | Tension value, range is `[0,1]`. Default is `0.1`.

## Bezier Spline


### Config

name | type | description 
--- | ---- | -----
tension | number | Tension value, range is `[0,1]`. Default is `0.5`.
closed | boolean | Closed curve. Default is `false`.

## CatmullRom Spline

<Curve type="CatmullRomSpline" />

## B Spline

<Curve type="BSpline" />

### Config

name | type | description
--- | ---- | -----
k | number | Degree of spline. Default is `3`
knots | number[] | Knot vectors. length = n + k + 1. Default is `an array of quasiUniform knots`.

### Method

* **insertKnot(t)**

  Insert knot and add new data point automatically.
  * **t** *number*

    knot value, range is `(0,1)`

### Knot Functions

Helper functions for creating knots of b-spline (includes NURBS)

type | function name | example
--- | --- | ---
Uniform | createUniformKnots(param) | [0, 0.2, 0.4, 0.6, 0.8, 1]
QuasiUniform | createQuasiUniformKnots(param) | [0, 0, 0, 1/3, 2/3, 1, 1, 1]
PiceceWise | createPiceceWiseKnots(param) | [0, 0, 0, 1/2, 1/2, 1, 1, 1]
NonUniform | createNonUniformKnots(param) | [0, 0, 0, 0.34, 0.35, 0.66, 1, 1, 1]

**param** `Object`
* **points** - `number[]`

  Data points array
* **k** - `number`

  Degree of spline

`knots length = n(points number) + k(degree of spline) + 1`

## NURBS

<Curve type="NURBS" />

### Config

name | type | description 
--- | ---- | -----
k | number | Same as the Config in [BSpine](#b-spline)
knots | number[] | Same as the Config in [BSpine](#b-spline)
w | number[] | Weight values. The length is the same as data points. Default is `all 1 element array`.

### Method

* **insertKnot(t)**

  Insert knot and add new data point and weight automatically.
  * **t** *number*

    knot value, range is `(0,1)`

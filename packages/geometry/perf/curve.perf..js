import { createRequire } from 'module'
import { uniform } from './util.js'
import {
  CubicSpline, CubicParameterSpline,
  HermiteSpline, CardinalSpline,
  BezierSpline,
  BSpline, NURBS,
} from '../dist/index.mjs'

const require = createRequire(import.meta.url)
const { Suite } = require('benchmark')

const suite = new Suite('convex-hull', { async: true })
const points = [50, 250, 100, 50, 200, 150, 250, 70, 380, 100, 450, 250]

const runner = (Ctor, dataPoints) => {
  const spline = new Ctor(dataPoints)
  spline.setStep(0.001)
  spline.getInterpolation()
}

/**
 * #eae1e3
 * CubicSpline x 26.37 ops/sec ±4.18% (49 runs sampled)
 * CubicParameterSpline x 10.07 ops/sec ±7.72% (31 runs sampled)
 * HermiteSpline x 1,963 ops/sec ±0.66% (93 runs sampled)
 * CardinalSpline x 2,238 ops/sec ±0.63% (93 runs sampled)
 * BezierSpline x 1,521 ops/sec ±0.55% (93 runs sampled)
 * BSpline x 1,177 ops/sec ±0.62% (93 runs sampled)
 * NURBS x 1,155 ops/sec ±0.81% (95 runs sampled)
 * The fastest is CardinalSpline
 * */
suite.add('CubicSpline', () => { runner(CubicSpline, points) })
  .add('CubicParameterSpline', () => { runner(CubicParameterSpline, points) })
  .add('HermiteSpline', () => { runner(HermiteSpline, points) })
  .add('CardinalSpline', () => { runner(CardinalSpline, points) })
  .add('BezierSpline', () => { runner(BezierSpline, points) })
  .add('BSpline', () => { runner(BSpline, points) })
  .add('NURBS', () => { runner(NURBS, points) })
  .on('cycle', (event) => {
    console.log(String(event.target))
  })
  .on('complete', () => {
    console.log(suite.filter('fastest').map('name'))
  })
  .run()

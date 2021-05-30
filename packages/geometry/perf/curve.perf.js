import { require } from './util.js'
import {
  CubicSpline, CubicParameterSpline,
  HermiteSpline, CardinalSpline,
  BezierSpline,
  CatmullRomSpline,
  BSpline, NURBS,
} from '../dist/index.mjs'

const { Suite } = require('benchmark')

const suite = new Suite('curve', { async: true })
const points = [50, 250, 100, 50, 200, 150, 250, 70, 380, 100, 450, 250]

const runner = (Ctor, dataPoints) => {
  const spline = new Ctor(dataPoints)
  spline.setStep(0.001)
  spline.getInterpolation()
}

/**
 * #757c06
 * CubicSpline x 26.54 ops/sec ±3.11% (48 runs sampled)
 * CubicParameterSpline x 9.66 ops/sec ±8.16% (30 runs sampled)
 * HermiteSpline x 1,940 ops/sec ±1.05% (87 runs sampled)
 * CardinalSpline x 2,268 ops/sec ±0.74% (96 runs sampled)
 * BezierSpline x 1,543 ops/sec ±0.84% (95 runs sampled)
 * CatmullRomSpline x 604 ops/sec ±0.70% (92 runs sampled)
 * BSpline x 1,244 ops/sec ±0.62% (94 runs sampled)
 * NURBS x 1,240 ops/sec ±0.61% (94 runs sampled)
 * The fastest is CardinalSpline
 * */
suite.add('CubicSpline', () => { runner(CubicSpline, points) })
  .add('CubicParameterSpline', () => { runner(CubicParameterSpline, points) })
  .add('HermiteSpline', () => { runner(HermiteSpline, points) })
  .add('CardinalSpline', () => { runner(CardinalSpline, points) })
  .add('BezierSpline', () => { runner(BezierSpline, points) })
  .add('CatmullRomSpline', () => { runner(CatmullRomSpline, points) })
  .add('BSpline', () => { runner(BSpline, points) })
  .add('NURBS', () => { runner(NURBS, points) })
  .on('cycle', (event) => {
    console.log(String(event.target))
  })
  .on('complete', () => {
    console.log(suite.filter('fastest').map('name'))
  })
  .run()

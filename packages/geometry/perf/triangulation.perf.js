import { require, uniform } from './util.js'
import { JarvisMarch, PolygonTriangulation, MinWeightTriangulation } from '../dist/index.mjs'

const { Suite } = require('benchmark')

const suite = new Suite('triangulation', { async: true })
const points = uniform(100)
const polygon = JarvisMarch(points)
/**
 * #eae1e3
 * PolygonTriangulation x 25,309 ops/sec ±0.98% (90 runs sampled)
 * MinWeightTriangulation x 46,528 ops/sec ±0.62% (94 runs sampled)
 * The fastest is MinWeightTriangulation
 * */
suite.add('PolygonTriangulation', () => { PolygonTriangulation(polygon) })
  .add('MinWeightTriangulation', () => { MinWeightTriangulation(polygon) })
  .on('cycle', (event) => {
    console.log(String(event.target))
  })
  .on('complete', () => {
    console.log(suite.filter('fastest').map('name'))
  })
  .run()

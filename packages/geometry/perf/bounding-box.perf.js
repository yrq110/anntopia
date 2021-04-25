import { require, uniform } from './util.js'
import { AABB, MinAreaBox, MinPerimeterBox } from '../dist/index.mjs'

const { Suite } = require('benchmark')

const suite = new Suite('bounding-box', { async: true })
const points = uniform(1000)

/**
 * #eae1e3
 * AxisAlignedBoundingBox x 174,334 ops/sec ±1.38% (92 runs sampled)
 * MinAreaBox x 49.34 ops/sec ±0.67% (64 runs sampled)
 * MinPerimeterBox x 49.40 ops/sec ±1.01% (64 runs sampled)
 * The fastest is AxisAlignedBoundingBox
 * */
suite.add('AxisAlignedBoundingBox', () => { AABB(points) })
  .add('MinAreaBox', () => { MinAreaBox(points) })
  .add('MinPerimeterBox', () => { MinPerimeterBox(points) })
  .on('cycle', (event) => {
    console.log(String(event.target))
  })
  .on('complete', () => {
    console.log(suite.filter('fastest').map('name'))
  })
  .run()

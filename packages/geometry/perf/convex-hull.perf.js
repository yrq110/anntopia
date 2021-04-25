import { require, uniform } from './util.js'
import { GrahamScan, JarvisMarch, Chan } from '../dist/index.mjs'

const { Suite } = require('benchmark')

const suite = new Suite('convex-hull', { async: true })
const points = uniform(100)
/**
 * #eae1e3
 * GrahamScan x 25,579 ops/sec ±0.86% (93 runs sampled)
 * JarvisMarch x 35,104 ops/sec ±0.99% (93 runs sampled)
 * Chan x 3,302 ops/sec ±0.90% (91 runs sampled)
 * The fastest is JarvisMarch
 * */
suite.add('GrahamScan', () => { GrahamScan(points) })
  .add('JarvisMarch', () => { JarvisMarch(points) })
  .add('Chan', () => { Chan(points) })
  .on('cycle', (event) => {
    console.log(String(event.target))
  })
  .on('complete', () => {
    console.log(suite.filter('fastest').map('name'))
  })
  .run()

import { require, uniform } from './util.js'
import { ClosestPair, FarthestPair } from '../dist/index.mjs'

const { Suite } = require('benchmark')

const suite = new Suite('distance', { async: true })
const points = uniform(1000)
/**
 * #eae1e3
 * ClosestPair x 1,756 ops/sec ±1.31% (90 runs sampled)
 * FarthestPair x 1,729 ops/sec ±0.92% (90 runs sampled)
 * */
suite.add('ClosestPair', () => { ClosestPair(points) })
  .add('FarthestPair', () => { FarthestPair(points) })
  .on('cycle', (event) => {
    console.log(String(event.target))
  })
  .on('complete', () => {
    console.log(suite.filter('fastest').map('name'))
  })
  .run()

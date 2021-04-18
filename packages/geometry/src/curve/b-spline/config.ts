import getKnots from './knots'
import { divide } from '../../util'

export type BSplineConfig = {
  k: number,
  knots: number[],
}

export const DefaultBSplineConfig = (points: number[]): BSplineConfig => {
  const k = 3
  return {
    k,
    knots: getKnots({ points, k }),
  }
}

export type NURBSConfig = BSplineConfig & {
  w: number[]
}

export const DefaultNURBSConfig = (points: number[]): NURBSConfig => {
  const k = 3
  return {
    k,
    knots: getKnots({ points, k }),
    w: new Array(points.length / 2).fill(1),
  }
}

export const BasisFunction = (knots: number[], t: number, i: number, k: number): number => {
  if (k === 0) {
    if (t >= knots[i] && t < knots[i + 1]) {
      return 1
    }
    return 0
  }
  if (k > 0) {
    const w1 = divide(t - knots[i], knots[i + k] - knots[i])
    const w2 = divide(knots[i + k + 1] - t, knots[i + k + 1] - knots[i + 1])
    const v1 = w1 * BasisFunction(knots, t, i, k - 1)
    const v2 = w2 * BasisFunction(knots, t, i + 1, k - 1)
    const v = v1 + v2
    return v
  }
  return 0
}

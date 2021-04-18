import { createPointAccessor } from '../../primitive'

export enum Knot {
  Uniform,
  QuasiUniform,
  PiceceWise,
  NonUniform,
}

export type KnotParam = { points: number[], k: number }

export const createUniformKnots = (param: KnotParam) => {
  const { points, k } = param
  const n = points.length / 2
  const knots: number[] = []
  for (let i = 0; i <= n + k; i += 1) {
    knots[i] = i / (n + k)
  }
  return knots
}

export const createQuasiUniformKnots = (param: KnotParam) => {
  const { points, k } = param
  const n = points.length / 2
  const knots: number[] = []
  for (let i = 0; i <= n + k; i += 1) {
    if (i <= k) {
      knots[i] = 0
    } else if (i >= n) {
      knots[i] = 1
    } else {
      const ratio = i - k
      knots[i] = ratio / (n - k)
    }
  }
  return knots
}

export const createPiceceWiseKnots = (param: KnotParam) => {
  const { points, k } = param
  const n = points.length / 2
  if ((n - 1) % k !== 0) {
    throw new Error('(n-1)/k is not an integer!')
  }
  const knots: number[] = []
  for (let i = 0; i <= n + k; i += 1) {
    if (i <= k) {
      knots[i] = 0
    } else if (i >= n) {
      knots[i] = 1
    } else {
      knots[i] = 0.5
    }
  }
  return knots
}

export const createNonUniformKnots = (param: KnotParam) => {
  // Hartley-Judd Algorithm
  const { points, k } = param
  const n = points.length / 2
  const knots: number[] = []
  const pt = createPointAccessor(points)
  for (let i = 0; i <= n + k; i += 1) {
    if (i <= k) {
      knots[i] = 0
    } else if (i >= n) {
      knots[i] = 1
    } else {
      let sum = 0
      for (let j = k + 1; j <= i; j += 1) {
        let numerator = 0
        for (let l = j - k; l <= j - 1; l += 1) {
          numerator += Math.sqrt(pt(l).sqrDist(pt(l - 1)))
        }
        let denominator = 0
        for (let m = k + 1; m <= n; m += 1) {
          for (let l = m - k; l <= m - 1; l += 1) {
            denominator += Math.sqrt(pt(l).sqrDist(pt(l - 1)))
          }
        }
        sum += numerator / denominator
      }
      knots[i] = sum
    }
  }
  return knots
}

export const getKnots = (param: KnotParam, type = Knot.QuasiUniform) => {
  switch (type) {
    case Knot.Uniform: {
      return createUniformKnots(param)
    }
    case Knot.QuasiUniform: {
      return createQuasiUniformKnots(param)
    }
    case Knot.PiceceWise: {
      return createPiceceWiseKnots(param)
    }
    case Knot.NonUniform: {
      return createNonUniformKnots(param)
    }
    default: {
      throw new Error(`BSpline: Not support knot type: ${type} !`)
    }
  }
}

export default getKnots

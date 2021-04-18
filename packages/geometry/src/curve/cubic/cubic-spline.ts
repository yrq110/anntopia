import { BoundaryCondition, CubicSplineConfig, DefaultConfig } from './config'
import AbstractCurve from '../base'

export default class CubicSpline extends AbstractCurve<CubicSplineConfig> {
  constructor(points: number[], config?: Partial<CubicSplineConfig>, step?: number) {
    super(
      points,
      config
        ? Object.assign(DefaultConfig, config)
        : DefaultConfig,
      step,
    )
  }

  validate() {
    const points = this.dataPoints
    const n = points.length / 2
    for (let i = 0; i < n - 1; i += 1) {
      if (points[i * 2] > points[(i + 1) * 2]) {
        throw new Error('CubicSpline: the trend of x in dataPoints should be one direction')
      }
    }

    const { boundary, derivatives } = this.config
    if (boundary === BoundaryCondition.Clamped
      && derivatives.length < 2) {
      throw new Error('CubicSpline: need to set two derivatives at start and end points when set clamped boundary condition')
    }
  }

  interpolate() {
    const { step, dataPoints: points } = this
    const { boundary, derivatives } = this.config
    const n = points.length / 2

    const h: number[] = []
    const lamda: number[] = []; const mu: number[] = []; const D: number[] = []
    // the chasing method params
    const l: number[] = []; const m: number[] = []; const u: number[] = []
    // the chasing method coefficient matrix (triangular matrix)
    const M: number[] = []; const K: number[] = []
    // equation coefficients
    const a: number[] = []; const b: number[] = []; const c: number[] = []; const d: number[] = []

    // calculate steps
    for (let i = 0; i < n; i += 1) {
      h[i] = points[(i + 1) * 2] - points[i * 2]
    }

    for (let i = 1; i < n; i += 1) {
      lamda[i] = h[i - 1] / (h[i - 1] + h[i])
      mu[i] = h[i] / (h[i - 1] + h[i])
      const delta1 = (points[(i + 1) * 2 + 1] - points[i * 2 + 1]) / h[i]
      const delta2 = (points[i * 2 + 1] - points[(i - 1) * 2 + 1]) / h[i - 1]
      D[i] = (6 / (h[i - 1] + h[i])) * (delta1 - delta2)
    }

    switch (boundary) {
      case BoundaryCondition.Natural: {
        D[0] = 0
        D[n - 1] = 0
        mu[0] = 0
        lamda[n - 1] = 0
        break
      }
      case BoundaryCondition.Clamped: {
        const [b1, bn] = derivatives
        D[0] = (6 * ((points[1 * 2 + 1] - points[0 * 2 + 1]) / h[0] - b1)) / h[0]
        D[n - 1] = (6 * (bn - (points[(n - 1) * 2 + 1]
          - points[(n - 2) * 2 + 1]) / h[n - 2])) / h[n - 2]
        mu[0] = 1
        lamda[n - 1] = 1
        break
      }
      case BoundaryCondition.NotAKnot: {
        D[0] = 0
        D[n - 1] = 0
        mu[0] = -2
        lamda[n - 1] = -2
        break
      }
      default: break
    }

    l[0] = 2
    u[0] = mu[0] / l[0]

    for (let i = 1; i < n; i += 1) {
      m[i] = lamda[i]
      l[i] = 2 - m[i] * u[i - 1]
      u[i] = mu[i] / l[i]
    }

    K[0] = D[0] / l[0]

    for (let i = 1; i < n; i += 1) {
      K[i] = (D[i] - m[i] * K[i - 1]) / l[i]
    }
    M[n - 1] = K[n - 1]

    for (let i = n - 2; i >= 0; i -= 1) {
      M[i] = K[i] - u[i] * M[i + 1]
    }

    // calculate coefficients in equation
    for (let i = 0; i < n; i += 1) {
      const delta = points[(i + 1) * 2 + 1] - points[i * 2 + 1]
      a[i] = points[i * 2 + 1]
      b[i] = delta / h[i] - h[i] * (M[i] / 3 + M[i + 1] / 6)
      c[i] = M[i] / 2
      d[i] = (M[i + 1] - M[i]) / (6 * h[i])
    }

    // get interpolation points by calculation with equation
    const result: number[] = []
    for (let i = 0; i < n; i += 1) {
      const x1 = points[i * 2]
      const x2 = points[(i + 1) * 2]
      for (let x = x1; x <= x2; x += step) {
        const y = a[i] + b[i] * (x - x1) + c[i] * ((x - x1) ** 2) + d[i] * ((x - x1) ** 3)
        result.push(x, y)
      }
    }
    return result
  }
}

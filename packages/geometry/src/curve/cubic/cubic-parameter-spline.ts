import { BoundaryCondition, CubicSplineConfig, DefaultConfig } from './config'
import AbstractCurve from '../base'
import { Point2D, createPointAccessor } from '../../primitive'

type Points = Point2D[]
export default class CubicParameterSpline extends AbstractCurve<CubicSplineConfig> {
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
    const { boundary, derivatives } = this.config
    if (boundary === BoundaryCondition.Clamped
      && derivatives.length < 2) {
      throw new Error('CubicParameterSpline: need to set two derivatives at start and end points when set clamped boundary condition')
    }
  }

  interpolate() {
    const { step, dataPoints: points } = this
    const { boundary, derivatives } = this.config
    const pt = createPointAccessor(points)

    const n = points.length / 2

    const L: number[] = []
    const lamda: number[] = []; const mu: number[] = []; const D: Points = []
    // the chasing method params
    const l: number[] = []; const m: number[] = []; const u: number[] = []
    // the chasing method coefficient matrix (triangular matrix)
    const M: Points = []; const K: Points = []
    // equation coefficients
    const a: Points = []; const b: Points = []; const c: Points = []; const d: Points = []

    const delta: Points = []

    for (let i = 0; i < n - 1; i += 1) {
      delta[i] = pt(i + 1).subtract(pt(i))
      L[i] = Math.sqrt(delta[i].sqrLen())
    }

    for (let i = 1; i < n - 1; i += 1) {
      lamda[i] = L[i - 1] / (L[i - 1] + L[i])
      mu[i] = L[i] / (L[i - 1] + L[i])
      const res = new Point2D()
      const pii = pt(i + 1)
      const pi = pt(i)
      const p = pt(i - 1)

      res.add(pii).subtract(pi).scale(1 / L[i])
      pi.subtract(p).scale(1 / L[i - 1])
      res.subtract(pi)
      D[i] = res.scale(6 / (L[i - 1] + L[i]))
    }

    switch (boundary) {
      case BoundaryCondition.Natural: {
        D[0] = new Point2D(0, 0)
        D[n - 1] = new Point2D(0, 0)
        mu[0] = 0
        lamda[n - 1] = 0
        break
      }
      case BoundaryCondition.Clamped: {
        const [b1, bn] = derivatives

        const p1 = pt(1)
        const p0 = pt(0)
        const pn1 = pt(n - 1)
        const pn2 = pt(n - 2)

        D[0] = p1.subtract(p0).scale(1 / L[0]).addScalar(-b1).scale(6 / L[0])
        D[n - 1] = pn1.subtract(pn2).scale(1 / L[n - 2]).scale(-1).addScalar(bn)
          .scale(6 / L[n - 2])
        mu[0] = 1
        lamda[n - 1] = 1
        break
      }
      case BoundaryCondition.NotAKnot: {
        D[0] = new Point2D(0, 0)
        D[n - 1] = new Point2D(0, 0)
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
    K[0] = D[0].clone().scale(1 / l[0])

    for (let i = 1; i < n; i += 1) {
      K[i] = K[i - 1].clone().scale(-m[i]).add(D[i]).scale(1 / l[i])
    }
    M[n - 1] = K[n - 1].clone()

    for (let i = n - 2; i >= 0; i -= 1) {
      M[i] = M[i + 1].clone().scale(-u[i]).add(K[i])
    }

    for (let i = 0; i < n - 1; i += 1) {
      a[i] = pt(i)
      const pp1 = pt(i + 1).subtract(pt(i)).scale(1 / L[i])
      const pp2 = M[i].clone().scale(1 / 3).add(M[i + 1].clone().scale(1 / 6))
      b[i] = pp1.clone().subtract(pp2.scale(L[i]))
      c[i] = M[i].clone().scale(1 / 2)
      d[i] = M[i + 1].clone().subtract(M[i]).scale(1 / (6 * L[i]))
    }

    const result: number[] = []
    for (let i = 0; i < n; i += 1) {
      for (let t = 0; t <= L[i]; t += step) {
        const aa = a[i].clone()
        const bb = b[i].clone().scale(t)
        const cc = c[i].clone().scale(t ** 2)
        const dd = d[i].clone().scale(t ** 3)
        const p = aa.add(bb).add(cc).add(dd)
        result.push(p.x, p.y)
      }
    }
    return result
  }
}

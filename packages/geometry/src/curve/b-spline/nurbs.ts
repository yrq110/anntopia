import { NURBSConfig, DefaultNURBSConfig, BasisFunction } from './config'
import AbstractCurve from '../base'
import { Point2D, createPointAccessor } from '../../primitive'

export default class NURBS extends AbstractCurve<NURBSConfig> {
  constructor(points: number[], config?: Partial<NURBSConfig>, step?: number) {
    const defaultConfig = DefaultNURBSConfig(points)
    super(
      points,
      config
        ? Object.assign(defaultConfig, config)
        : defaultConfig,
      step,
    )
  }

  validate() {
    const { knots, k } = this.config
    const { dataPoints: points } = this
    if (knots.length < points.length / 2 + k + 1) {
      throw new Error('NURBS: need to set enough knots')
    }
  }

  interpolate() {
    const { step, dataPoints: points } = this
    const { k, w, knots } = this.config
    const pt = createPointAccessor(points)
    const n = points.length / 2

    const p = new Point2D()
    const result: number[] = []
    for (let t = 0; t <= 1; t += step) {
      p.set(0, 0)
      let denominator = 0
      for (let i = 0; i < n; i += 1) {
        const b = BasisFunction(knots, t, i, k)
        p.add(pt(i).scale(b * w[i]))
        denominator += b * w[i]
      }
      p.scale(1 / denominator)
      result.push(p.x, p.y)
    }
    return result
  }

  insertKnot(t: number) {
    if (t <= 0 || t >= 1) {
      throw new Error('knot value should in (0,1)')
    }

    const { dataPoints: points, config: { knots, k, w } } = this
    const n = points.length / 2
    const pt = createPointAccessor(points)
    const index = knots.findIndex((knot) => t <= knot)
    knots.splice(index, 0, t)

    const newPoints: number[] = []
    const newW: number[] = []

    for (let i = 0; i <= index - k; i += 1) {
      newPoints.push(points[i * 2], points[i * 2 + 1])
      newW.push(w[i])
    }

    for (let i = index - k + 1; i <= index; i += 1) {
      const numerator = t - knots[i]
      const denominator = knots[i + k + 1] - knots[i]
      let alpha = 0
      if (denominator !== 0) {
        alpha = numerator / denominator
      }
      const newPoint = pt(i).scale(alpha).add(pt(i - 1).scale(1 - alpha))
      newPoints.push(newPoint.x, newPoint.y)
      newW.push(alpha * w[i] + (1 - alpha) * w[i - 1])
    }

    for (let i = index; i < n; i += 1) {
      const p = pt(i)
      newPoints.push(p.x, p.y)
      newW.push(w[i])
    }

    this.dataPoints = newPoints
    this.setConfig({ w: newW })
  }
}

import { BSplineConfig, DefaultBSplineConfig, BasisFunction } from './config'
import AbstractCurve from '../base'
import { Point2D, createPointAccessor } from '../../primitive'

export default class BSpline extends AbstractCurve<BSplineConfig> {
  constructor(points: number[], config?: Partial<BSplineConfig>, step?: number) {
    const defaultConfig = DefaultBSplineConfig(points)
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
      throw new Error('BSpline: need to set enough knots')
    }
  }

  interpolate() {
    const { step, dataPoints: points } = this
    const { k, knots } = this.config
    const pt = createPointAccessor(points)

    const n = points.length / 2
    const res: number[] = []

    const p = new Point2D()
    for (let t = 0; t <= 1; t += step) {
      p.set(0, 0)
      for (let i = 0; i < n; i += 1) {
        const b = BasisFunction(knots, t, i, k)
        p.add(pt(i).scale(b))
      }
      res.push(p.x, p.y)
    }
    return res
  }

  insertKnot(t: number) {
    if (t <= 0 || t >= 1) {
      throw new Error('knot value should in (0,1)')
    }
    const { dataPoints: points, config: { knots, k } } = this
    const n = points.length / 2
    const pt = createPointAccessor(points)
    const index = knots.findIndex((knot) => t <= knot)
    knots.splice(index, 0, t)

    const newPoints: number[] = []
    for (let i = 0; i <= index - k; i += 1) {
      newPoints.push(points[i * 2], points[i * 2 + 1])
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
    }
    for (let i = index; i < n; i += 1) {
      const p = pt(i)
      newPoints.push(p.x, p.y)
    }
    this.dataPoints = newPoints
  }
}

import { BezierSplineConfig, DefaultConfig } from './config'
import AbstractCurve from '../base'
import BezierCurve from './bezier-curve'
import { Point2D } from '../../primitive'

const getControlPoints = (p1: Point2D, p2: Point2D, p3: Point2D, t = 0.5): Point2D[] => {
  const v = p3.clone().subtract(p1)
  const d01 = p1.clone().sqrDist(p2)
  const d12 = p2.clone().sqrDist(p3)
  const d012 = d01 + d12
  const c12 = v.clone().scale((t * d01) / d012)
  const c1 = p2.clone().subtract(c12)
  const c21 = v.clone().scale((t * d12) / d012)
  const c2 = p2.clone().add(c21)
  return [c1, c2]
}

const getBezierControlPoints = (points: Point2D[], tension = 0.5, closed = false): Point2D[] => {
  const isClosed = closed
  const pathControlPoints: Point2D[] = []
  const len = points.length

  for (let i = 0; i < len - 2; i += 1) {
    const [ctrl1, ctrl2] = getControlPoints(
      points[i], points[i + 1], points[i + 2], tension,
    )
    pathControlPoints.push(ctrl1, ctrl2)
  }

  if (isClosed) {
    const [ctrl1, ctrl2] = getControlPoints(
      points[len - 2], points[len - 1], points[0], tension,
    )
    pathControlPoints.push(ctrl1, ctrl2)
    const [ctrl11, ctrl22] = getControlPoints(
      points[len - 1], points[0], points[1], tension,
    )
    pathControlPoints.push(ctrl11, ctrl22)
  }
  return pathControlPoints
}

export default class BezierSpline extends AbstractCurve<BezierSplineConfig> {
  constructor(points: number[], config?: Partial<BezierSplineConfig>, step?: number) {
    super(
      points,
      config
        ? Object.assign(DefaultConfig, config)
        : DefaultConfig,
      step,
    )
  }

  validate() {
    if (this.dataPoints.length / 2 < 3) {
      throw new Error('BezierSpline: need at least 3 points')
    }
  }

  interpolate() {
    const { step, dataPoints: points } = this
    const { tension, closed } = this.config
    const pts: Point2D[] = []
    const n = points.length / 2
    for (let i = 0; i < n; i += 1) {
      pts.push(new Point2D(points[i * 2], points[i * 2 + 1]))
    }
    const controls = getBezierControlPoints(pts, tension, closed)
    const result: number[] = []
    const controlsLen = controls.length
    if (closed) {
      for (let i = 1; i <= n; i += 1) {
        const segment = BezierCurve([
          ...pts[i - 1].value,
          ...controls[2 * (i - 1) - 1 < 0 ? controlsLen - 1 : 2 * (i - 1) - 1].value,
          ...controls[2 * (i - 1)].value,
          ...pts[i % n].value,
        ], step)
        result.push(...segment)
      }
    } else {
      const firstSegment = BezierCurve([
        ...pts[0].value,
        ...controls[0].value,
        ...pts[1].value,
      ], step)
      result.push(...firstSegment)

      for (let i = 2; i < n - 1; i += 1) {
        const segment = BezierCurve([
          ...pts[i - 1].value,
          ...controls[2 * (i - 1) - 1].value,
          ...controls[2 * (i - 1)].value,
          ...pts[i].value,
        ], step)
        result.push(...segment)
      }

      const lastSegment = BezierCurve([
        ...pts[n - 2].value,
        ...controls[2 * (n - 2) - 1].value,
        ...pts[n - 1].value,
      ], step)
      result.push(...lastSegment)
    }

    return result
  }
}

import { mat4, vec4 } from 'gl-matrix'
import { CardinalSplineConfig, DefaultCardinalConfig } from './config'
import { Point2D, createPointAccessor } from '../../primitive'
import AbstractCurve from '../base'

export default class CardinalSpline extends AbstractCurve<CardinalSplineConfig> {
  constructor(points: number[], config?: Partial<CardinalSplineConfig>, step?: number) {
    if (points.length / 2 < 4) {
      throw new Error('CardinalSpline: need at least 4 data points')
    }
    const defaultConfig = DefaultCardinalConfig(
      [points[0], points[1]],
      [points[points.length - 2], points[points.length - 1]],
    )
    super(
      points,
      config
        ? Object.assign(defaultConfig, config)
        : defaultConfig,
      step,
    )
  }

  validate() {
    if (!this.config.vs || !this.config.ve) {
      throw new Error('CardinalSpline: need start and end virtual points')
    }
  }

  interpolate() {
    const { dataPoints, config: { tension, vs, ve }, step } = this

    const points = [...vs, ...dataPoints, ...ve]
    const pt = createPointAccessor(points)

    const n = points.length / 2

    if (n < 4) {
      throw new Error('cardinal spline: needs at least 4 points')
    }
    const s = (1 - tension) / 2

    const M = mat4.fromValues(
      -s, 2 * s, -s, 0,
      2 - s, s - 3, 0, 1,
      s - 2, 3 - 2 * s, s, 0,
      s, -s, 0, 0,
    )

    const res: number[] = []
    for (let i = 0; i < n - 3; i += 1) {
      const px = vec4.fromValues(pt(i).x, pt(i + 1).x, pt(i + 2).x, pt(i + 3).x)
      const py = vec4.fromValues(pt(i).y, pt(i + 1).y, pt(i + 2).y, pt(i + 3).y)
      vec4.transformMat4(px, px, M)
      vec4.transformMat4(py, py, M)

      for (let t = 0; t < 1; t += step) {
        const a = new Point2D(px[0], py[0]).scale(t ** 3)
        const b = new Point2D(px[1], py[1]).scale(t ** 2)
        const c = new Point2D(px[2], py[2]).scale(t ** 1)
        const d = new Point2D(px[3], py[3])
        const p = a.add(b).add(c).add(d)
        res.push(p.x, p.y)
      }
    }
    return res
  }
}

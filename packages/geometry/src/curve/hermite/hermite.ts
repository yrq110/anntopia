import { HermiteSplineConfig, DefaultHermiteConfig } from './config'
import { createPointAccessor } from '../../primitive'
import AbstractCurve from '../base'

export default class HermiteSpline extends AbstractCurve<HermiteSplineConfig> {
  constructor(points: number[], config?: Partial<HermiteSplineConfig>, step?: number) {
    const defaultConfig = DefaultHermiteConfig(points.length)
    super(
      points,
      config
        ? Object.assign(defaultConfig, config)
        : defaultConfig,
      step,
    )
  }

  validate() {
    if (this.dataPoints.length !== this.config.derivatives.length) {
      throw new Error('HermiteSpline: need derivative at each data point')
    }
  }

  interpolate() {
    const { dataPoints: points, config: { derivatives }, step } = this
    const pt = createPointAccessor(points)
    const de = createPointAccessor(derivatives)
    const n = points.length / 2

    const result: number[] = []
    for (let i = 0; i < n - 1; i += 1) {
      for (let t = 0; t <= 1; t += step) {
        const h0 = 2 * t ** 3 - 3 * t ** 2 + 1
        const h1 = -2 * t ** 3 + 3 * t ** 2
        const h2 = t ** 3 - 2 * t ** 2 + t
        const h3 = t ** 3 - t ** 2
        const p = pt(i).scale(h0)
          .add(pt(i + 1).scale(h1))
          .add(de(i).scale(h2))
          .add(de(i + 1).scale(h3))
        result.push(p.x, p.y)
      }
    }
    return result
  }
}

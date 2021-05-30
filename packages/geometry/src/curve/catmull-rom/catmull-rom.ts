import { CatmullRomConfig, DefaultCatmullRomConfig } from './config'
import AbstractCurve from '../base'
import { Point2D } from '../../primitive'

const CatmullRom = (t: number, p0: Point2D, p1: Point2D, p2: Point2D, p3: Point2D) => {
  const tt = t ** 2
  const ttt = t ** 3
  const a = p1.clone().scale(2)
  const b = p2.clone().subtract(p0)
  const c = p0.clone().scale(2)
    .add(p1.clone().scale(-5))
    .add(p2.clone().scale(4))
    .add(p3.clone().scale(-1))
  const d = p0.clone().scale(-1)
    .add(p1.clone().scale(3))
    .add(p2.clone().scale(-3))
    .add(p3.clone().scale(1))
  const p = new Point2D()

  p.add(a)
    .add(b.scale(t))
    .add(c.scale(tt))
    .add(d.scale(ttt))
    .scale(0.5)
  return p
}

export default class CatmullRomSpline extends AbstractCurve<CatmullRomConfig> {
  constructor(points: number[], config?: Partial<CatmullRomConfig>, step?: number) {
    super(
      points,
      config
        ? Object.assign(DefaultCatmullRomConfig, config)
        : DefaultCatmullRomConfig,
      step,
    )
  }

  validate() {
    const { dataPoints } = this

    if (dataPoints.length / 2 < 4) {
      throw new Error('CatmullRomSpline: need at least 4 points')
    }
  }

  setPoints(points: number[], p0: Point2D, p1: Point2D, p2: Point2D, p3: Point2D) {
    const { step } = this
    // let step = 0.001
    let p
    for (let t = 0; t <= 1; t += step) {
      p = CatmullRom(t, p0, p1, p2, p3)
      points.push(p.x, p.y)
    }
  }

  interpolate() {
    const { dataPoints: points } = this
    const n = points.length / 2
    const result: number[] = []

    const pt = (index: number) => new Point2D(points[index * 2], points[index * 2 + 1])

    for (let i = 0; i < n - 1; i += 1) {
      if (i === 0) {
        this.setPoints(result, pt(0), pt(0), pt(1), pt(2))
      } else if (i === n - 2) {
        this.setPoints(result, pt(i - 1), pt(i), pt(i + 1), pt(i + 1))
      } else {
        this.setPoints(result, pt(i - 1), pt(i), pt(i + 1), pt(i + 2))
      }
    }

    return result
  }
}

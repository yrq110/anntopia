import { Point2D } from '../../primitive'

export const quadraticBezierPoint = (t: number, p0: Point2D, p1: Point2D, p2: Point2D): Point2D => {
  const u = 1 - t
  const tt = t ** 2
  const uu = u ** 2

  const p = p0.clone().scale(uu)
  p.add(p1.clone().scale(2 * u * t))
  p.add(p2.clone().scale(tt))
  return p
}

export const cubicBezierPoint = (t: number, p0: Point2D, p1: Point2D, p2: Point2D, p3: Point2D) => {
  const u = 1 - t
  const tt = t ** 2
  const uu = u ** 2
  const uuu = u ** 3
  const ttt = t ** 3

  const p = p0.clone().scale(uuu)
  p.add(p1.clone().scale(3 * uu * t))
  p.add(p2.clone().scale(3 * u * tt))
  p.add(p3.clone().scale(ttt))
  return p
}

const BezierCurve = (
  points: number[],
  step = 0.01,
) => {
  const pt = (index: number) => new Point2D(points[index * 2], points[index * 2 + 1])
  const n = points.length / 2
  const res: number[] = []
  if (n === 4) {
    const pp0 = pt(0)
    const pp1 = pt(1)
    const pp2 = pt(2)
    const pp3 = pt(3)
    for (let t = 0; t <= 1; t += step) {
      const p = cubicBezierPoint(t, pp0, pp1, pp2, pp3)
      res.push(p.x, p.y)
    }
  } else if (n === 3) {
    const pp0 = pt(0)
    const pp1 = pt(1)
    const pp2 = pt(2)
    for (let t = 0; t <= 1; t += step) {
      const p = quadraticBezierPoint(t, pp0, pp1, pp2)
      res.push(p.x, p.y)
    }
  }

  return res
}

export default BezierCurve

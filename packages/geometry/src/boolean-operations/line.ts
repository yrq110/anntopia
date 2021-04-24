import { Vec2 } from '../util'

export const LinesIntersection = (
  p0: Vec2, p1: Vec2, // line1
  p2: Vec2, p3: Vec2, // line2
) => {
  const D = (p0[0] - p1[0]) * (p2[1] - p3[1]) - (p0[1] - p1[1]) * (p2[0] - p3[0])
  if (D === 0) return null

  const p: Vec2 = [0, 0]
  p[0] = (
    (p0[0] * p1[1] - p0[1] * p1[0]) * (p2[0] - p3[0])
    - (p0[0] - p1[0]) * (p2[0] * p3[1] - p2[1] * p3[0])
  ) / D
  p[1] = (
    (p0[0] * p1[1] - p0[1] * p1[0]) * (p2[1] - p3[1])
    - (p0[1] - p1[1]) * (p2[0] * p3[1] - p2[1] * p3[0])
  ) / D
  return p
}

export const LineSegmentsIntersection = (
  p0: Vec2, p1: Vec2, // line1
  p2: Vec2, p3: Vec2, // line2
) => {
  const D = (p0[0] - p1[0]) * (p2[1] - p3[1]) - (p0[1] - p1[1]) * (p2[0] - p3[0])
  if (D === 0) return null

  const t = ((p0[0] - p2[0]) * (p2[1] - p3[1]) - (p0[1] - p2[1]) * (p2[0] - p3[0])) / D
  const u = ((p1[0] - p0[0]) * (p0[1] - p2[1]) - (p1[1] - p0[1]) * (p0[0] - p2[0])) / D

  if (!(t >= 0 && t <= 1) || !(u >= 0 && u <= 1)) {
    return null
  }

  const p: Vec2 = [p0[0] + t * (p1[0] - p0[0]), p0[1] + u * (p1[1] - p0[1])]
  return p
}

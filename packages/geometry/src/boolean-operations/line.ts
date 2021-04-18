import { IPoint2D } from '../util'

export const LineIntersection = (
  p0: IPoint2D, p1: IPoint2D, // line1
  p2: IPoint2D, p3: IPoint2D, // line2
) => {
  const D = (p0[0] - p1[0]) * (p2[1] - p3[1]) - (p0[1] - p1[1]) * (p2[0] - p3[0])
  if (D === 0) return null
  const p: IPoint2D = [0, 0]
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
  p0: IPoint2D, p1: IPoint2D, // line1
  p2: IPoint2D, p3: IPoint2D, // line2
) => {
  const D = (p0[0] - p1[0]) * (p2[1] - p3[1]) - (p0[1] - p1[1]) * (p2[0] - p3[0])
  const t = ((p0[0] - p2[0]) * (p2[1] - p3[1]) - (p0[1] - p2[1]) * (p2[0] - p3[0])) / D
  const u = ((p1[0] - p0[0]) * (p0[1] - p2[1]) - (p1[1] - p0[1]) * (p0[0] - p2[0])) / D
  const p: IPoint2D = [p0[0] + t * (p1[0] - p0[0]), p0[1] + u * (p1[1] - p0[1])]
  return p
}

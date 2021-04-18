/* eslint-disable no-bitwise */
import { AABB } from '../bounding-box'
import { IPoint2D, cross, dot } from '../util'

export const isPointInTriangle = (p: IPoint2D, p1: IPoint2D, p2: IPoint2D, p3: IPoint2D) => {
  const v1: IPoint2D = [p1[0] - p[0], p1[1] - p[1]]
  const v2: IPoint2D = [p2[0] - p[0], p2[1] - p[1]]
  const v3: IPoint2D = [p3[0] - p[0], p3[1] - p[1]]

  const t1 = cross(v1, v2)
  const t2 = cross(v2, v3)
  const t3 = cross(v3, v1)

  return (t1 ^ t2) >= 0 && (t2 ^ t3) >= 0
}

/** ray casting algorithm */
export const isPointInPolygon = (point: IPoint2D, points: number[]) => {
  const [x, y] = point
  let intersectNum = 0
  const n = points.length / 2
  for (let i = 0; i < n - 1; i += 1) {
    const [x1, y1] = [points[i * 2], points[i * 2 + 1]]
    const [x2, y2] = [points[(i + 1) * 2], points[(i + 1) * 2 + 1]]
    const maxY = y1 < y2 ? y2 : y1
    const minY = y1 < y2 ? y1 : y2
    if (y > minY && y < maxY) {
      const intersecPointX = (x1 * y2 - x2 * y1 - (x1 - x2) * y) / (y2 - y1)
      if (x <= intersecPointX) {
        intersectNum += 1
      }
    }
  }
  return intersectNum % 2 !== 0
}

export const PolygonIntersection = (poly0: number[], poly1: number[]) => {
  const n = poly0.length / 2
  const m = poly1.length / 2

  const aabb0 = AABB(poly0)
  const aabb1 = AABB(poly1)
  if (aabb0[2] < aabb1[0]
    || aabb1[2] < aabb0[0]
    || aabb0[3] < aabb1[1]
    || aabb1[3] < aabb0[1]) {
    return false
  }

  for (let i = 0; i < n - 1; i += 1) {
    for (let j = 0; j < m - 1; j += 1) {
      const p00 = [poly0[i * 2], poly0[i * 2 + 1]]
      const p01 = [poly0[(i + 1) * 2], poly0[(i + 1) * 2 + 1]]
      const p10 = [poly1[i * 2], poly1[i * 2 + 1]]
      const p11 = [poly1[(i + 1) * 2], poly1[(i + 1) * 2 + 1]]
      const v1 = [p11[0] - p10[0], p11[1] - p10[1]]
      const v2 = [p00[0] - p10[0], p00[1] - p10[1]]
      const v3 = [p01[0] - p10[0], p01[1] - p10[1]]
      const cross1 = v2[0] * v1[1] - v1[0] * v2[1]
      const cross2 = v3[0] * v1[1] - v1[0] * v3[1]

      const v4 = [p01[0] - p00[0], p01[1] - p00[1]]
      const v5 = [p10[0] - p00[0], p10[1] - p00[1]]
      const v6 = [p11[0] - p00[0], p11[1] - p00[1]]
      const cross3 = v5[0] * v4[1] - v4[0] * v5[1]
      const cross4 = v6[0] * v4[1] - v4[0] * v6[1]

      if (cross1 * cross2 < 0 && cross3 * cross4 < 0) {
        return true
      }
    }
  }

  let containPointNum = 0
  for (let i = 0; i < n - 1; i += 1) {
    const isContain = isPointInPolygon([poly0[i * 2], poly0[i * 2 + 1]], poly1)
    if (isContain) {
      containPointNum += 1
    }
  }

  return containPointNum === n - 1
}

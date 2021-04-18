import { IPoint2D } from './type'

export * from './type'

export const centroid = (points: number[]) => {
  let xSum = 0
  let ySum = 0
  const n = points.length / 2
  for (let i = 0; i < n; i += 1) {
    xSum += points[i * 2]
    ySum += points[i * 2 + 1]
  }
  return [Math.floor(xSum / n), Math.floor(ySum / n)] as IPoint2D
}

export const cross = (p0: IPoint2D, p1: IPoint2D) => p0[0] * p1[1] - p0[1] * p1[0]

export const dot = (p0: IPoint2D, p1: IPoint2D) => p0[0] * p1[0] + p0[1] * p1[1]

export const norm = (v: IPoint2D) => Math.sqrt(v[0] ** 2 + v[1] ** 2)

export const distance = (p0: IPoint2D, p1: IPoint2D) => Math.sqrt(
  (p0[0] - p1[0]) ** 2 + (p0[1] - p1[1]) ** 2,
)

export const angle = (v0: IPoint2D, v1: IPoint2D) => {
  const d = dot(v0, v1)
  const n = norm(v0) * norm(v1)
  return Math.acos(d / n)
}

export const clockwise = (points: number[]) => {
  let res = 0
  const n = points.length / 2
  const p0 = [points[0], points[1]]
  for (let i = 1; i < n - 1; i += 1) {
    const p1 = [points[i * 2], points[i * 2 + 1]]
    const p2 = [points[(i + 1) * 2], points[(i + 1) * 2 + 1]]
    const v1: IPoint2D = [p1[0] - p0[0], p1[0] - p0[0]]
    const v2: IPoint2D = [p2[0] - p0[0], p2[0] - p0[0]]
    res += cross(v1, v2)
  }
  return res < 0
}

export const divide = (a: number, b: number) => {
  if (b === 0) return 0
  return a / b
}

export const getPointDirectionFromSegment = (p0: IPoint2D, p1: IPoint2D, p: IPoint2D) => {
  if (p0[0] >= 0 && p1[0] < 0) return true
  if (p0[0] === 0 && p1[0] === 0) return p0[1] > p1[1]

  const v0: IPoint2D = [p0[0] - p[0], p0[1] - p[1]]
  const v1: IPoint2D = [p1[0] - p[0], p1[1] - p[1]]

  const det = cross(v0, v1)
  if (det < 0) return true
  if (det > 0) return false

  const d1 = distance(p0, p)
  const d2 = distance(p1, p)
  return d1 > d2
}

export const sortPointsByAntiClockwise = (points: number[]) => {
  const centre = centroid(points)
  const pts: IPoint2D[] = []
  for (let i = 0; i < points.length / 2; i += 1) {
    pts.push([points[i * 2], points[i * 2 + 1]])
  }
  pts.sort((a, b) => (getPointDirectionFromSegment(a, b, centre) ? -1 : 1))

  return pts.flat()
}

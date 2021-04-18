import { LineSegmentsIntersection } from '../boolean-operations'
import {
  IPoint2D, angle, cross, clockwise,
} from '../util'

type Line = {
  index: number,
  angle: number,
  p0: IPoint2D
  p1: IPoint2D
}

// TODO: Fatal bug
const HalfPlaneIntersection = (points: number[]) => {
  const n = points.length / 2
  const lines: Line[] = []
  const xAxisVec: IPoint2D = [0, 1]
  const isClockwise = clockwise(points)
  for (let i = 0; i < n; i += 1) {
    let p0: IPoint2D
    let p1: IPoint2D
    if (isClockwise) {
      p0 = [points[((i + 1) % n) * 2], points[((i + 1) % n) * 2 + 1]]
      p1 = [points[i * 2], points[i * 2 + 1]]
    } else {
      p0 = [points[i * 2], points[i * 2 + 1]]
      p1 = [points[((i + 1) % n) * 2], points[((i + 1) % n) * 2 + 1]]
    }

    const lineVec: IPoint2D = [p1[0] - p0[0], p1[1] - p0[1]]
    const ang = angle(xAxisVec, lineVec)
    lines.push({
      index: i,
      angle: ang,
      p0,
      p1,
    })
  }

  lines.sort((a, b) => {
    const { angle: angleA, p0: pa0, p1: pa1 } = a
    const { angle: angleB, p1: pb1 } = b
    if (Math.abs(angleA - angleB) < Number.EPSILON) {
      const va: IPoint2D = [pa1[0] - pa0[0], pa1[1] - pa0[1]]
      const vab: IPoint2D = [pb1[0] - pa0[0], pb1[1] - pa0[1]]
      return cross(va, vab) >= 0 ? 1 : -1
    }
    return a.angle > b.angle ? 1 : -1
  })

  let j = 0
  for (let i = 0; i < n - 1; i += 1) {
    if (Math.abs(lines[i].angle - lines[i + 1].angle) > Number.EPSILON) {
      lines[j] = lines[i]
      j += 1
    }
  }
  lines[j] = lines[n - 1]
  lines.length = j + 1

  const onRight = (la: Line, lb: Line, lc: Line) => {
    const p = LineSegmentsIntersection(lb.p0, lb.p1, lc.p0, lc.p1)
    const va: IPoint2D = [la.p1[0] - la.p0[0], la.p1[1] - la.p0[1]]
    const vai: IPoint2D = [p[0] - la.p0[0], p[1] - la.p0[1]]
    return cross(va, vai) < 0
  }

  const coreLines: Line[] = []
  let head = 0
  let tail = 0
  for (let i = 0; i < lines.length; i += 1) {
    while (
      tail - head > 1
      && onRight(lines[i], coreLines[tail - 1], coreLines[tail - 2])
    ) { tail -= 1 }
    while (
      tail - head > 1
      && onRight(lines[i], coreLines[head], coreLines[head + 1])
    ) { head += 1 }
    coreLines[tail] = lines[i]
    tail += 1
  }

  while (
    tail - head > 1
    && onRight(coreLines[head], coreLines[tail - 1], coreLines[tail - 2])
  ) { tail -= 1 }
  while (
    tail - head > 1
    && onRight(coreLines[tail - 1], coreLines[head], coreLines[head + 1])
  ) { head += 1 }

  if (tail - head < 3) return false
  return true
}

export default HalfPlaneIntersection

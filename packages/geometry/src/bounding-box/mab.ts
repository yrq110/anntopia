import { vec2 } from 'gl-matrix'
import { centroid } from '../util'

const MinAreaBox = (points: number[]) => {
  let minArea = Number.MAX_SAFE_INTEGER
  let res: number[] = []
  const v = vec2.create()
  const n = points.length / 2
  const center = centroid(points)

  for (let i = 0; i < n - 1; i += 1) {
    const angle = Math.atan2(
      points[(i + 1) * 2 + 1] - points[i * 2 + 1],
      points[(i + 1) * 2] - points[i * 2],
    )

    let minx = Number.MAX_SAFE_INTEGER
    let miny = Number.MAX_SAFE_INTEGER
    let maxx = Number.MIN_SAFE_INTEGER
    let maxy = Number.MIN_SAFE_INTEGER
    for (let j = 0; j < n; j += 1) {
      vec2.set(v, points[j * 2], points[j * 2 + 1])
      vec2.rotate(v, v, vec2.fromValues(center[0], center[1]), -angle)
      minx = Math.min(v[0], minx)
      maxx = Math.max(v[0], maxx)
      miny = Math.min(v[1], miny)
      maxy = Math.max(v[1], maxy)
    }
    const rect = [minx, miny, maxx, maxy]

    const area = (rect[2] - rect[0]) * (rect[3] - rect[1])
    if (area < minArea) {
      minArea = area
      const rectPoints = [
        rect[0], rect[1],
        rect[0], rect[3],
        rect[2], rect[3],
        rect[2], rect[1],
      ]
      res = []
      for (let m = 0; m < 4; m += 1) {
        vec2.set(v, rectPoints[m * 2], rectPoints[m * 2 + 1])
        vec2.rotate(v, v, vec2.fromValues(center[0], center[1]), angle)
        res.push(v[0], v[1])
      }
    }
  }
  return res
}

export default MinAreaBox

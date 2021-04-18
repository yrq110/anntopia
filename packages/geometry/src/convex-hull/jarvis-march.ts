import { IPoint2D } from '../util/type'

const orientation = (p: IPoint2D, q: IPoint2D, r: IPoint2D) => {
  const val = (q[1] - p[1]) * (r[0] - q[0]) - (q[0] - p[0]) * (r[1] - q[1])
  if (val === 0) return val
  return val > 0 ? 1 : -1
}

const JarvisMarch = (points: number[]) => {
  const hull: number[] = []
  const n = points.length / 2
  let rightMost = -1
  let maxx = Number.MIN_SAFE_INTEGER

  for (let i = 0; i < n; i += 1) {
    if (points[i * 2] > maxx) {
      maxx = points[i * 2]
      rightMost = i
    }
  }

  let q = 0
  let p = rightMost
  do {
    hull.push(points[p * 2], points[p * 2 + 1])
    q = (p + 1) % n

    for (let i = 0; i < n; i += 1) {
      const o = orientation(
        [points[p * 2], points[p * 2 + 1]],
        [points[i * 2], points[i * 2 + 1]],
        [points[q * 2], points[q * 2 + 1]],
      )

      if (o === -1) {
        q = i
      }
    }
    p = q
  } while (p !== rightMost)

  return hull
}

export default JarvisMarch

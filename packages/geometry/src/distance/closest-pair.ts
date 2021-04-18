import { distance } from '../util'

/** divide-conquer algorithm */
const ClosestPair = (points: number[]) => {
  const pts: number[][] = []
  const n = points.length / 2
  for (let i = 0; i < n; i += 1) {
    pts.push([points[i * 2], points[i * 2 + 1], i])
  }
  pts.sort((p1, p2) => (p1[0] - p2[0] > 0 ? 1 : -1))

  let indice: number[] = []
  let res = Number.MAX_SAFE_INTEGER
  const close = (left: number, right: number) => {
    if (left === right) return Number.MAX_SAFE_INTEGER
    if (left + 1 === right) {
      const d = distance([pts[left][0], pts[left][1]], [pts[right][0], pts[right][1]])
      if (d < res) {
        res = d
        indice = [pts[left][2], pts[right][2]]
      }
      return d
    }

    const mid = Math.round((left + right) / 2)
    const d1 = close(left, mid)
    const d2 = close(mid + 1, right)

    let d = Math.min(d1, d2)

    const f: number[][] = []
    for (let i = left; i <= right; i += 1) {
      if (Math.abs(pts[i][0] - pts[mid][0]) < d) {
        f.push([pts[i][0], pts[i][1], i])
      }
    }
    f.sort((p1, p2) => (p1[1] - p2[1] > 0 ? 1 : -1))

    for (let i = 0; i < f.length - 1; i += 1) {
      for (let j = i + 1; j < f.length; j += 1) {
        if (f[j][1] - f[i][1] < d) {
          const dist = distance([f[i][0], f[i][1]], [f[j][0], f[j][1]])
          if (dist < d) {
            d = dist
            if (d < res) {
              res = d
              indice = [pts[f[i][2]][2], pts[f[j][2]][2]]
            }
          }
        } else {
          break
        }
      }
    }
    return d
  }

  close(0, n - 1)

  return {
    distance: res,
    begin: [points[indice[0] * 2], points[indice[0] * 2 + 1]],
    end: [points[indice[1] * 2], points[indice[1] * 2 + 1]],
  }
}

export default ClosestPair

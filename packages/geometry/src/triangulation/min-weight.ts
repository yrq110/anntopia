import { sortPointsByAntiClockwise } from '../util'

const MinimumWeightTriangulation = (points: number[]) => {
  const n = points.length / 2
  const t: number[][] = new Array(n).fill(undefined).map(() => new Array(n).fill(1))
  const s: number[][] = new Array(n).fill(undefined).map(() => new Array(n).fill(1))

  for (let i = 0; i < n; i += 1) {
    t[i][i] = 0
  }

  const getWeight = (a: number, b: number, c: number) => {
    const ab = (points[a * 2] - points[b * 2]) ** 2 + (points[a * 2 + 1] - points[b * 2 + 1]) ** 2
    const ac = (points[a * 2] - points[c * 2]) ** 2 + (points[a * 2 + 1] - points[c * 2 + 1]) ** 2
    const bc = (points[b * 2] - points[c * 2]) ** 2 + (points[b * 2 + 1] - points[c * 2 + 1]) ** 2
    return ab + ac + bc
  }

  for (let i = 2; i < n; i += 1) {
    for (let j = 0; j < n - i; j += 1) {
      const k = i + j
      const m = j + 1
      t[j][k] = t[j][m] + t[m][k] + getWeight(j, m, k)
      s[j][k] = m
      for (let p = m + 1; p < k; p += 1) {
        const u = t[j][p] + t[p][k] + getWeight(j, p, i)
        if (u < t[j][k]) {
          t[j][k] = u
          s[j][k] = p
        }
      }
    }
  }
  const result: number[][] = []
  const trace = (i: number, j: number) => {
    if (i === j) return
    if (i + 1 === j) return
    trace(i, s[i][j])
    trace(s[i][j], j)

    const pts = sortPointsByAntiClockwise([
      points[i * 2], points[i * 2 + 1],
      points[j * 2], points[j * 2 + 1],
      points[s[i][j] * 2], points[s[i][j] * 2 + 1],
    ])
    result.push(pts)
  }
  trace(0, n - 1)
  return result
}

export default MinimumWeightTriangulation

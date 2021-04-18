import { GrahamScan } from '../convex-hull'
import { cross, distance } from '../util'

/** rotating calipers algorithm */
const FarthestPair = (points: number[]) => {
  const convex = GrahamScan(points)
  const n = convex.length / 2
  let j = 2
  let res = Number.MIN_SAFE_INTEGER
  let indice: number[] = []

  for (let i = 0; i < n - 1; i += 1) {
    const p1 = [convex[i * 2], convex[i * 2 + 1]]
    const p2 = [convex[(i + 1) * 2], convex[(i + 1) * 2 + 1]]

    while (true) {
      const j1 = [convex[j * 2], convex[j * 2 + 1]]
      const j2 = [convex[(j + 1) * 2], convex[(j + 1) * 2 + 1]]
      const area1 = Math.abs(cross([p1[0] - j1[0], p1[1] - j1[1]], [p2[0] - j1[0], p2[1] - j1[1]]))
      const area2 = Math.abs(cross([p1[0] - j2[0], p1[1] - j2[1]], [p2[0] - j2[0], p2[1] - j2[1]]))
      if (area1 <= area2) {
        j += 1
        if (j > n - 1) j = 0
      } else {
        break
      }
    }

    const dis = distance([convex[i * 2], convex[i * 2 + 1]], [convex[j * 2], convex[j * 2 + 1]])
    if (dis > res) {
      res = dis
      indice = [i, j]
    }
  }

  return {
    distance: res,
    begin: [convex[indice[0] * 2], convex[indice[0] * 2 + 1]],
    end: [convex[indice[1] * 2], convex[indice[1] * 2 + 1]],
  }
}

export default FarthestPair

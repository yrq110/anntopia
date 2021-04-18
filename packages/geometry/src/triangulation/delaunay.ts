import { Triangle } from '../primitive'
import { sortPointsByAntiClockwise } from '../util'
import { IPoint2D } from '../util/type'

/** Bowyer–Watson algorithm */
const DelaunayTriangulation = (points: number[]) => {
  const n = points.length / 2

  const superTriangle = (vertices: number[]) => {
    let minx = Infinity
    let miny = Infinity
    let maxx = -Infinity
    let maxy = -Infinity
    for (let i = 0; i < vertices.length / 2; i += 1) {
      const [x, y] = [vertices[i * 2], vertices[i * 2 + 1]]
      minx = Math.min(minx, x)
      miny = Math.min(miny, y)
      maxx = Math.max(maxx, x)
      maxy = Math.max(maxy, y)
    }

    const dx = maxx - minx
    const dy = maxy - miny
    const dmax = Math.max(dx, dy)
    const midx = minx + dx * 0.5
    const midy = miny + dy * 0.5

    const pts = sortPointsByAntiClockwise([
      midx - 20 * dmax, midy - dmax,
      midx, midy + 20 * dmax,
      midx + 20 * dmax, midy - dmax,
    ])

    return new Triangle(
      [pts[0], pts[1]],
      [pts[2], pts[3]],
      [pts[4], pts[5]],
      true,
    )
  }

  const st = superTriangle(points)

  let triangles = [st]

  const checkEdgeHash = (p0: IPoint2D, p1: IPoint2D, hash: Set<string>) => {
    const hash1 = `${p0[0]}:${p0[1]}:${p1[0]}:${p1[1]}`
    const hash2 = `${p1[0]}:${p1[1]}:${p0[0]}:${p0[1]}`
    if (hash.has(hash1)) return hash1
    if (hash.has(hash2)) return hash2
    return null
  }

  const edgeHash: Set<string> = new Set()
  const edgeMap: Map<string, number> = new Map()

  // Triangulate each vertex
  for (let i = 0; i < n; i += 1) {
    const v: IPoint2D = [points[i * 2], points[i * 2 + 1]]
    triangles = triangles.filter((triangle) => {
      const { center, r } = triangle.circumCircle!
      const distance = (center[0] - v[0]) ** 2 + (center[1] - v[1]) ** 2
      if (distance <= r) {
        const { p0, p1, p2 } = triangle
        const key01 = checkEdgeHash(p0, p1, edgeHash)
        const key12 = checkEdgeHash(p1, p2, edgeHash)
        const key20 = checkEdgeHash(p2, p0, edgeHash)
        if (!key01) {
          edgeHash.add(`${p0[0]}:${p0[1]}:${p1[0]}:${p1[1]}`)
          edgeMap.set(`${p0[0]}:${p0[1]}:${p1[0]}:${p1[1]}`, 1)
        } else {
          edgeMap.set(key01, (edgeMap.get(key01) ?? 0) + 1)
        }
        if (!key12) {
          edgeHash.add(`${p1[0]}:${p1[1]}:${p2[0]}:${p2[1]}`)
          edgeMap.set(`${p1[0]}:${p1[1]}:${p2[0]}:${p2[1]}`, 1)
        } else {
          edgeMap.set(key12, (edgeMap.get(key12) ?? 0) + 1)
        }
        if (!key20) {
          edgeHash.add(`${p2[0]}:${p2[1]}:${p0[0]}:${p0[1]}`)
          edgeMap.set(`${p2[0]}:${p2[1]}:${p0[0]}:${p0[1]}`, 1)
        } else {
          edgeMap.set(key20, (edgeMap.get(key20) ?? 0) + 1)
        }
        return false
      }
      return true
    })
    // eslint-disable-next-line no-loop-func
    edgeMap.forEach((value, key) => {
      if (value === 1) {
        const [p00, p01, p10, p11] = key.split(':')
        const pts = sortPointsByAntiClockwise([
          v[0], v[1],
          Number(p00), Number(p01),
          Number(p10), Number(p11),
        ])
        triangles.push(new Triangle(
          [pts[0], pts[1]],
          [pts[2], pts[3]],
          [pts[4], pts[5]],
          true,
        ))
      }
    })
    edgeHash.clear()
    edgeMap.clear()
  }

  // Remove triangles that share edges with super triangle
  triangles = triangles.filter((triangle) => !(
    (triangle.p0[0] === st.p0[0] && triangle.p0[1] === st.p0[1])
      || (triangle.p0[0] === st.p1[0] && triangle.p0[1] === st.p1[1])
      || (triangle.p0[0] === st.p2[0] && triangle.p0[1] === st.p2[1])
      || (triangle.p1[0] === st.p0[0] && triangle.p1[1] === st.p0[1])
      || (triangle.p1[0] === st.p1[0] && triangle.p1[1] === st.p1[1])
      || (triangle.p1[0] === st.p2[0] && triangle.p1[1] === st.p2[1])
      || (triangle.p2[0] === st.p0[0] && triangle.p2[1] === st.p0[1])
      || (triangle.p2[0] === st.p1[0] && triangle.p2[1] === st.p1[1])
      || (triangle.p2[0] === st.p2[0] && triangle.p2[1] === st.p2[1])
  ))

  return triangles
}

export default DelaunayTriangulation

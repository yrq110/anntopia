import { IPoint2D } from '../util/type'

const dot = (v0: IPoint2D, v1: IPoint2D) => v0[0] * v1[0] + v0[1] * v1[1]
const norm = (v: IPoint2D) => Math.sqrt(v[0] ** 2 + v[1] ** 2)

const minimumTriangleAngle = (p0: IPoint2D, p1: IPoint2D, p2: IPoint2D) => {
  const v10: IPoint2D = [p1[0] - p0[0], p1[1] - p0[1]]
  const v20: IPoint2D = [p2[0] - p0[0], p2[1] - p0[1]]
  const angle0 = Math.acos(dot(v10, v20) / (norm(v10) * norm(v20)))

  const v01: IPoint2D = [p0[0] - p1[0], p0[1] - p1[1]]
  const v21: IPoint2D = [p2[0] - p1[0], p2[1] - p1[1]]
  const angle1 = Math.acos(dot(v01, v21) / (norm(v01) * norm(v21)))

  const v02: IPoint2D = [p0[0] - p2[0], p0[1] - p2[1]]
  const v12: IPoint2D = [p1[0] - p2[0], p1[1] - p2[1]]
  const angle2 = Math.acos(dot(v02, v12) / (norm(v02) * norm(v12)))

  return Math.min(angle0, angle1, angle2)
}

const isPointInTriangle = (p: IPoint2D, p0: IPoint2D, p1: IPoint2D, p2: IPoint2D) => {
  // Barycentric coordinate:
  // p = p0 + (p1 - p0) * u + (p2 - p0) * v

  const v0: IPoint2D = [p1[0] - p0[0], p1[1] - p0[1]]
  const v1: IPoint2D = [p2[0] - p0[0], p2[1] - p0[1]]
  const v2: IPoint2D = [p[0] - p0[0], p0[1] - p0[1]]
  const dot00 = dot(v0, v0)
  const dot01 = dot(v0, v1)
  const dot02 = dot(v0, v2)
  const dot11 = dot(v1, v1)
  const dot12 = dot(v1, v2)

  const inverDeno = 1 / (dot00 * dot11 - dot01 * dot01)

  const u = (dot11 * dot02 - dot01 * dot12) * inverDeno
  // if u out of range, return directly
  if (u < 0 || u > 1) return false

  const v = (dot00 * dot12 - dot01 * dot02) * inverDeno
  // if v out of range, return directly
  if (v < 0 || v > 1) return false

  return u + v <= 1
}

// TODO: Fatal bug
const PolygonTriangulation = (points: number[]) => {
  const n = points.length / 2
  const getPointList = () => {
    const pts: any[] = []
    for (let i = 0; i < n; i += 1) {
      pts.push([points[i * 2], points[i * 2 + 1], i])
    }
    return pts
  }
  const pointList = getPointList()
  const triangles: number[][] = []
  while (pointList.length > 3) {
    const maxEigenAngle = Number.MIN_VALUE
    let target
    let targetIndex = 0
    for (let i = 0; i < pointList.length - 2; i += 1) {
      const [p0, p1, p2] = [pointList[i], pointList[i + 1], pointList[i + 2]]
      const v1 = [p1[0] - p0[0], p1[1] - p0[1]]
      const v2 = [p2[0] - p1[0], p2[1] - p1[1]]
      const cross = v1[0] * v2[1] - v1[1] * v2[0]
      if (cross > 0) {
        const checkPoints = getPointList()
        const triIndice = [p0[2], p1[2], p2[2]].sort((a, b) => (a < b ? 1 : -1))
        triIndice.forEach((idx) => checkPoints.splice(idx, 1))
        const hasInnerPoint = checkPoints.find((point) => isPointInTriangle(point, p0, p1, p2))
        if (!hasInnerPoint) {
          const minTriAngle = minimumTriangleAngle(p0, p1, p2)
          if (minTriAngle > maxEigenAngle) {
            target = [p0[0], p0[1], p1[0], p1[1], p2[0], p2[1]]
            targetIndex = i + 1
          }
        }
      }
    }
    if (target) {
      triangles.push(target)
      pointList.splice(targetIndex, 1)
    } else {
      break
    }
  }
  triangles.push([
    pointList[0][0], pointList[0][1],
    pointList[1][0], pointList[1][1],
    pointList[2][0], pointList[2][1],
  ])
  return triangles
}

export default PolygonTriangulation

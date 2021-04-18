import { cross, IPoint2D } from '../util'
import { DelaunayTriangulation } from '../triangulation'

const EdgeJoinSign = ':'
const VoronoiDiagram = (
  points: number[],
) => {
  const triangles = DelaunayTriangulation(points)

  const edges: IPoint2D[][] = []
  const edgeExcenterMap: Map<string, number[]> = new Map()
  triangles.forEach((triangle, index) => {
    const edge1 = [triangle.p0, triangle.p1]
      .sort((a, b) => (a[0] - b[0] > 0 ? 1 : -1)).flat().join(EdgeJoinSign)
    const edge2 = [triangle.p1, triangle.p2]
      .sort((a, b) => (a[0] - b[0] > 0 ? 1 : -1)).flat().join(EdgeJoinSign)
    const edge3 = [triangle.p2, triangle.p0]
      .sort((a, b) => (a[0] - b[0] > 0 ? 1 : -1)).flat().join(EdgeJoinSign)

    if (edgeExcenterMap.has(edge1)) {
      const edge = edgeExcenterMap.get(edge1)
      edge!.push(index)
    } else {
      edgeExcenterMap.set(edge1, [index])
    }
    if (edgeExcenterMap.has(edge2)) {
      const edge = edgeExcenterMap.get(edge2)
      edge!.push(index)
    } else {
      edgeExcenterMap.set(edge2, [index])
    }
    if (edgeExcenterMap.has(edge3)) {
      const edge = edgeExcenterMap.get(edge3)
      edge!.push(index)
    } else {
      edgeExcenterMap.set(edge3, [index])
    }
  })

  edgeExcenterMap.forEach((indice, edge) => {
    if (indice.length === 2) {
      edges.push(indice.map((index) => triangles[index].circumCircle!.center))
    } else if (indice.length === 1) {
      const [edge0x, edge0y, edge1x, edge1y] = edge.split(EdgeJoinSign)
      let edgeStart = [Number(edge0x), Number(edge0y)]
      let edgeEnd = [Number(edge1x), Number(edge1y)]

      const triangle = triangles[indice[0]]
      const excenter = triangle.circumCircle!.center
      const vertices = triangle.flat()

      if (
        !(
          (vertices.indexOf(edgeStart[0]) === 4
            && vertices.indexOf(edgeEnd[0]) === 0)
          || (vertices.indexOf(edgeEnd[0]) - vertices.indexOf(edgeStart[0])) === 2
        )
      ) {
        edgeEnd = [Number(edge0x), Number(edge0y)]
        edgeStart = [Number(edge1x), Number(edge1y)]
      }

      const edgeCenter = [
        (edgeStart[0] + edgeEnd[0]) / 2,
        (edgeStart[1] + edgeEnd[1]) / 2,
      ]

      const p1 = excenter

      const v1: IPoint2D = [edgeEnd[0] - edgeStart[0], edgeEnd[1] - edgeStart[1]]
      const v2: IPoint2D = [excenter[0] - edgeStart[0], excenter[1] - edgeStart[1]]
      const aside = cross(v1, v2) < 0 ? 1 : -1

      const p2: IPoint2D = [
        excenter[0] + aside * (edgeCenter[0] - excenter[0]) * 1e5,
        excenter[1] + aside * (edgeCenter[1] - excenter[1]) * 1e5,
      ]

      edges.push([
        p1,
        p2,
      ])
    }
  })
  return edges
}

export default VoronoiDiagram

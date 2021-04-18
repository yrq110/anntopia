import { DelaunayTriangulation } from '../triangulation'
import { ICircle } from '../util'

/** convex polygon */
const LargestEmptyCircle = (points: number[]) => {
  const triangles = DelaunayTriangulation(points)
  let res: ICircle = {
    r: 1,
    center: [0, 0],
  }
  let maxRadius = Number.MIN_SAFE_INTEGER
  triangles.forEach((triangle) => {
    const circle = triangle.circumCircle
    if (circle && circle.r > maxRadius) {
      maxRadius = circle.r
      res = {
        r: circle.r,
        center: circle.center,
      }
    }
  })
  res.r = Math.sqrt(res.r)
  return res
}

export default LargestEmptyCircle

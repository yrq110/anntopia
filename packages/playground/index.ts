import {
  CubicSpline, CubicParameterSpline, CardinalSpline, CatmullRomSpline,
  HermiteSpline, BSpline, BezierSpline, NURBS, createNonUniformKnots,
  GrahamScan, Chan, JarvisMarch, MinAreaBox, MinPerimeterBox,
  triangleCircumcircle, DelaunayTriangulation, PolygonTriangulation, MinWeightTriangulation, VoronoiDiagram, LargestEmptyCircle, FarthestPair, ClosestPair, HalfPlaneIntersection,
  AABB,
} from '@anntopia/geometry'

const canvas = document.createElement('canvas')
canvas.className = 'main'
canvas.width = 1500
canvas.height = 1000
document.body.appendChild(canvas)

export const uniform = (
  count: number,
  offsetX = 0, offsetY = 0,
  width = 300, height = 300,
) => {
  const points = []
  for (let i = 0; i < count; i += 1) {
    points.push(Math.random() * width + offsetX, Math.random() * height + offsetY)
  }
  return points
}

const drawLines = (
  points: number[],
  ctx: CanvasRenderingContext2D,
  offset: [number, number] = [0, 0],
  closed = false,
  sign = false,
  color = '#ff00ff',
) => {
  ctx.strokeStyle = color
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(points[0] + offset[0], points[1] + offset[1])
  sign && ctx.strokeText(`0`, points[0] + offset[0], points[1] + offset[1])
  for (let i = 2; i < points.length; i += 2) {
    const x = points[i] + offset[0]
    const y = points[i + 1] + offset[1]
    ctx.lineTo(x, y)
    sign && ctx.strokeText(`${i / 2}`, x, y)
  }
  if (closed) {
    ctx.lineTo(points[0] + offset[0], points[1] + offset[1])
  }
  ctx.stroke()
  ctx.closePath()
}

const drawPoints = (
  points: number[],
  ctx: CanvasRenderingContext2D,
  offset: [number, number] = [0, 0],
  color = 'blue',
) => {
  for (let i = 0; i < points.length; i += 2) {
    const x = points[i]
    const y = points[i + 1]
    ctx.beginPath()
    ctx.arc(x + offset[0], y + offset[1], 1, 0, 2 * Math.PI, false)
    ctx.fillStyle = color
    ctx.fill()
    ctx.lineWidth = 3
    ctx.strokeStyle = color
    ctx.stroke()
  }
}

const drawCircle = (
  x: number, y: number, r: number,
  ctx: CanvasRenderingContext2D, offset: [number, number] = [0, 0],
  color = 'blue',
) => {
  ctx.beginPath()
  ctx.arc(x + offset[0], y + offset[1], r, 0, 2 * Math.PI, false)
  ctx.lineWidth = 1
  ctx.strokeStyle = color
  ctx.stroke()
}

const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

const poly0 = [
  100, 100,
  200, 100,
  200, 150,
  100, 150
]
const poly1 = [
  160, 80,
  250, 80,
  250, 180,
  160, 180,
]
const poly2 = [
  210, 70,
  280, 70,
  280, 200,
  210, 200,
]
// drawLines(poly0, ctx, [0, 0], true)
// drawLines(poly1, ctx, [0, 0], true)
// drawLines(poly2, ctx, [0, 0], true)
// console.log('poly0 & poly1 intersect: ', PolygonIntersection(poly0, poly1))
// console.log('poly0 & poly2 intersect: ', PolygonIntersection(poly0, poly2))

const IncreasingPoints = [
  50, 100,
  250, 10,
  400, 50,
  500, 100,
  650, 110,
  750, 50,
]

const Derivateives = [
  100, 50,
  300, 200,
  200, 50,
  100, 50,
  200, 50,
  0, -100,
]

const CrossPoints = [
  50, 250,
  200, 150,
  100, 50,
  250, 0,
  400, 50,
  300, 150,
  450, 250,
]

const dataPoints = [
  // 0, 0,
  // 600, 600,
  // 0, 600,
  600, 0,
  50, 250,
  200, 150,
  100, 50,
  300, 150,
  450, 250,
  200, 200,
]

const random = (minNumPoints = 100, maxNumPoints = 200, width = 300, height = 300, offsetX = 30, offsetY = 30) => {
  const pts: number[] = []
  const numpts = Math.floor(Math.random() * (maxNumPoints - minNumPoints + 1)) + minNumPoints
  for (let i = 0; i < numpts; i += 1) {
    const genx = Math.floor(Math.random() * width) + offsetX
    const geny = Math.floor(Math.random() * height) + offsetY
    pts.push(genx, geny)
  }
  return pts
}

const RandomPoints = random(30, 50)
// const { hull, partial } = Chan(RandomPoints)
// const hull = Chan(RandomPoints)
// console.log(partial)
// partial?.forEach((pts) => {
  // drawLines(pts, ctx, [0, 30], true, '#f0f')
// })
// drawLines(hull, ctx, [0, 30], true)
// drawPoints(RandomPoints, ctx, [0, 30])
// const rect = MinAreaBox(hull)
// const rect = MinPerimeterBox(hull)
// console.log(rect)
// drawLines(rect, ctx, [0, 30], true)

// const triangle: [number, number][] = [[10, 200], [120, 110], [300, 400]]
// const { center, r } = triangleCircumcircle(triangle[0], triangle[1], triangle[2])
// drawLines(triangle.flat(), ctx, [0, 30], true)
// drawCircle(center[0], center[1], r, ctx, [0, 30])

const pseudoNormal = () => {
  const v = Math.random() + Math.random()
    + Math.random() + Math.random()
    + Math.random() + Math.random()
  return Math.min((0.5 * (v - 3)) / 3, 1)
}

function gaussian(count: number) {
  const points: number[] = []
  for (let i = 0; i < count; i += 1) {
    points.push(pseudoNormal() * 1e3 + 400, pseudoNormal() * 1e3 + 400)
  }
  return points
}

const DefaultPoints = random(5, 5)
console.log(DefaultPoints)
console.log(AABB(DefaultPoints))
console.log(MinAreaBox(DefaultPoints))
console.log(MinPerimeterBox(DefaultPoints))

const polygonPoints = [
  30, 100,
  80, 50,
  120, 60,
  150, 50,
  180, 100,
  120, 120,
  80, 150,
]
// const polygonPoints = [
//   30, 30,
//   50, 25,
//   // 50, 190,
//   // 150, 200,
//   150, 140,
//   180, 130,
//   180, 230,
//   // 30, 230,
// ]
// drawLines(polygonPoints, ctx, [100, 100], true)

// const halfplane = HalfPlaneIntersection(polygonPoints)
// console.log(halfplane)

// const triangles = MinimumWeightTriangulation(polygonPoints)
// console.log(triangles)
// triangles.forEach((triangle) => {
//   drawLines(triangle, ctx, [30, 100], true)
// })

// const polygon = Chan(uniform(40))
// const polygonTri = PolygonTriangulation(polygon)
// polygonTri.forEach((triangle) => {
//   drawLines(triangle, ctx, [30, 50], true)
// })

// const trianglePoints = uniform(5)
// const trianglePoints = gaussian(50)
// drawPoints(trianglePoints, ctx, [100, 100])
// const convex = Chan(trianglePoints)
// drawLines(convex, ctx, [100, 100], true)

// const res = ClosestPair(trianglePoints)
// const { indice: [i ,j] } = ClosestPair(trianglePoints)
// drawLines([trianglePoints[i * 2], trianglePoints[i * 2 + 1], trianglePoints[j * 2], trianglePoints[j * 2 + 1]], ctx, [100, 100])

// console.log(res)
// const { indice: [i ,j] } = FarthestPair(convex)
// drawLines([convex[i * 2], convex[i * 2 + 1], convex[j * 2], convex[j * 2 + 1]], ctx, [100, 100])

// const triangles = DelaunayTriangulation(trianglePoints)
// triangles.forEach((triangle) => {
//   const points = triangle.flat()
//   const { center, r } = triangle.circumCircle!
//   drawPoints(center, ctx, [100, 100])
//   drawCircle(center[0], center[1], Math.sqrt(r), ctx, [100, 100])
//   drawLines(points, ctx, [100, 100], true, '#ff0000')
// })

// const { r, center } = LargestEmptyCircle(trianglePoints)
// drawCircle(center[0], center[1], r, ctx, [100, 100])


// const edges = VoronoiDiagram(trianglePoints)
// edges.forEach((edge) => {
//   drawLines(edge.flat(), ctx, [100, 100], false)
// })
// const polygon = Chan(trianglePoints)

// borderTri.map((tri) => {
  // drawLines(tri, ctx, [100, 100], true, 'red')
// })
// drawPoints(trianglePoints, ctx, [100, 100])
// drawLines(polygonPoints, ctx, [100, 30], true)
// console.log(edges)

// const result = GrahamScan(trianglePoints)
// const polygon = Chan(trianglePoints)
// const result = JarvisMarch(trianglePoints)
// drawLines(polygon, ctx, [100, 100], true)

// const results = DelaunayTriangulation(polygon)
// const results = MinWeightTriangulation(polygon)
// results.forEach((t, index) => {
//   const tri = t.flat()
//   if (index < 2) {
//     drawLines(tri, ctx, [100, 100], true, true)
//   } else {
//     drawLines(tri, ctx, [100, 100], true)
//   }
// })
// drawLines(results, ctx, [30, 30], true)
// drawPoints(RandomPoints, ctx, [30, 30])

// const spline = new NURBS(CrossPoints)
// const spline = new BSpline(CrossPoints)
// const spline = new BezierSpline(CrossPoints)
// const spline = new CardinalSpline(CrossPoints)
// const spline = new CubicSpline(CrossPoints)
// const spline = new CubicSpline(polygonPoints)
// const spline = new CubicParameterSpline(CrossPoints)
// const spline = new HermiteSpline(CrossPoints)
const spline = new CatmullRomSpline(CrossPoints)
const interpolation = spline.getInterpolation()
drawLines(interpolation, ctx, [0, 30])
drawPoints(spline.dataPoints, ctx, [0, 30])
// console.log(interpolation)

// const CrossPoints = [
//   50, 250,
//   200, 150,
//   100, 50,
//   250, 20,
//   400, 100,
//   350, 150,
//   450, 300,
// ]
// const crossRes = CubicParameterSpline(CrossPoints) ?? []
// drawLines(crossRes, ctx, [0, 200])
// drawPoints(CrossPoints, ctx, [0, 200])

// const CardinalPoints = [
//   30, 80,
//   50, 100,
//   250, 10,
//   400, 50,
//   500, 100,
//   650, 110,
//   750, 50,
//   770, 70,
// ]

// const cardinalRes = CardinalSpline(CardinalPoints)
// drawLines(cardinalRes, ctx, [0, 400])
// drawPoints(CardinalPoints, ctx, [0, 400])

// const HermitePoints = [
//   50, 100,
//   250, 10,
//   400, 50,
//   500, 100,
//   650, 110,
//   750, 50,
// ]

// const HermiteDerivateives = [
//   100, 50,
//   300, 200,
//   200, 50,
//   100, 50,
//   200, 50,
//   0, -100,
// ]

// const hermiteRes = HermiteSpline(HermitePoints, 0.01, HermiteDerivateives)
// drawLines(hermiteRes, ctx, [0, 600])
// drawPoints(HermitePoints, ctx, [0, 600])

// const bPoints = [
//   50, 50,
//   100, 310,
//   200, 40,
//   300, 320,
//   400, 30,
//   500, 330,
//   600, 40,
// ]

// const bRes = NURBS(bPoints)
// const bRes = BSpline(bPoints)
// console.log('result: ', bRes)
// drawLines(bRes, ctx, [0, 50])
// drawPoints(bPoints, ctx, [0, 50])

// const bezierPoints = [
//   50, 100,
//   250, 10,
//   400, 50,
//   500, 100,
//   650, 110,
//   750, 50,
// ]

// const { results, controls } = BezierSmoothSpline(bezierPoints)
// drawLines(results, ctx, [0, 700])
// drawPoints(bezierPoints, ctx, [0, 700])
// const ctrs = controls.map((v) => [v.value[0], v.value[1]]).flat()
// drawPoints(ctrs, ctx, [0, 700], 'red')

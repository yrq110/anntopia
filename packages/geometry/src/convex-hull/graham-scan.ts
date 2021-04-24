import { Vec2 } from '../util/type'

const angleToPoint = (p1: Vec2, p2: Vec2) => Math.atan2(p1[1] - p2[1], p2[0] - p1[0])

const getAreaBetween3Points = (p1: Vec2, p2: Vec2, p3: Vec2) => (
  // reversed the y because js coordinates
  (p2[0] - p1[0]) * (p1[1] - p3[1]) - (p3[0] - p1[0]) * (p1[1] - p2[1])
)

/**
 * 3 points are defined as being "left" if the area
 * between them using the area calculation is positive.
 */
function checkIfLeftTurn(p1: Vec2, p2: Vec2, p3: Vec2) {
  return getAreaBetween3Points(p1, p2, p3) > 0
}

const GrahamScan = (points: number[]) => {
  const n = points.length / 2
  const pts: Vec2[] = new Array(n).fill(0).map((_, i) => [points[i * 2], points[i * 2 + 1]])

  if (pts.length < 4) return points

  let lowestPt = pts[0]

  // find lowest point
  for (let i = 1; i < n; i += 1) {
    if (
      (pts[i][1] === lowestPt[1] && pts[i][0] < lowestPt[0])
      || pts[i][1] > lowestPt[1]
    ) {
      lowestPt = pts[i]
    }
  }

  // sort the array by angle
  pts.sort((a, b) => {
    // a is lowest point
    if (a[1] === lowestPt[1] && a[0] === lowestPt[0]) return -1
    // b is lowest point
    if (b[1] === lowestPt[1] && b[0] === lowestPt[0]) return 1
    // neither
    const angleA = angleToPoint(lowestPt, a)
    const angleB = angleToPoint(lowestPt, b)
    if (angleA > angleB) return 1
    return -1
  })

  // remove doubles
  let i = 0
  while (i < n - 1) {
    if (pts[i][0] === pts[i + 1][0] && pts[i][1] === pts[i + 1][1]) {
      points.splice(i + 1, 0)
    }
    i += 1
  }

  const stack: Vec2[] = [pts[0], pts[1]]
  let index = 2
  let stacklen = stack.length
  while (index < n) {
    stacklen = stack.length

    if (stacklen > 1) {
      // make sure there's at least 2 things before left test
      const l = checkIfLeftTurn(stack[stacklen - 2], stack[stacklen - 1], pts[index])
      if (l) {
        stack.push(pts[index])
        index += 1
      } else {
        stack.pop()
      }
    } else {
      stack.push(pts[index])
      index += 1
    }
  }

  return stack.flat()
}

export default GrahamScan

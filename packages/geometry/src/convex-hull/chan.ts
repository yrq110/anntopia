import GrahamScan from './graham-scan'
import { IPoint2D } from '../util/type'

const getAngleBetween3Points = (p1: IPoint2D, p2: IPoint2D, p3: IPoint2D) => {
  const ab = Math.sqrt((p2[0] - p1[0]) ** 2 + (p2[1] - p1[1]) ** 2)
  const bc = Math.sqrt((p2[0] - p3[0]) ** 2 + (p2[1] - p3[1]) ** 2)
  const ac = Math.sqrt((p3[0] - p1[0]) ** 2 + (p3[1] - p1[1]) ** 2)
  return Math.acos((bc * bc + ab * ab - ac * ac) / (2 * bc * ab))
}

const isSamePoint = (p1: IPoint2D, p2: IPoint2D) => (
  p1[0] === p2[0] && p1[1] === p2[1]
)

function tangentBinarySearch(hull: IPoint2D[], p1: IPoint2D, p2: IPoint2D) {
  const { length } = hull

  let start = 0
  let end = length - 1
  let leftSplit = -1
  let rightSplit = -1

  let searchSize = (end - start) + 1
  // doing a variation of binary search by comparing range of values instead
  // because the order is wrapped around the section containing the larger value
  // will be larger on the ends

  const findAngle = (index: number) => (isSamePoint(p2, hull[index])
    ? -999
    : getAngleBetween3Points(p1, p2, hull[index]))

  if (searchSize === 1) return 0
  if (searchSize === 2) {
    const ret0 = findAngle(0)
    const ret1 = findAngle(1)
    if (ret0 > ret1) return 0
    return 1
  }

  while (searchSize > 2) {
    searchSize = (end - start) + 1

    const startAngle = findAngle(start)
    const endAngle = findAngle(end)
    const split = Math.floor((searchSize) / 2) + start
    let mid = 0
    if (searchSize % 2 === 0) {
      leftSplit = split - 1
      rightSplit = split
    } else {
      mid = split
      leftSplit = split - 1
      rightSplit = split + 1
    }

    const leftAngle = findAngle(leftSplit)
    const rightAngle = findAngle(rightSplit)
    const midAngle = mid ? findAngle(mid) : -9999
    const maxLeft = Math.max(startAngle, leftAngle)
    const maxRight = Math.max(rightAngle, endAngle)
    if (midAngle >= leftAngle && midAngle >= rightAngle) {
      return mid
    }
    if (maxLeft > maxRight) {
      end = leftSplit
      if (startAngle === leftAngle) return end
    } else {
      start = rightSplit
      if (rightAngle === endAngle) return start
    }
  }
  return start
}

const JarvisMarchHulls = (m: number, hulls: number[][]) => {
  const n = hulls.length
  const getHullPoints = (index: number): IPoint2D[] => new Array(hulls[index].length / 2).fill(0)
    .map((_, i) => [hulls[index][i * 2], hulls[index][i * 2 + 1]])

  // do not need to Jarvis march if there is only one subhull. This is our convex hull.
  if (n === 1) return hulls[0]

  // sort sub hulls by their lowest point.
  hulls.sort((a, b) => {
    if (a[1] < b[1]) return 1
    return -1
  })

  const convexhull: IPoint2D[] = [getHullPoints(0)[0]]

  // initial search point set to (0, first point in the full hull) for tangent search purposes
  const p0: IPoint2D = [0, convexhull[0][1]]

  for (let i = 0; i < m; i += 1) {
    let maxAngle = -99999999
    let pk1: IPoint2D = [0, 0]
    const last: IPoint2D = (i === 0) ? p0 : convexhull[i - 1]
    for (let j = 0; j < n; j += 1) {
      const result = tangentBinarySearch(getHullPoints(j), last, convexhull[i])
      const angle = getAngleBetween3Points(last, convexhull[i], getHullPoints(j)[result])

      if (!Number.isNaN(angle) && angle > maxAngle) {
        maxAngle = angle
        pk1 = getHullPoints(j)[result]
      }
    }
    // went full circle, have convex hull
    if (pk1[0] === convexhull[0][0] && pk1[1] === convexhull[0][1]) {
      return convexhull.flat()
    }
    convexhull.push(pk1)
  }
  return false
}

// source: https://github.com/lisa-yaqing-xu/ChanConvexHull
const Chan = (points: number[]) => {
  const getPartialHulls = (m: number, pts: number[]) => {
    const n = pts.length / 2
    let phIndex = 0
    const partition: IPoint2D[][] = [[]]

    for (let i = 0; i < n; i += 1) {
      if (i >= (phIndex + 1) * m) {
        phIndex += 1
        partition.push([])
      }
      partition[phIndex].push([pts[i * 2], pts[i * 2 + 1]])
    }

    const hulls: number[][] = []
    for (let i = 0; i < partition.length; i += 1) {
      const h = GrahamScan(partition[i].flat())
      hulls.push(h)
    }

    return hulls
  }

  let finalHull: number[] | boolean | null = null
  let partialHulls: number[][] = []

  if (points.length > 3) {
    let exp = 1
    while (!finalHull) {
      const m = 2 ** (2 ** exp)
      partialHulls = getPartialHulls(m, points)
      finalHull = JarvisMarchHulls(m, partialHulls)
      exp += 1
    }
  } else {
    finalHull = points
  }
  return finalHull ?? []
}

export default Chan

import { IPoint2D, ICircle } from '../util/type'

export const triangleCircumcircle = (p0: IPoint2D, p1: IPoint2D, p2: IPoint2D): ICircle => {
  const center: IPoint2D = [0, 0]

  const A = p1[0] - p0[0]
  const B = p1[1] - p0[1]
  const C = p2[0] - p0[0]
  const D = p2[1] - p0[1]
  const E = A * (p0[0] + p1[0]) + B * (p0[1] + p1[1])
  const F = C * (p0[0] + p2[0]) + D * (p0[1] + p2[1])
  const G = 2 * (A * (p2[1] - p1[1]) - B * (p2[0] - p1[0]))

  let dx = 0
  let dy = 0

  if (Math.round(Math.abs(G)) === 0) {
    const minx = Math.min(p0[0], p1[0], p2[0])
    const miny = Math.min(p0[1], p1[1], p2[1])
    const maxx = Math.max(p0[0], p1[0], p2[0])
    const maxy = Math.max(p0[1], p1[1], p2[1])
    center[0] = (minx + maxx) / 2
    center[1] = (miny + maxy) / 2
    dx = center[0] - minx
    dy = center[1] - miny
  } else {
    const cx = (D * E - B * F) / G
    const cy = (A * F - C * E) / G

    center[0] = cx
    center[1] = cy

    dx = cx - p0[0]
    dy = cy - p0[1]
  }

  const radius = dx ** 2 + dy ** 2

  return { center, r: radius }
}

export default class Triangle {
  p0: IPoint2D

  p1: IPoint2D

  p2: IPoint2D

  circumCircle?: ICircle

  constructor(p0: IPoint2D, p1: IPoint2D, p2: IPoint2D, circumCircle = false) {
    this.p0 = p0
    this.p1 = p1
    this.p2 = p2
    if (circumCircle) {
      this.circumCircle = triangleCircumcircle(p0, p1, p2)
    }
  }

  flat() {
    return [...this.p1, ...this.p2, ...this.p0]
  }
}

import { Vec2, squaredLength, squaredDistance } from '../util'

export default class Point2D {
  private val: Vec2

  constructor(x?: number, y?: number) {
    this.val = [x ?? 0, y ?? 0]
  }

  get value() {
    return this.val
  }

  get x() {
    return this.val[0]
  }

  get y() {
    return this.val[1]
  }

  set(x: number, y: number) {
    this.val[0] = x
    this.val[1] = y
  }

  add(point: Point2D) {
    this.val[0] += point.x
    this.val[1] += point.y
    return this
  }

  subtract(point: Point2D) {
    this.val[0] -= point.x
    this.val[1] -= point.y
    return this
  }

  addScalar(n: number) {
    this.val[0] += n
    this.val[1] += n
    return this
  }

  scale(n: number) {
    this.val[0] *= n
    this.val[1] *= n
    return this
  }

  sqrLen() {
    return squaredLength(this.val)
  }

  sqrDist(p: Point2D) {
    return squaredDistance(p.value, this.val)
  }

  clone() {
    return new Point2D(this.val[0], this.val[1])
  }
}

export const createPointAccessor = (points: number[]) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  (index: number) => new Point2D(points[index * 2], points[index * 2 + 1])

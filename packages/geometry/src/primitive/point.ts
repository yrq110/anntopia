import { vec2 } from 'gl-matrix'

export default class Point2D {
  private val: vec2

  constructor(x?: number, y?: number) {
    if (!Number.isNaN(x) && !Number.isNaN(y)) {
      this.val = vec2.fromValues(x ?? 0, y ?? 0)
    } else {
      this.val = vec2.create()
    }
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
    vec2.add(this.val, this.val, point.val)
    return this
  }

  subtract(point: Point2D) {
    vec2.subtract(this.val, this.val, point.val)
    return this
  }

  addScalar(n: number) {
    this.val[0] += n
    this.val[1] += n
    return this
  }

  scale(n: number) {
    vec2.scale(this.val, this.val, n)
    return this
  }

  sqrLen() {
    return vec2.sqrLen(this.val)
  }

  sqrDist(p: Point2D) {
    return vec2.sqrDist(p.value, this.val)
  }

  clone() {
    return new Point2D(this.val[0], this.val[1])
  }
}

export const createPointAccessor = (points: number[]) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  (index: number) => new Point2D(points[index * 2], points[index * 2 + 1])

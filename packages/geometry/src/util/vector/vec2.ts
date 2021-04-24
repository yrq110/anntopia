import { Vec2 } from '../type'

export const crossProduct = (v0: Vec2, v1: Vec2) => v0[0] * v1[1] - v0[1] * v1[0]

export const dotProduct = (v0: Vec2, v1: Vec2) => v0[0] * v1[0] + v0[1] * v1[1]

export const squaredDistance = (p0: Vec2, p1: Vec2) => (
  (p0[0] - p1[0]) ** 2 + (p0[1] - p1[1]) ** 2
)

export const distance = (p0: Vec2, p1: Vec2) => Math.sqrt(squaredDistance(p0, p1))

export const squaredLength = (v: Vec2) => (v[0] ** 2 + v[1] ** 2)

export const length = (v: Vec2) => Math.sqrt(squaredLength(v))

export const angle = (v0: Vec2, v1: Vec2) => {
  const d = dotProduct(v0, v1)
  const n = length(v0) * length(v1)
  return Math.acos(d / n)
}

export const rotate = (target: Vec2, origin: Vec2, rad: number) => {
  const out: Vec2 = [0, 0]

  // Translate point to the origin
  const p0 = target[0] - origin[0]
  const p1 = target[1] - origin[1]
  const sinC = Math.sin(rad)
  const cosC = Math.cos(rad)

  // perform rotation and translate to correct position
  out[0] = p0 * cosC - p1 * sinC + origin[0]
  out[1] = p0 * sinC + p1 * cosC + origin[1]

  return out
}

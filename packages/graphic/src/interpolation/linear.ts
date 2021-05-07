import { Vec2 } from '@anntopia/geometry'

export const LinearInterpolation = (p0: Vec2, p1: Vec2) => {
  const [x0, y0] = p0
  const [x1, y1] = p1
  if (x0 === x1 && y0 === y1) {
    throw new Error('Two points in LinearInterpolation can not be the same!')
  }
  return (x: number) => {
    if (x === x0) return y0
    if (x === x1) return y1
    const y = ((x1 - x) * y0 + (x - x0) * y1) / (x1 - x0)
    return y
  }
}

export default LinearInterpolation

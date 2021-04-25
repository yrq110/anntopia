import { createRequire } from 'module'

export const require = createRequire(import.meta.url)

const DefaultWidth = 300
const DefaultHeight = 300

export const uniform = (
  count,
  x = 0, y = 0,
  width = DefaultWidth, height = DefaultHeight,
) => {
  const points = []
  for (let i = 0; i < count; i += 1) {
    points.push(Math.random() * width + x, Math.random() * height + y)
  }
  return points
}

export const gaussian = (
  count,
  x = 0, y = 0,
  width = DefaultWidth, height = DefaultHeight,
) => {
  const points = []
  for (let i = 0; i < count; i += 1) {
    points.push((pseudoNormal() + 0.5) * width + x, (pseudoNormal() + 0.5) * height + y)
  }
  return points
}

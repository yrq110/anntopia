const DefaultWidth = 300
const DefaultHeight = 300

export const uniform = (
  count,
  offsetX = 0, offsetY = 0,
  width = DefaultWidth, height = DefaultHeight,
) => {
  const points = []
  for (let i = 0; i < count; i += 1) {
    points.push(Math.random() * width + offsetX, Math.random() * height + offsetY)
  }
  return points
}

export const gaussian = (
  count,
  offsetX = 0, offsetY = 0,
  width = DefaultWidth, height = DefaultHeight,
) => {
  const points = []
  for (let i = 0; i < count; i += 1) {
    points.push((pseudoNormal() + 0.5) * width + offsetX, (pseudoNormal() + 0.5) * height + offsetY)
  }
  return points
}

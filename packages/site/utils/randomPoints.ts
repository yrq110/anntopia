const DefaultWidth = 300
const DefaultHeight = 300

export const uniform = (
  count: number,
  offsetX = 0, offsetY = 0,
  width = DefaultWidth, height = DefaultHeight,
) => {
  const points = []
  for (let i = 0; i < count; i += 1) {
    points.push(Math.random() * width + offsetX, Math.random() * height + offsetY)
  }
  return points
}

export const grid = (count: number) => {
  const points = []
  const size = Math.sqrt(count)
  for (let i = 0; i < size; i += 1) {
    for (let j = 0; j < size; j += 1) {
      points.push(i, j)
    }
  }
  return points
}

export const pseudoNormal = () => {
  const v = Math.random() + Math.random()
    + Math.random() + Math.random()
    + Math.random() + Math.random()
  return Math.min((0.5 * (v - 3)) / 3, 1)
}

export const gaussian = (
  count: number,
  offsetX = 0, offsetY = 0,
  width = DefaultWidth, height = DefaultHeight,
) => {
  const points = []
  for (let i = 0; i < count; i += 1) {
    points.push((pseudoNormal() + 0.5) * width + offsetX, (pseudoNormal() + 0.5) * height + offsetY)
  }
  return points
}

export const degenerate = (count: number, width = DefaultWidth, height = DefaultHeight) => {
  const points = [0, 0]
  for (let i = 0; i < count; i += 1) {
    const angle = (2 * Math.PI * i) / count
    points.push(width * Math.sin(angle), height * Math.cos(angle))
  }
  return points
}

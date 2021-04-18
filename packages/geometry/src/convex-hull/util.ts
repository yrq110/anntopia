export const isConvex = (points: number[]) => {
  const n = points.length / 2
  if (n < 4) return true
  for (let i = 0; i < n; i += 1) {
    const p0 = [points[(i % n) * 2], points[(i % n) * 2 + 1]]
    const p1 = [points[((i + 1) % n) * 2], points[((i + 1) % n) * 2 + 1]]
    const p2 = [points[((i + 2) % n) * 2], points[((i + 2) % n) * 2 + 1]]
    const t = (p0[0] * p2[0]) * (p1[1] - p2[1]) - (p1[0] * p2[0]) * (p0[1] - p2[1])
    if (t < 0) return false
  }
  return true
}

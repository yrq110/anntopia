/** shoelace algorithm */
const Shoelace = (points: number[]) => {
  const n = points.length / 2
  let res = 0

  for (let i = 0; i < n; i += 1) {
    res += points[i * 2] * points[((i + 1) % n) * 2 + 1]
    res -= points[((i + 1) % n) * 2] * points[i * 2 + 1]
  }

  return Math.abs(res / 2)
}

export default Shoelace

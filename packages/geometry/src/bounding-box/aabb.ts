const AxisAlignedBox = (points: number[]) => {
  let minx = Number.MAX_SAFE_INTEGER
  let miny = Number.MAX_SAFE_INTEGER
  let maxx = Number.MIN_SAFE_INTEGER
  let maxy = Number.MIN_SAFE_INTEGER
  for (let i = 0; i < points.length / 2; i += 1) {
    const [x, y] = [points[i * 2], points[i * 2 + 1]]
    minx = Math.min(x, minx)
    maxx = Math.max(x, maxx)
    miny = Math.min(y, miny)
    maxy = Math.max(y, maxy)
  }
  return [minx, miny, maxx, maxy]
}

export default AxisAlignedBox

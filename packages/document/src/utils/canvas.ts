import { ConvexHull } from '@anntopia/geometry'

export const setBackgroundColor = (
  color: string,
  ctx: CanvasRenderingContext2D,
) => {
  ctx.fillStyle = color
  const { clientWidth, clientHeight } = ctx.canvas
  ctx.fillRect(0, 0, clientWidth, clientHeight)
}

export const drawPoints = (
  points: number[],
  ctx: CanvasRenderingContext2D,
  offset: [number, number] = [0, 0],
  color = 'blue',
) => {
  for (let i = 0; i < points.length; i += 2) {
    const x = points[i]
    const y = points[i + 1]
    ctx.beginPath()
    ctx.arc(x + offset[0], y + offset[1], 1, 0, 2 * Math.PI, false)
    ctx.fillStyle = color
    ctx.fill()
    ctx.lineWidth = 5
    ctx.strokeStyle = color
    ctx.stroke()
  }
}

export const drawLines = (
  points: number[],
  ctx: CanvasRenderingContext2D,
  offset: [number, number] = [0, 0],
  closed = false,
  color = '#ff00ff',
) => {
  ctx.strokeStyle = color
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(points[0] + offset[0], points[1] + offset[1])
  for (let i = 2; i < points.length; i += 2) {
    const x = points[i] + offset[0]
    const y = points[i + 1] + offset[1]
    ctx.lineTo(x, y)
  }
  if (closed) {
    ctx.lineTo(points[0] + offset[0], points[1] + offset[1])
  }
  ctx.stroke()
  ctx.closePath()
}

export const drawCircle = (
  x: number, y: number, r: number,
  ctx: CanvasRenderingContext2D,
  offset: [number, number] = [0, 0],
  color = 'blue',
) => {
  ctx.beginPath()
  ctx.arc(x + offset[0], y + offset[1], r, 0, 2 * Math.PI, false)
  ctx.lineWidth = 1
  ctx.strokeStyle = color
  ctx.stroke()
}

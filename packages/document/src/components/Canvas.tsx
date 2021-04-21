import React, { FC, useEffect, useState } from 'react'
import {
  setBackgroundColor, drawLines, drawPoints, drawCircle,
} from '../utils/canvas'

export type CanvasParam = {
  points?: number[]
  lines?: number[][]
  polygons?: number[][]
  circles?: any[]
  pointColor?: string
  lineColor?: string
}

type Size = {
  width: number
  height: number
}

const Canvas: FC<CanvasParam> = ({ ...props }) => {
  const {
    points, lines, polygons, circles,
  } = props
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const [size, setSize] = useState<Size>({ width: 0, height: 0 })

  const render = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

    setBackgroundColor('white', ctx)

    if (lines) {
      lines.forEach((line) => drawLines(line, ctx))
    }
    if (polygons) {
      polygons.forEach((polygon) => {
        polygon.push(polygon[0], polygon[1])
        drawLines(polygon, ctx)
      })
    }
    if (circles) {
      circles.forEach((circle) => {
        const { r, center: [x, y] } = circle
        drawCircle(x, y, r, ctx)
      })
    }
    if (points) drawPoints(points, ctx)
  }

  useEffect(() => {
    render()
  }, [size])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const { clientWidth, clientHeight } = canvas.parentElement!
    setSize({
      width: Math.max(300, clientWidth),
      height: Math.max(300, clientHeight),
    })
  }, [canvasRef.current])

  return (
    <canvas
      ref={canvasRef}
      width={size.width}
      height={size.height}
    />
  )
}

export default Canvas

export type HermiteSplineConfig = {
  derivatives: number[]
}

export const DefaultHermiteConfig = (length: number): HermiteSplineConfig => ({
  derivatives: new Array(length).fill(0),
})

export type CardinalSplineConfig = {
  vs: [number, number], // start virtual point
  ve: [number, number], // end virtual point
  tension: number
}

export const DefaultCardinalConfig = (start: number[], end: number[]): CardinalSplineConfig => ({
  vs: [start[0] + 0.01, start[1] + 0.01],
  ve: [end[0] + 0.01, end[1] + 0.01],
  tension: 0.1,
})

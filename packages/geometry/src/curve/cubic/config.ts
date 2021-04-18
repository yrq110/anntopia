export enum BoundaryCondition {
  Natural,
  Clamped,
  NotAKnot
}

export type CubicSplineConfig = {
  boundary: BoundaryCondition,
  derivatives: [number, number]
}

export const DefaultConfig: CubicSplineConfig = {
  boundary: BoundaryCondition.Natural,
  derivatives: [0, 0],
}

export type BezierSplineConfig = {
  tension: number,
  closed: boolean,
}

export const DefaultBezierConfig: BezierSplineConfig = {
  tension: 0.5,
  closed: false,
}

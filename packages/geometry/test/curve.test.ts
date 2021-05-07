import {
  CubicSpline, CubicParameterSpline,
  HermiteSpline, CardinalSpline,
  BezierSpline, BSpline, NURBS,
} from '../src/curve'

describe('Curve', () => {
  const DefaultPoints = [30, 100, 80, 50, 120, 60, 30, 50]

  describe('Common function', () => {
    test('interpolation', () => {
      const spline = new BezierSpline(DefaultPoints)
      expect(() => { spline.getInterpolation() }).not.toThrow()
    })

    test('custom config', () => {
      const spline = new BezierSpline(DefaultPoints)
      const newConfig = { tension: 0.1 }
      spline.setConfig(newConfig)
      const currentConfig = spline.getConfig()
      expect(currentConfig).toEqual(currentConfig)
    })

    test('custom step', () => {
      const spline = new BezierSpline(DefaultPoints)
      const newStep = 0.01
      spline.setStep(newStep)
      const currentStep = spline.getStep()
      expect(currentStep).toEqual(newStep)
    })
  })

  describe('Cubic spline', () => {
    test('cubic spline validation:x-trend', () => {
      const spline = new CubicSpline(DefaultPoints)
      expect(() => { spline.getInterpolation() })
        .toThrowError('CubicSpline: the trend of x in dataPoints should be one direction')
    })

    test('cubic spline validation:derivatives', () => {
      const points = [30, 100, 80, 50, 120, 60, 150, 50]
      const spline = new CubicSpline(points, {
        boundary: 1,
        derivatives: [100] as any,
      })
      expect(() => { spline.getInterpolation() })
        .toThrowError('CubicSpline: need to set two derivatives at start and end points when set clamped boundary condition')
    })

    test('cubic spline validation:derivatives', () => {
      const spline = new CubicParameterSpline(DefaultPoints, {
        boundary: 1,
        derivatives: [100] as any,
      })
      expect(() => { spline.getInterpolation() })
        .toThrowError('CubicParameterSpline: need to set two derivatives at start and end points when set clamped boundary condition')
    })
  })

  describe('Hermite spline', () => {
    test('hermite spline validation:derivatives', () => {
      const spline = new HermiteSpline(DefaultPoints, {
        derivatives: [1],
      })
      expect(() => { spline.getInterpolation() })
        .toThrowError('HermiteSpline: need derivative at each data point')
    })

    test('cardinal spline validation:virtual points', () => {
      const spline = new CardinalSpline(DefaultPoints, {
        vs: undefined,
      })
      expect(() => { spline.getInterpolation() })
        .toThrowError('CardinalSpline: need start and end virtual points')
    })
  })

  describe('Bezier spline', () => {
    test('bezier spline validation:point number', () => {
      const spline = new BezierSpline([10, 20, 20, 10])
      expect(() => { spline.getInterpolation() })
        .toThrowError('BezierSpline: need at least 3 points')
    })
  })

  describe('B-spline', () => {
    test('b spline validation:knot number', () => {
      const spline = new BSpline(DefaultPoints, {
        knots: [1],
      })
      expect(() => { spline.getInterpolation() })
        .toThrowError('BSpline: need to set enough knots')
    })

    test('NURBS validation:knot number', () => {
      const spline = new NURBS(DefaultPoints, {
        knots: [1],
      })
      expect(() => { spline.getInterpolation() })
        .toThrowError('NURBS: need to set enough knots')
    })
  })
})

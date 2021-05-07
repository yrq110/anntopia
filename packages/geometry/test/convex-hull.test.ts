/* eslint-disable max-len */
import {
  GrahamScan, JarvisMarch, Chan,
} from '../src/convex-hull'

describe('ConvexHull', () => {
  const DefaultPoints = [113, 324, 164, 57, 221, 200, 313, 245, 191, 287]

  test('GrahamScan', () => {
    const polygon = GrahamScan(DefaultPoints)
    const result = [113, 324, 313, 245, 164, 57]
    expect(polygon).toEqual(result)
  })

  test('JarvisMarch', () => {
    const polygon = JarvisMarch(DefaultPoints)
    const result = [313, 245, 113, 324, 164, 57]
    expect(polygon).toEqual(result)
  })

  test('Chan', () => {
    const polygon = Chan(DefaultPoints)
    const result = [113, 324, 313, 245, 164, 57]
    expect(polygon).toEqual(result)
  })
})

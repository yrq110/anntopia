/* eslint-disable max-len */
import {
  AABB, MinAreaBox, MinPerimeterBox,
} from '../src/bounding-box'

describe('BoundingBox', () => {
  const DefaultPoints = [113, 324, 164, 57, 221, 200, 313, 245, 191, 287]

  test('AABB', () => {
    const box = AABB(DefaultPoints)
    const result = [113, 57, 113, 324, 313, 324, 313, 57]
    expect(box).toEqual(result)
  })

  test('MinAreaBox', () => {
    const box = MinAreaBox(DefaultPoints)
    const result = [112.99999999999997, 324, 291.40109622411694, 358.0766138855055, 342.40109622411694, 91.07661388550551, 164, 57]
    expect(box).toEqual(result)
  })

  test('MinPerimeterBox', () => {
    const box = MinPerimeterBox(DefaultPoints)
    const result = [227.90889526542324, 31.525824964132, 28.156637690944393, 111.14735420710608, 113.24774242552115, 324.62152924297413, 313, 245.00000000000003]
    expect(box).toEqual(result)
  })
})

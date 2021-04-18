import CurveData from '../data/curve'

describe('hello', () => {
  test('world', () => {
    const data = CurveData.bezier

    expect(data.source)
      .toEqual(expect.arrayContaining(data.expect))
  })
})

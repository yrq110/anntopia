import { TestData } from '.'

type CurveTestData = TestData<number[], number[]>

const bezierData: CurveTestData = {
  source: [1],
  expect: [1],
}

export default {
  bezier: bezierData,
}

import { Vec4, Mat4 } from '../type'

export const transformMat4 = (v: Vec4, m: Mat4) => {
  const out: Vec4 = [0, 0, 0, 0]
  const x = v[0]
  const y = v[1]
  const z = v[2]
  const w = v[3]
  out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w
  out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w
  out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w
  out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w
  return out
}

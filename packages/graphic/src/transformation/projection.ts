type CameraParam = {
  near: number,
  far: number,
  top: number,
  bottom: number,
  left: number,
  right: number,
}

export const PerspectiveMatrix = (d: number) => [
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 1 / d,
  0, 0, 0, 1,
]

export const OrthographicMatrix = () => [
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 0, 0,
  0, 0, 0, 1,
]

export const PerspectiveToNDC = (cameraParam: CameraParam) => {
  const {
    near, far, top, bottom, left, right,
  } = cameraParam
  return [
    2 / (right - left), 0, 0, (right + left) / (right - left),
    0, 2 / (top - bottom), 0, (top + bottom) / (top - bottom),
    0, 0, -2 * (far - near), -(far + near) / (far - near),
    0, 0, 0, 0,
  ]
}

export const OrthographicToNDC = (cameraParam: CameraParam) => {
  const {
    near, far, top, bottom, left, right,
  } = cameraParam
  return [
    (2 * near) / (right - left), 0, (right + left) / (right - left), 0,
    0, (2 * near) / (top - bottom), (top + bottom) / (top - bottom), 0,
    0, 0, -(far + near) / (far - near), (2 * far * near) / (far - near),
    0, 0, 0, 0,
  ]
}

# Anntopia

> Currently in highly experimental stage

[Document](https://yrq110.me/anntopia)

## Packages

### [@anntopia/geometry](packages/geometry/README.md)

| ![](assets/curve.png) | ![](assets/bbox.png) | ![](assets/convex.png) |
| ---- | --- | --- |
| [Curve](https://yrq110.me/anntopia/geometry/curve) | [BoundingBox](https://yrq110.me/anntopia/geometry/bounding-box) | [ConvexHull](https://yrq110.me/anntopia/geometry/convex-hull) |
| ![](assets/triangulation.png) | ![](assets/distance.png) | ![](assets/area.png) |
| [Triangulation]((https://yrq110.me/anntopia/geometry/triangulation)) | [Distance]((https://yrq110.me/anntopia/geometry/distance)) | [Area]((https://yrq110.me/anntopia/geometry/area)) |

### @anntopia/graphic (Todo)
### @anntopia/image (Todo)

## Installing

```shell
$ yarn add @anntopia/geometry
# or
$ npm install @anntopia/geometry
```

## Getting Started

```js
import { Chan, BezierSpline } from '@anntopia/geometry'

const randomPoints = uniform(40) // [x0, y0, x1, y1, ...]
const polygon = Chan(randomPoints)

const dataPoints = [50, 250, 200, 150, 100, 50, 250, 70, 400, 50, 450, 250]
const spline = new BezierSpline(dataPoints, { tension: 0.3 }, 0.01)
let splinePoints = spline.getInterpolation()
spline.setConfig({ tension: 0.7 })
spline.setStep(0.005)
splinePoints = spline.getInterpolation()
```

## License

[MIT](http://opensource.org/licenses/MIT)

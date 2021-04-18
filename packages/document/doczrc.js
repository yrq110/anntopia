export default {
  port: 3030,
  title: 'Anntopia',
  description: 'A typescript computing geometry and visual computing toolkit',
  typescript: true,
  propsParser: false,
  repository: 'https://github.com/yrq110/anntopia',
  menu: [
    'Overview',
    'Getting Started',
    {
      name: 'Geometry',
      menu: [
        'Overview',
        'Curve',
        'Bounding Box',
        'Convex Hull',
        'Triangulation',
        'Boolean Operation',
        'Distance',
        'Area',
      ],
    },
    {
      name: 'Graphic',
      menu: [
        'Overview',
        'Transformation',
        'Interpolation',
      ],
    },
    {
      name: 'Image',
      menu: [
        'Overview',
        'Noise',
        'Filter',
      ],
    },
  ],
}

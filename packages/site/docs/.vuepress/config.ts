import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'
import { path } from '@vuepress/utils'


export default defineUserConfig<DefaultThemeOptions>({
  lang: 'en-US',
  title: 'Anntopia',
  description: 'A typescript computing geometry and visual computing toolkit',

  base: "/anntopia/",
  plugins: [
    '@vuepress/plugin-search',
    [
      '@vuepress/register-components',
      {
        componentsDir: path.resolve(__dirname, '../../components'),
      },
    ],
  ],
  theme: '@vuepress/theme-default',
  themeConfig: {
    // logo: 'https://vuejs.org/images/logo.png',
    repo: 'https://github.com/yrq110/anntopia',
    sidebar: [
      '/index.md',
      {
        text: 'Geometry',
        collapsible: true,
        children: [
          '/geometry/index.md',
          '/geometry/curve.md',
          '/geometry/bounding-box.md',
          '/geometry/convex-hull.md',
          '/geometry/triangulation.md',
          '/geometry/boolean-operation.md',
          '/geometry/distance.md',
          '/geometry/area.md',
        ],
      }
    ]
  },
})
import esbuild from 'rollup-plugin-esbuild'
import { terser } from "rollup-plugin-terser";
import path from 'path'

const inputFilePath = path.join(__dirname, 'src/index.ts')
const tsconfigPath = path.join(__dirname, 'tsconfig.json')
const packagePath = path.join(__dirname, 'package.json')

const name = require(packagePath).main.replace(/\.cjs$/, '')
const bundle = config => ({
  ...config,
  input: inputFilePath,
  external: id => !/^[./]/.test(id),
})

export default [
  bundle({
    plugins: [
      esbuild({
        tsconfig: tsconfigPath
      }),
      terser(),
    ],
    output: [
      {
        file: `${name}.cjs`,
        format: 'cjs',
        sourcemap: false,
      },
      {
        file: `${name}.mjs`,
        format: 'es',
        sourcemap: false,
      },
    ],
  }),
]
// @ts-check
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import typescript from 'rollup-plugin-typescript2'

const { isProd } = require('./tasks/config')

const reactComponents = ['PureComponent', 'createElement', 'Fragment', 'lazy',
  'Suspense', 'StrictMode', 'memo', 'useState']

export default {
  experimentalCodeSplitting: true,
  input: [
    'src/main.tsx'
  ],
  output: [
    {
      dir: 'temp/dist/esm',
      format: 'es',
      // sourcemap: true
    },
    {
      dir: 'temp/dist/sys',
      format: 'system',
      // sourcemap: true
    }
  ],
  plugins: [
    resolve(),
    commonjs({
      namedExports: {
        'react': reactComponents,
        'react-dom': ['render'],
      }
    }),
    typescript({ cacheRoot: './temp/.rts2_cache' }),
    replace({
      'process.env.NODE_ENV': isProd ? JSON.stringify('production') : JSON.stringify('development')
    }),
  ]
}

import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import base from './rollup.baseconf.mjs'
import typescript from 'rollup-plugin-typescript2'

const isProd = process.env.NODE_ENV === 'production'
const components = ['PureComponent', 'createElement', 'Fragment', 'lazy', 'Suspense', 'StrictMode', 'memo']

export default {
  ...base,
  plugins: [
    resolve(),
    commonjs({
      namedExports: {
        'react': components,
        'react-dom': ['render'],
      }
    }),
    typescript({ cacheRoot: './temp/.rts2_cache' }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
}

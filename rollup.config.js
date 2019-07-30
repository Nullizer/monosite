// @ts-check
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import typescript from 'rollup-plugin-typescript2'
import { sep } from 'path'

const { isProd } = require('./tasks/config')

const reactComponents = ['PureComponent', 'createElement', 'createContext', 'forwardRef',
  'Fragment', 'lazy', 'Component', 'Suspense', 'StrictMode', 'memo', 'useState', 'useEffect']

export default args => {
  return {
    input: [
      'src/app.tsx'
    ],
    output: [
      {
        dir: `temp/dist/${args.configES5 ? 'es5' : 'esm'}`,
        format: 'esm',
        // sourcemap: !isProd
      }
    ],
    /**
     * @param {string} id
     */
    manualChunks (id) {
      if (id.includes('node_modules/')) {
        const dirsInPath = id.split(sep)
        const moduleName = dirsInPath[dirsInPath.indexOf('node_modules') + 1]
        if (moduleName) return `vendor/${moduleName}`
        return 'vendor/other'
      }
    },
    plugins: [
      resolve(),
      commonjs({
        namedExports: {
          react: reactComponents,
          'react-dom': ['render'],
        }
      }),
      typescript({
        cacheRoot: './temp/.rts2_cache',
        tsconfigOverride: {
          compilerOptions: {
            target: args.configES5 ? 'es5' : 'esnext'
          }
        }
      }),
      replace({
        'process.env.NODE_ENV': isProd ? JSON.stringify('production') : JSON.stringify('development')
      }),
    ]
  }
}

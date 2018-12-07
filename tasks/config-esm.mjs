import config from './config'
import path from 'path'
import rollupBaseConfig from '../rollup.baseconf.mjs'

/**
 * @type {[{ dir: string}]}
 */
const outputs = rollupBaseConfig.output

if (!Array.isArray(outputs)) {
  throw new Error('Rollup output option need to be an Array!')
}

export const distJSPatterns = [
  ...outputs.map(output => output.dir),
  path.join(config.distDir, 'es5/')
].map(dir => path.resolve(dir) + '/**/*.js')

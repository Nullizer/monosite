// @ts-check
const Terser = require('terser')

/**
 * @param {string} code
 * @param {import('terser').MinifyOptions} options
 */
module.exports = function minify (code, options) {
  const result = Terser.minify(code, options)
  if (!result.error) {
    return result.code
  }
}

// @ts-check
const ts = require('typescript')
const fs = require('fs')
const path = require('path')
const fsPromises = fs.promises
const minify = require('./lib/minify')
const { vendorDir } = require('./config')

fsPromises.readFile(path.resolve(__dirname, '../res/old-ie-warn.js')).then(buffer => {
  const content = buffer.toString()
  const es3code = toES3(content)
  const minified = minify(es3code, { output: { comments: 'all' } })
  if (minified) {
    fsPromises.writeFile(path.resolve(vendorDir, 'old-ie-warn.js'), minified)
  } else {
    throw new Error('old-ie-warn.js not minified!')
  }
})

/**
 * @param {string} code
 */
function toES3 (code) {
  return ts.transpileModule(code, {
    compilerOptions: {
      allowJs: true,
      target: ts.ScriptTarget.ES3,
    }
  }).outputText
}

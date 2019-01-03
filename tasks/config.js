// @ts-check
const path = require('path')

const srcDir = path.join(__dirname, '../src/')

const tempDir = path.join(__dirname, '../temp')
const distDir = path.join(tempDir, 'dist/')
const vendorDir = path.join(distDir, 'vendor/')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  srcDir, tempDir, distDir, vendorDir, isProd
}

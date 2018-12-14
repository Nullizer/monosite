// @ts-check
const { resolve } = require('path')
const { src, dest, parallel, series } = require('gulp')
const gulp = require('gulp')
const { srcDir, distDir, vendorDir } = require('./tasks/config')
const rimraf = require('rimraf')

const assetsInSrc = [
  '**/*.html',
  '**/*.css',
  '**/*.ico',
  '**/*.png',
  '**/*.svg',
  '**/xml',
].map(p => srcDir + p)
const SjsSrc = resolve(__dirname, 'node_modules/systemjs/dist/s.min.js')

function copyAssets () {
  return src(assetsInSrc)
    .pipe(dest(distDir))
}

function copySJS () {
  return src(SjsSrc)
    .pipe(dest(vendorDir))
}

function watch () {
  gulp.watch(assetsInSrc, copyAssets)
  gulp.watch(SjsSrc, copySJS)
}

gulp.task('clean:br', () => Promise.resolve(rimraf.sync(distDir + '**/*.br')))

exports.default = exports.copy = parallel(copyAssets, copySJS)
exports.watch = series(exports.copy, watch)

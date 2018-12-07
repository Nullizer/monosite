// @ts-check
const { resolve } = require('path')
const { src, dest, parallel, series } = require('gulp')
const gulp = require('gulp')
const { srcDir, distDir, vendorDir } = require('./tasks/config')
const rimraf = require('rimraf')

const assetsSrc = [
  '**/*.html',
  '**/*.ico',
  '**/*.png',
  '**/*.svg',
  '**/xml',
].map(p => srcDir + p)
const SjsSrc = resolve(__dirname, 'node_modules/systemjs/dist/s.min.js')

function copyHtml () {
  return src(assetsSrc)
    .pipe(dest(distDir))
}

function copySJS () {
  return src(SjsSrc)
    .pipe(dest(vendorDir))
}

function watch () {
  gulp.watch(assetsSrc, copyHtml)
  gulp.watch(SjsSrc, copySJS)
}

gulp.task('clean:br', () => Promise.resolve(rimraf.sync(distDir + '**/*.br')))

exports.copy = parallel(copyHtml, copySJS)
exports.watch = series(exports.copy, watch)

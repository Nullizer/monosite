// @ts-check
const { resolve } = require('path')
const { src, dest, parallel, series } = require('gulp')
const gulp = require('gulp')
const { srcDir, distDir, vendorDir } = require('./tasks/config')
const rimraf = require('rimraf')
const Transform = require('stream').Transform
const { minify } = require('terser')
const { isProd } = require('./tasks/config')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')

const assetsInSrc = [
  '**/*.html',
  '**/*.ico',
  '**/*.png',
  '**/*.svg',
  '**/xml',
].map(p => srcDir + p)
const sassSrc = srcDir + '**/*.scss'
const cssSrc = srcDir + '**/*.css'

function copyAssets () {
  return src(assetsInSrc)
    .pipe(dest(distDir))
}

function _postcssTransform () {
  return postcss([
    autoprefixer({ grid: true }),
    isProd ? require('cssnano') : null,
  ].filter(x => x))
}

function compileSASS () {
  const sass = require('gulp-sass')
  return src(sassSrc)
    .pipe(sass().on('error', sass.logError))
    .pipe(_postcssTransform())
    .pipe(dest(distDir))
}

function compileCSS () {
  return src(cssSrc)
    .pipe(_postcssTransform())
    .pipe(dest(distDir))
}

function copyVendor () {
  return src(resolve(__dirname, 'node_modules/systemjs/dist/s.min.js'))
    .pipe(dest(vendorDir))
}

function genIEwarn () {
  const ts = require('typescript')
  return src('./res/old-ie-warn.js')
    .pipe(new Transform({
      objectMode: true,
      transform: (file, enc, cb) => {
        const transpiled = ts.transpileModule(String(file.contents), {
          compilerOptions: {
            allowJs: true,
            target: ts.ScriptTarget.ES3,
          }
        }).outputText
        file.contents = Buffer.from(minify(transpiled, {
          output: {
            comments: 'all'
          }
        }).code)
        cb(null, file)
      }
    }))
    .pipe(dest(vendorDir))
}

exports.minifyJS = function minifyJS () {
  return src(distDir + '!(vendor)**/*.js')
    .pipe(new Transform({
      objectMode: true,
      transform: (file, enc, cb) => {
        console.log(`Minify ${file.path}`)
        file.contents = Buffer.from(minify(String(file.contents)).code)
        cb(null, file)
      }
    }))
    .pipe(dest(distDir))
}

gulp.task('clean:br', () => Promise.resolve(rimraf.sync(distDir + '**/*.br')))

function _exportAndDefault () {
  const funcs = [...arguments]
  funcs.forEach(func => { exports[func.name] = func })
  exports.default = parallel.apply(null, funcs)
}

function watch () {
  gulp.watch(assetsInSrc, copyAssets)
  gulp.watch(sassSrc, compileSASS)
  gulp.watch(cssSrc, compileCSS)
}

_exportAndDefault(copyAssets, compileSASS, compileCSS, copyVendor, genIEwarn)
exports.watch = series(exports.default, watch)

// @ts-check
const { resolve } = require('path')
const { src, dest, parallel, series } = require('gulp')
const gulp = require('gulp')
const { isProd, srcDir, distDir, vendorDir } = require('./tasks/config')
const rimraf = require('rimraf')
const Transform = require('stream').Transform
const { minify } = require('terser')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const nunjucks = require('gulp-nunjucks')
const rename = require('gulp-rename')

const assetsInSrc = [
  '**/*.html',
  '**/*.ico',
  '**/*.png',
  '**/*.svg',
  '**/*.xml',
].map(p => srcDir + p)

const sassSrc = srcDir + '**/*.scss'
const cssSrc = srcDir + '**/*.css'

function compileHtml () {
  return src(srcDir + '**/!(_)*.njk')
    .pipe(nunjucks.compile())
    .pipe(rename({
      extname: '.html'
    }))
    .pipe(dest(distDir))
}

function copyAssets () {
  return src(assetsInSrc)
    .pipe(dest(distDir))
}

function _postcssTransform () {
  return postcss([
    autoprefixer({ grid: 'autoplace' }),
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
  return src(resolve(__dirname, 'node_modules/shimport/index.js'))
    .pipe(rename({ basename: 'shimport' }))
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
  return src(distDir + '!(vendor)**/**/*.js')
    .pipe(new Transform({
      objectMode: true,
      transform: (file, enc, cb) => {
        console.log(`Minify ${file.path}`)
        file.contents = Buffer.from(minify(String(file.contents), { module: true }).code)
        cb(null, file)
      }
    }))
    .pipe(dest(distDir))
}

exports.makeBr = function makeBr () {
  const { compress } = require('iltorb')

  const generatedTextAssets = [
    '**/*.js',
    '**/*.html',
    '**/*.css',
    '**/*.json',
    '**/*.svg',
    '**/*.xml',
  ].map(t => distDir + t)

  return src(generatedTextAssets)
    .pipe(new Transform({
      objectMode: true,
      transform: (file, enc, cb) => {
        console.log(`Generating .br for ${file.path}`)
        compress(file.contents).then(br => {
          file.path += '.br'
          file.contents = Buffer.from(br)
          cb(null, file)
        })
      }
    }))
    .pipe(dest(distDir))
}

exports.cleanBr = () => Promise.resolve(rimraf.sync(distDir + '**/*.br'))

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

_exportAndDefault(copyAssets, compileHtml, compileSASS, compileCSS, copyVendor, genIEwarn)
exports.watch = series(exports.default, watch)

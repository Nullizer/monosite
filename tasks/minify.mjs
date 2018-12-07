import globby from 'globby'
import fs from 'fs'
import minify from './lib/minify'
import { distJSPatterns as patterns } from './config-esm.mjs'
const fsPromises = fs.promises

globby(patterns).then(paths => {
  const pendings = paths.map(filepath => {
    return new Promise((resolve, reject) => {
      const contentPromise = fsPromises.readFile(filepath).then(buffer => buffer.toString())
      contentPromise.then(content => {
        resolve({
          path: filepath,
          content
        })
      }).catch(error => reject(error))
    })
  })
  batch(pendings)
})

function batch (fileObjPromises) {
  Promise.all(fileObjPromises).then(fileObjs => fileObjs.forEach(fileObj => {
    const minified = minify(fileObj.content)
    if (minified) {
      fsPromises.writeFile(fileObj.path, minified)
    } else {
      throw new Error(fileObj.path + ' not minified!')
    }
  }))
}

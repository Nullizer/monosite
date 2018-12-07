import config from './config'
import iltorb from 'iltorb'
import globby from 'globby'
import fs from 'fs'
const fsPromises = fs.promises

const { textAssets } = config

globby(textAssets).then(paths => {
  const pendings = paths.map(filepath => {
    return new Promise((resolve, reject) => {
      const contentPromise = fsPromises.readFile(filepath)
      contentPromise.then(buffer => {
        resolve({
          path: filepath,
          buffer: buffer
        })
      }).catch(error => reject(error))
    })
  })
  batch(pendings)
})

function batch (fileObjPromises) {
  Promise.all(fileObjPromises).then(fileObjs => fileObjs.forEach(fileObj => {
    iltorb.compress(fileObj.buffer).then(output => {
      const filename = fileObj.path + '.br'
      fsPromises.writeFile(filename, output)
    })
  }))
}

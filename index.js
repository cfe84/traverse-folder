const fs = require("fs")
const path = require("path")

/**
 * Traverse a folder, call `fileCallback` for each file and `folderCallback` for each folder
 * @param {string} root Folder that will be traversed
 * @param {function} fileCallback Callback method called for each files. An object is passed as parameters with the following fields:
 *  - `name`: The filename
 *  - `relativeFolderPath`: The file's folder relative path
 *  - `relativeFilePath`: The file's relative path
 *  - `fullFolderPath`: The file's folder full path
 *  - `fullFilePath`: The file's full path
 * @param {function} folderCallback Optional. Return true if folder should be parsed. If not specified, all folders will be parsed. An object is passed as parameter:
 *  - `name`: The folder name
 *  - `relativePath`: The folder's relative path
 *  - `fullPath`: The folder's full path
 */
function traverseFolder(root, fileCallback, folderCallback = null) {
  function recurseInFolder(relativeFolderPath) {
    const fullFolderPath = relativeFolderPath ? path.join(root, relativeFolderPath) : root
    const files = fs.readdirSync(fullFolderPath)
    files.forEach(name => {
      const relativeFilePath = path.join(relativeFolderPath, name)
      const fullFilePath = path.join(root, relativeFilePath)
      const stat = fs.lstatSync(fullFilePath)
      if (stat.isFile()) {
        fileCallback({
          name,
          relativeFolderPath,
          relativeFilePath,
          fullFilePath,
          fullFolderPath
        })
      } else {
        if (!folderCallback || folderCallback({
          name,
          relativePath: relativeFilePath,
          fullPath: fullFilePath
        })) {
          recurseInFolder(relativeFilePath)
        }
      }
    })
  }
  recurseInFolder(".")
}

exports.traverseFolder = traverseFolder
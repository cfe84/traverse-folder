const fs = require("fs")
const path = require("path")

/**
 * Traverse a directory, call `fileCallback` for each file and `directoryCallback` for each directory
 * @param {string} root Directory that will be traversed
 * @param {function} fileCallback Callback method called for each files. An object is passed as parameters with the following fields:
 *  - `name`: The filename
 *  - `relativeDirectoryPath`: The file's directory relative path
 *  - `relativeFilePath`: The file's relative path
 *  - `fullDirectoryPath`: The file's directory full path
 *  - `fullFilePath`: The file's full path
 * @param {function} directoryCallback Optional. Return true if directory should be parsed. If not specified, all directorys will be parsed. An object is passed as parameter:
 *  - `name`: The directory name
 *  - `relativePath`: The directory's relative path
 *  - `fullPath`: The directory's full path
 */
function traverseDirectory(root, fileCallback, directoryCallback = null) {
  function recurseInDirectory(relativeDirectoryPath) {
    const fullDirectoryPath = relativeDirectoryPath ? path.join(root, relativeDirectoryPath) : root
    const files = fs.readdirSync(fullDirectoryPath)
    files.forEach(name => {
      const relativeFilePath = path.join(relativeDirectoryPath, name)
      const fullFilePath = path.join(root, relativeFilePath)
      const stat = fs.lstatSync(fullFilePath)
      if (stat.isFile()) {
        fileCallback({
          name,
          relativeDirectoryPath,
          relativeFilePath,
          fullFilePath,
          fullDirectoryPath
        })
      } else {
        if (!directoryCallback || directoryCallback({
          name,
          relativePath: relativeFilePath,
          fullPath: fullFilePath
        })) {
          recurseInDirectory(relativeFilePath)
        }
      }
    })
  }
  recurseInDirectory(".")
}

exports.traverseDirectory = traverseDirectory
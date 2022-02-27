Traverses a folder recursively. 

```js
const { traverseFolder } = require("traverse-folder");
traverseFolder(".",
  (file) => console.log(file.name), 
  (folder) => { 
    console.log(folder.name)
    return true;
  )
);
```

Calls `fileCallback` for each file and `folderCallback` for each folder

The `fileCallback` callback function is called for each files. An object is passed as parameters with the following fields:
 - `name`: The filename
 - `relativeFolderPath`: The file's folder relative path
 - `relativeFilePath`: The file's relative path
 - `fullFolderPath`: The file's folder full path
 - `fullFilePath`: The file's full path

The `folderCallback` is optional. It must return true if folder should be parsed. If the `folderCallback` is not provided, all folders will be parsed. An object is passed as parameter of the callback:
 - `name`: The folder name
 - `relativePath`: The folder's relative path
 - `fullPath`: The folder's full path
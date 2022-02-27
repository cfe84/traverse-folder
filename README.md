Traverses a directory recursively. 

```js
const { traverseDirectory } = require("traverse-directory");
traverseDirectory(".",
  (file) => console.log(file.name), 
  (directory) => { 
    console.log(directory.name)
    return true;
  )
);
```

Calls `fileCallback` for each file and `directoryCallback` for each directory

The `fileCallback` callback function is called for each files. An object is passed as parameters with the following fields:
 - `name`: The filename
 - `relativeDirectoryPath`: The file's directory relative path
 - `relativeFilePath`: The file's relative path
 - `fullDirectoryPath`: The file's directory full path
 - `fullFilePath`: The file's full path

The `directoryCallback` is optional. It must return true if directory should be parsed. If the `directoryCallback` is not provided, all directorys will be parsed. An object is passed as parameter of the callback:
 - `name`: The directory name
 - `relativePath`: The directory's relative path
 - `fullPath`: The directory's full path
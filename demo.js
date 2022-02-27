const { traverseFolder } = require("./index")

traverseFolder("c:\\trash", ({ name, fullFilePath }) => console.log(`${name}: ${fullFilePath}`))
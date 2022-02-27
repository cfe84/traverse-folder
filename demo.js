const { traverseDirectory } = require("./index")

traverseDirectory("c:\\trash", ({ name, fullFilePath }) => console.log(`${name}: ${fullFilePath}`))
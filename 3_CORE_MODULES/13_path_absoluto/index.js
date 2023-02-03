const path = require('path')

console.log(path.resolve('test.txt'));

const midFolder = 'relatorios'
const fileName = 'relat1.pdf'

const finalPath = path.join('/', midFolder, '/', fileName)

console.log(finalPath);
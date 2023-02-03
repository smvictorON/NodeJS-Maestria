const _ = require('lodash')
const chalk = require('chalk')

const a = [1,3,5,6]
const b = [1,2,3,4]

const diff = _.difference(a,b)

console.log(chalk.bgRed.bold(diff));
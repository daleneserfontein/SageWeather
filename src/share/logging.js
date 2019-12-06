const chalk = require('chalk')

module.exports.log = (msg) => {
    if (typeof msg === 'string') {
        console.log(chalk.bgGreen.black(msg))
    } else {
        console.log(msg)
    }
}

module.exports.err = (msg) => {
    if (typeof msg === 'string') {
        console.log(chalk.bgRed.black(msg))
    } else {
        console.log(chalk.red(msg))
    }
}
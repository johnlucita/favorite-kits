'use strict'

const GLOBAL_SHELL = require('shelljs')
const GLOBAL_READLINE_SYNC = require('readline-sync')
const GLOBAL_PATH = require('path')
const GLOBAL_CHALK = require('chalk')
const GLOBAL_PACKAGE = require(GLOBAL_PATH.resolve('package.json'))

const output = (value, type = 'default') => {
    if (type === 'success') console.log(GLOBAL_CHALK.green(`------${value}------`))
    if (type === 'error') console.log(GLOBAL_CHALK.red(`------${value}------`))
    else console.log(GLOBAL_CHALK.blue(`------${value}------`))
}

const currentVersion = GLOBAL_PACKAGE.version
const currentBranch = GLOBAL_SHELL.exec(
    'git symbolic-ref --short -q HEAD', {
        async: false, silent: true
    }
).stdout.trim()
if (currentBranch !== 'master') {
    output(`Currently in the ${
        currentBranch
    } branch, switch to the master branch.`, 'error')
} else {
    let _s = GLOBAL_PACKAGE.version.split('.')[0]
    let _m = GLOBAL_PACKAGE.version.split('.')[1]
    let _p = GLOBAL_PACKAGE.version.split('.')[2]
    const answer = GLOBAL_READLINE_SYNC.question(`Current is "v${currentVersion}".\n\
    //    -- p:patch m:minor s:major n:Exit default:patch
    //    -- are you sure? (p/s/m/n)`)
    if (answer.trim() === '' || answer.trim().toLowerCase() === 'p') {
        GLOBAL_SHELL.exec('npm version patch')
        _p++
    } else if (answer.trim().toLowerCase() === 'm') {
        GLOBAL_SHELL.exec('npm version minor')
        _m++
        _p = '0'
    } else if (answer.trim().toLowerCase() === 's') {
        GLOBAL_SHELL.exec('npm version major')
        _s++
        _m = '0'
        _p = '0'
    } else {
        output('Invalid input has automatically exited.', 'error')
        GLOBAL_SHELL.exit()
    }
    output(`Version is v${_s}.${_m}.${_p}`)
    output('The publish success!', 'success')
    GLOBAL_SHELL.exit()
}

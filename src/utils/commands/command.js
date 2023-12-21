'use strict'
import Outputting from './outputting'
import Jsonparse from './jsonparse'

const global_implementer = {
    outputting: Outputting,
    jsonparse: Jsonparse
}
const global_commander = (key) => {
    if (!key) return
    return global_implementer[key]
}
const global_fixedstring = {
    invalid_key: '>_<：无效的命令……'
}

/**
 * 指令类
 */
export default class Command {
    constructor () {}

    install (key, value) {
        if (!(key in global_implementer)) {
            global_implementer[key] = value
        }
    }

    run (key, value) {
        const commander = global_commander(key)
        if (commander) return commander.run(value)
        else return global_fixedstring.invalid_key
    }

    check (key) {
        const commander = global_commander(key)
        if (commander) return commander.check()
        else return global_fixedstring.invalid_key
    }
}

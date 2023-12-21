'use strict'

export default (arg1, arg2 = 1000) => {
    arg1 = Number(arg1)
    arg2 = Number(arg2)
    if (isNaN(arg1) || isNaN(arg2)) return ''
    if (arg1 >= arg2) return `${arg2 - 1}+`
    else return String(arg1)
}

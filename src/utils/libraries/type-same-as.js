'use strict'

/**
 * 判断参数类型是否相同
 * @example arg1 = {key: 'I', value: '1'}
 * arg2 = {key: 'O', value: '2'} => true
 * ...
 * @param {Any} 值（可多个值，但至少要两个参数）
 * @author Lucita
 * @version 0.0.1
 * @returns {Boolean} true/false
 */
export default function () {
    if (arguments.length >= 2) {
        const cache = {}
        for (const arg in arguments) {
            const type = Object.prototype.toString.call(arg)
            if (cache[type]) return true
            else cache[type] = true
        }
        return Object.keys(cache).length === 1
    } else return false
}

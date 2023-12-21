'use strict'
import IsNullOrEmpty from './is-null-or-empty'
import IsString from './is-string'
import IsNumber from './is-number'
import IsArray from './is-array'
import IsObject from './is-object'
import Clone from './clone'

/**
 * 获取末位值
 * @param {Number, String, Array, Object} arg 获取源
 * @returns {Any} 末位值
 */
export default arg => {
    if (IsNullOrEmpty(arg, true)) return undefined
    if (IsNumber(arg)) {
        arg = String(arg)
        return Number(arg.substr(arg.length - 1, 1))
    } else if (IsString(arg)) {
        return arg.substr(arg.length - 1, 1)
    } else if (IsArray(arg)) {
        return Clone(arg).reverse()[0]
    } else if (IsObject(arg)) {
        const [key, value] = Object.entries(Clone(arg)).reverse()[0]
        return { [key]: value }
    } else return undefined
}

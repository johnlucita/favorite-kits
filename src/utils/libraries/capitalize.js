'use strict'

/**
 * 字符串的首字母大写
 * @example 'abc' => 'Abc'
 * @param {String} arg 字符串
 * @author Lucita
 * @version 0.0.1
 * @returns {String} 首字母大写的字符串
 */
export default arg => {
    let result = ''
    if (!arg && arg !== 0) {
        result = ''
    } else {
        const strMessage = arg.toString()
        result = strMessage.charAt(0).toUpperCase() + strMessage.slice(1)
    }
    return result
}

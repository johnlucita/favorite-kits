'use strict'

/**
 * 字符串全部转为大写字母
 * @example 'abc' => 'ABC'
 * @param {String} arg 字符串
 * @author Lucita
 * @version 0.0.1
 * @returns {String} 大写字母字符串
 */
export default arg => {
    const result = arg || arg === 0
        ? arg.toString().toUpperCase() : ''
    return result
}

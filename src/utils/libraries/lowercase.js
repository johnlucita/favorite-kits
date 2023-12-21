'use strict'

/**
 * 字符串全部转为小写字母
 * @example 'ABC' => 'abc'
 * @param {String} arg 字符串
 * @author Lucita
 * @version 0.0.1
 * @returns {String} 小写字母字符串
 */
export default arg => {
    const result = arg || arg === 0
        ? arg.toString().toLowerCase() : ''
    return result
}

'use strict'
import IsRegExp from './is-reg-exp'

/**
 * 替换字符串
 * @param {String} arg1 原字符串
 * @param {String, RegExp} arg2 搜索字符串或者表达式
 * @param {String} arg3 代替字符串
 * @param {Boolean} [arg4=true] 只替换一次
 * @author Lucita
 * @version 0.0.1
 * @returns {String} 替换后的字符串
 */
export default (arg1, arg2, arg3 = '', arg4 = true) => {
    let result = arg1 || ''
    if (IsRegExp(arg2)) result = result.replace(arg2, arg3)
    else while (result.length && result.indexOf(arg2) > -1) {
        result = result.replace(arg2, arg3)
        if (arg4) break
    }
    return result
}

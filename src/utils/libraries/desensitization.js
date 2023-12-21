'use strict'
import IsString from './is-string'
import IsNullOrEmpty from './is-null-or-empty'

/**
 * 字符串脱敏
 * @param {String} arg1 数据
 * @param {RegExp|String} arg2 敏感字符串
 * @param {String} arg3 替换字符串
 * @author Lucita
 * @version 0.0.1
 * @returns {String} 脱敏后字符串
 */
export default (arg1, arg2, arg3) => {
    if (!IsString(arg1)) arg1 = arg1.toString()
    if (IsNullOrEmpty(arg2)) arg2 = ''
    if (IsNullOrEmpty(arg3)) arg3 = ''
    return arg1.replace?.(arg2, arg3) ?? arg1
}

'use strict'
import IsNullOrEmpty from './is-null-or-empty'
import IsString from './is-string'

/**
 * 生成随机数
 * @example arg1 = '0123456789'
 * arg2 = 32 => '27319356142609185307798280439359'
 * @param {String} arg1 允许包含的字符串
 * @param {Number} [arg2=32] 随机数长度，默认32
 * @returns {String} 随机数
 */
export default (arg1, arg2 = 32) => {
    let result = ''
    if (IsString(arg1) && !IsNullOrEmpty(arg1)) {
        for (let i = 0; i < arg2; i++) {
            result += arg1.charAt(Math.floor(
                Math.random() * arg1.length
            ))
        }
    }
    return result
}

'use strict'

const global_charts = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')

/**
 * 生成UUID
 * Make Universally Unique IDentifier
 * @example arg1 = 2
 * arg2 = 10
 * arg3 = true => u000111101
 * @param {Number} [arg1] 生成uuid的基数，2-二进制，8-八进制，10-十进制，16-十六进制，默认62-全部字符
 * @param {Number} [arg2=32] uuid的长度
 * @param {Boolean} [arg3=true] 将返回的首字母置为u
 * @author Lucita
 * @version 0.0.1
 * @returns {String} uuid
 */
export default (arg1, arg2 = 32, arg3 = true) => {
    const uuid = []
    arg1 = arg1 || global_charts.length
    if (arg2) {
        for (let i = 0; i < arg2; i++) uuid[i] = global_charts[0 | Math.random() * arg1]
    } else {
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
        uuid[14] = '4'
        let rfc
        for (let i = 0; i < 36; i++) {
            if (!uuid[i]) {
                rfc = 0 | Math.random() * 16
                uuid[i] = global_charts[(i === 19) ? (rfc & 0x3) | 0x8 : rfc]
            }
        }
    }
    if (arg3) uuid.shift()
    return ((arg3 && 'u') || '') + uuid.join('')
}

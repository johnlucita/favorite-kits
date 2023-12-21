'use strict'
import Utf8 from './utf-8'

/**
 * 字符串转换成数组
 * @param {String} arg 字符串
 * @returns {Array} 字数组
 */
const ConvertToWordArray = function (arg) {
    let lWordCount
    const lMessageLength = arg.length
    const lNumberOfWords1 = lMessageLength + 8
    const lNumberOfWords2 =
        (lNumberOfWords1 - (lNumberOfWords1 % 64)) / 64
    const lNumberOfWords = (lNumberOfWords2 + 1) * 16
    const lWordArray = Array(lNumberOfWords - 1)
    let lBytePosition = 0
    let lByteCount = 0
    while (lByteCount < lMessageLength) {
        lWordCount = (lByteCount - (lByteCount % 4)) / 4
        lBytePosition = (lByteCount % 4) * 8
        lWordArray[lWordCount] = (
            lWordArray[lWordCount] |
            (arg.charCodeAt(lByteCount) << lBytePosition)
        )
        lByteCount++
    }
    lWordCount = (lByteCount - (lByteCount % 4)) / 4
    lBytePosition = (lByteCount % 4) * 8
    lWordArray[lWordCount] =
        lWordArray[lWordCount] | (0x80 << lBytePosition)
    lWordArray[lNumberOfWords - 2] =
        lMessageLength << 3
    lWordArray[lNumberOfWords - 1] =
        lMessageLength >>> 29

    return lWordArray
}
/**
 * 字节转换成十六进制
 * @param {Number} arg 字节
 * @returns {Number} 十六进制
 */
const WordToHex = function (arg) {
    let wordToHexValue = ''
    let wordToHexValueTemp = ''
    let lByte, lCount
    for (lCount = 0; lCount <= 3; lCount++) {
        lByte = (arg >>> (lCount * 8)) & 255
        wordToHexValueTemp = '0' + lByte.toString(16)
        wordToHexValue += wordToHexValueTemp.substr(
            wordToHexValueTemp.length - 2, 2
        )
    }
    return wordToHexValue
}
/**
 * 添加无符号
 * @param {Number} arg1
 * @param {Number} arg2
 * @returns {Number} 无符号数值
 */
const AddUnsigned = function (arg1, arg2) {
    var lX4, lY4, lX8, lY8, lResult
    lX8 = (arg1 & 0x80000000)
    lY8 = (arg2 & 0x80000000)
    lX4 = (arg1 & 0x40000000)
    lY4 = (arg2 & 0x40000000)
    lResult = (arg1 & 0x3FFFFFFF) + (arg2 & 0x3FFFFFFF)
    if (lX4 & lY4) {
        return (lResult ^ 0x80000000 ^ lX8 ^ lY8)
    }
    if (lX4 | lY4) {
        if (lResult & 0x40000000) {
            return (lResult ^ 0xC0000000 ^ lX8 ^ lY8)
        } else {
            return (lResult ^ 0x40000000 ^ lX8 ^ lY8)
        }
    } else {
        return (lResult ^ lX8 ^ lY8)
    }
}
/**
 * 左移位
 * @param {Number} arg1 左移位数值
 * @param {Number} arg2 左移位偏移量
 * @returns {Number} 左移位后数值
 */
const RotateLeft = function (arg1, arg2) {
    return (arg1 << arg2) | (arg1 >>> (32 - arg2))
}
/**
 * F
 * @param {Number} arg1
 * @param {Number} arg2
 * @param {Number} arg3
 */
const F = function (arg1, arg2, arg3) {
    return (arg1 & arg2) | ((~arg1) & arg3)
}
/**
 * FF
 * @param {Number} arg1
 * @param {Number} arg2
 * @param {Number} arg3
 * @param {Number} arg4
 * @param {Number} arg5
 * @param {Number} arg6
 * @param {Number} arg7
 */
const FF = function (arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
    arg1 = AddUnsigned(
        arg1, AddUnsigned(
            AddUnsigned(
                F(arg2, arg3, arg4), arg5
            ), arg7
        )
    )
    return AddUnsigned(
        RotateLeft(arg1, arg6), arg2
    )
}
/**
 * G
 * @param {Number} arg1
 * @param {Number} arg2
 * @param {Number} arg3
 */
const G = function (arg1, arg2, arg3) {
    return (arg1 & arg3) | (arg2 & (~arg3))
}
/**
 * GG
 * @param {Number} arg1
 * @param {Number} arg2
 * @param {Number} arg3
 * @param {Number} arg4
 * @param {Number} arg5
 * @param {Number} arg6
 * @param {Number} arg7
 */
const GG = function (arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
    arg1 = AddUnsigned(
        arg1, AddUnsigned(
            AddUnsigned(
                G(arg2, arg3, arg4), arg5
            ), arg7
        )
    )
    return AddUnsigned(
        RotateLeft(arg1, arg6), arg2
    )
}
/**
 * H
 * @param {Number} arg1
 * @param {Number} arg2
 * @param {Number} arg3
 */
const H = function (arg1, arg2, arg3) {
    return (arg1 ^ arg2 ^ arg3)
}
/**
 * HH
 * @param {Number} arg1
 * @param {Number} arg2
 * @param {Number} arg3
 * @param {Number} arg4
 * @param {Number} arg5
 * @param {Number} arg6
 * @param {Number} arg7
 */
const HH = function (arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
    arg1 = AddUnsigned(
        arg1, AddUnsigned(
            AddUnsigned(
                H(arg2, arg3, arg4), arg5
            ), arg7
        )
    )
    return AddUnsigned(
        RotateLeft(arg1, arg6), arg2
    )
}
/**
 * I
 * @param {Number} arg1
 * @param {Number} arg2
 * @param {Number} arg3
 */
const I = function (arg1, arg2, arg3) {
    return (arg2 ^ (arg1 | (~arg3)))
}
/**
 * II
 * @param {Number} arg1
 * @param {Number} arg2
 * @param {Number} arg3
 * @param {Number} arg4
 * @param {Number} arg5
 * @param {Number} arg6
 * @param {Number} arg7
 */
const II = function (arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
    arg1 = AddUnsigned(
        arg1, AddUnsigned(
            AddUnsigned(
                I(arg2, arg3, arg4), arg5
            ), arg7
        )
    )
    return AddUnsigned(
        RotateLeft(arg1, arg6), arg2
    )
}

/**
 * 基于UTF-8编码的MD5加密
 * @param {String} arg1 明文
 * @param {Number} arg2 返回值类型，-1返回全小写密文，0返回正常密文，1返回全大写密文
 * @returns {String} 密文
 */
export default (arg1, arg2 = 0) => {
    let ciphertext = ''
    let x = []
    let k, AA, BB, CC, DD, a, b, c, d
    const S11 = 7
    const S12 = 12
    const S13 = 17
    const S14 = 22
    const S21 = 5
    const S22 = 9
    const S23 = 14
    const S24 = 20
    const S31 = 4
    const S32 = 11
    const S33 = 16
    const S34 = 23
    const S41 = 6
    const S42 = 10
    const S43 = 15
    const S44 = 21
    // 执行UTF-8编码
    const str = Utf8(arg1)
    // 执行字符串转换成数组
    x = ConvertToWordArray(str)
    a = 0x67452301
    b = 0xEFCDAB89
    c = 0x98BADCFE
    d = 0x10325476
    for (k = 0; k < x.length; k += 16) {
        AA = a
        BB = b
        CC = c
        DD = d
        a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478)
        d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756)
        c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB)
        b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE)
        a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF)
        d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A)
        c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613)
        b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501)
        a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8)
        d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF)
        c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1)
        b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE)
        a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122)
        d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193)
        c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E)
        b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821)
        a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562)
        d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340)
        c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51)
        b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA)
        a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D)
        d = GG(d, a, b, c, x[k + 10], S22, 0x2441453)
        c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681)
        b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8)
        a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6)
        d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6)
        c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87)
        b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED)
        a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905)
        d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8)
        c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9)
        b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A)
        a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942)
        d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681)
        c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122)
        b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C)
        a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44)
        d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9)
        c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60)
        b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70)
        a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6)
        d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA)
        c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085)
        b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05)
        a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039)
        d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5)
        c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8)
        b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665)
        a = II(a, b, c, d, x[k + 0], S41, 0xF4292244)
        d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97)
        c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7)
        b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039)
        a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3)
        d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92)
        c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D)
        b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1)
        a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F)
        d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0)
        c = II(c, d, a, b, x[k + 6], S43, 0xA3014314)
        b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1)
        a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82)
        d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235)
        c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB)
        b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391)
        a = AddUnsigned(a, AA)
        b = AddUnsigned(b, BB)
        c = AddUnsigned(c, CC)
        d = AddUnsigned(d, DD)
    }
    let result = ciphertext =
        WordToHex(a) + WordToHex(b) +
        WordToHex(c) + WordToHex(d)
    if (arg2 === -1) {
        result = ciphertext.toLowerCase()
    }
    if (arg2 === 1) {
        result = ciphertext.toUpperCase()
    }
    return result
}

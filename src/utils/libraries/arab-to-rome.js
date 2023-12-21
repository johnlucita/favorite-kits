'use strict'

/**
 * 阿拉伯数字转换成罗马数字
 * @param {Number, String} arg 阿拉伯数字
 * @author Lucita
 * @version 0.0.1
 * @returns {String} 罗马数字
 */
export default arg => {
    if (isNaN(arg)) return String(arg)
    const extracts = parseInt(arg.replace(/[^\d.]/g, ''))
    arg =  String(isNaN(extracts) ? 0 : extracts)
    const arabSet = []
    const romeSet = [
        ['', 'Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ', 'Ⅵ', 'Ⅶ', 'Ⅷ', 'Ⅸ'],
        ['', 'Ⅹ', 'ⅩⅩ', 'ⅩⅩⅩ', 'ⅩⅬ', 'Ⅼ', 'ⅬⅩ', 'ⅬⅩⅩ', 'ⅬⅩⅩⅩ', 'ⅩⅭ'],
        ['', 'Ⅽ', 'ⅭⅭ', 'ⅭⅭⅭ', 'ⅭⅮ', 'Ⅾ', 'ⅮⅭ', 'ⅮⅭⅭ', 'ⅮⅭⅭⅭ', 'ⅭⅯ'],
        ['', 'Ⅿ', 'ⅯⅯ', 'ⅯⅯⅯ']
    ]
    for (let i = 0; i < arg.length; i++) {
        arabSet.push(romeSet[((arg.length) - (i + 1))][arg[i]])
    }
    return arabSet.join('')
}

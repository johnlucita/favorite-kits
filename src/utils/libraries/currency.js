'use strict'

/**
 * 货币格式化
 * @example '2000.12' => '$2,000.12'
 * @param {String, Decimal} arg1 金额
 * @param {String} arg2 货币符号，默认（无符号）
 * @param {Number} arg3 小数位数，默认（2，保留小数点后2位）
 * @param {Boolean} arg4 负值表示形式，true，使用括号来表示负值，（默认 false，正常显示负值）
 * @author Lucita
 * @version 0.0.1
 * @returns {String} 带格式的货币字符串
 */
export default (arg1, arg2 = '', arg3 = 2, arg4 = false) => {
    const curMoney = parseFloat(arg1)
    let result = ''
    if (!isFinite(curMoney) || (!curMoney && curMoney !== 0)) {
        result = ''
    } else {
        arg2 = arg2 != null ? arg2 : ''
        arg3 = arg3 != null ? arg3 : 2
        const stringified = Math.abs(curMoney).toFixed(arg3)
        const integer = arg3 ? stringified.slice(0, -1 - arg3) : stringified
        const len = integer.length % 3
        const head = len > 0 ? integer.slice(0, len) + (integer.length > 3 ? ',' : '') : ''
        const float = arg3 ? stringified.slice(-1 - arg3) : ''
        const signStart = curMoney < 0 ? (arg4 ? '(' : '-') : ''
        const signEnd = curMoney < 0 ? (arg4 ? ')' : '') : ''
        const digitsRE = /(\d{3})(?=\d)/g
        result = signStart + arg2 + head + integer.slice(len).replace(digitsRE, '$1,') + float + signEnd
    }
    return result
}

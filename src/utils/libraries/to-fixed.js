'use strict'

/**
 * 四舍五入
 * @param {Number} arg1 数值
 * @param {Number} [arg2=2] 保留小数位数，默认保留两位
 * @author Lucita
 * @version 0.0.1
 * @returns {String} 四舍五入后的字符串
 */
export default (arg1, arg2 = 2) => {
    arg1 = Number(arg1) || 0
    const times = Math.pow(10, arg2 + 1)
    let des = parseInt(Math.round(arg1 * times))
    const rest = des % 10
    if (Math.abs(rest) === 5) {
        if (des < 0) des -= 2
        return ((parseFloat(des) + 1) / times).toFixed(arg2)
    } else {
        return arg1.toFixed(arg2)
    }
}

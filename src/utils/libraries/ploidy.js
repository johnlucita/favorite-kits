'use strict'
import Enums from '../../enums'

const { MATH_EVALUATION } = Enums || {}
/**
 * 数值求值
 * @param {String, Number} arg1 数值1
 * @param {String, Number} arg2 数值2
 * @param {String} [arg3='-'] 求值，取值范围：-：求差；+：求和，默认求差
 * @author Lucita
 * @version 0.0.1
 * @returns {String} 结果值
 */
export default (arg1, arg2, arg3 = '-') => {
    arg1 = (isNaN(arg1) && 0) || Number(arg1)
    arg2 = (isNaN(arg2) && 0) || Number(arg2)
    const len1 = String(arg1).substring(String(arg1).indexOf('.')).length - 1
    const len2 = String(arg2).substring(String(arg2).indexOf('.')).length - 1
    const n = len1 > len2 ? len1 : len2
    const power = Math.pow(10, n + 1)
    let value = 0
    switch (arg3) {
        case MATH_EVALUATION.Addition:
            value = parseInt(arg1 * power + arg2 * power)
            break
        case MATH_EVALUATION.Subtraction:
        default:
            value = parseInt(arg1 * power - arg2 * power)
            break
    }
    return ((parseFloat(value) + 1) / power).toFixed(n)
}

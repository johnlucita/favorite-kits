'use strict'
import Enums from '../../enums'

const { MATH_EVALUATION } = Enums || {}

/**
 * 溢出替换
 * ps: 判断数值是否溢出指定边界值，如果溢出则替换成指定值
 * @param {String, Number} arg1 数值
 * @param {String, Number} arg2 替换值
 * @param {String, Number} arg3 边界值
 * @param {String} arg4 边界方向，取值范围：<小于边界值；=等于边界值；<=小于等于边界值；>大于边界值；>=大于等于边界值，默认小于边界值
 * @author Lucita
 * @version 0.0.1
 * @returns {Number} 结果值
 */
export default (arg1, arg2, arg3 = 0, arg4 = '<') => {
    arg1 = (isNaN(arg1) && 0) || Number(arg1)
    arg2 = (isNaN(arg2) && 0) || Number(arg2)
    arg3 = (isNaN(arg3) && 0) || Number(arg3)
    switch (arg4) {
        case MATH_EVALUATION.Equal:
            return arg1 === arg3 ? arg2 : arg1
        case MATH_EVALUATION.GreatAndEqualThan:
            return arg1 >= arg3 ? arg2 : arg1
        case MATH_EVALUATION.GreatThan:
            return arg1 > arg3 ? arg2 : arg1
        case MATH_EVALUATION.LessAndEqualThan:
            return arg1 <= arg3 ? arg2 : arg1
        case MATH_EVALUATION.LessThan:
        default:
            return arg1 < arg3 ? arg2 : arg1
    }
}

'use strict'
import Enums from '../../enums'
import IsNullOrEmpty from './is-null-or-empty'

const { COMPARE_RESULT } = Enums || {}

/**
 * 获取比较结果
 * @param {String, Number, Date} arg1 变量1
 * @param {String, Number, Date} arg2 变量2
 * @returns {Number} 大于返回1；等于返回0；小于返回-1
 */
const global_compare_result = (arg1, arg2) => {
    if (arg1 > arg2) return COMPARE_RESULT.GreaterThan
    else if (arg1 === arg2) return COMPARE_RESULT.EqualTo
    else return COMPARE_RESULT.LessThan
}

/**
 * 比较
 * @param {String, Number, Date} arg1 变量1
 * @param {String, Number, Date} arg2 变量2
 * @author Lucita
 * @version 0.0.1
 * @returns {Number} 大于返回1；等于返回0；小于返回-1
 */
export default (arg1, arg2) => {
    arg1 = (IsNullOrEmpty(arg1) && String(arg1)) || arg1
    const type = Object.prototype.toString.call(arg1)
    switch (type) {
        case '[object String]':
            arg2 = Object.prototype.toString.call(arg2) === type
                ? arg2 : String(arg2)
            break 
        case '[object Number]':
            arg2 = Object.prototype.toString.call(arg2) === type
                ? arg2 : Number(arg2)
            break
        case '[object Date]':
            arg2 = Object.prototype.toString.call(arg2) === type
                ? arg2 : new Date(arg2)
            break
    }
    return global_compare_result(arg1, arg2)
}

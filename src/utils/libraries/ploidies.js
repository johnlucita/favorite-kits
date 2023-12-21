'use strict'
import Ploidy from './ploidy'

/**
 * 数值求值【作废】
 * @param {String, Number} arg1 数值1
 * @param {String} [arg2='-'] 求值，取值范围：-：求差；+：求和，默认求差
 * @param {String, Number} args 数值n
 * @author Lucita
 * @version 0.0.1
 * @returns {String} 结果值
 */
export default (arg1, arg2 = '-', ...args) => {
    let result = (isNaN(arg1) && 0) || Number(arg1)
    for (const arg of args) {
        result = Ploidy(result, arg, arg2)
    }
    return result
}

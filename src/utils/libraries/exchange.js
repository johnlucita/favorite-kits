'use strict'
import IsVariables from './is-variables'
import TypeSameAs from './type-same-as'

/**
 * 交换两个变量的值
 * @example arg1 = 1
 * arg2 = 2 => { arg1 = 2, arg2 = 1 }
 * @param {Any} arg1 值1
 * @param {Any} arg2 值2
 * @author Lucita
 * @version 0.0.1
 * @returns {Array} 交换后的值数组或者undefined
 */
export default (arg1, arg2) => {
    if (IsVariables(arg1) && IsVariables(arg2) && TypeSameAs(arg1, arg2)) {
        [arg1, arg2] = [arg2, arg1]
        return [arg1, arg2]
    } else return undefined
}

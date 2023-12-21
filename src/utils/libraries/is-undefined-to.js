'use strict'
import IsUndefined from './is-undefined'

/**
 * 判断并替换未定义数据
 * @example arg1 = undefined, arg2 = 123 => 123
 * or
 * arg1 = 456, arg2 = 123 => 456
 * @param {Any} arg1 预判值
 * @param {Any} arg2 替代值
 * @author Lucita
 * @version 0.0.1
 * @returns {Any} 预判值为undefined时返回替代值，否则返回预判值
 */
export default (arg1, arg2) => {
    return IsUndefined(arg1) ? arg2 : arg1
}

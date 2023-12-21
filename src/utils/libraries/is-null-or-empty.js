'use strict'
import Overload from './overload'

/**
 * 重载对象
 */
const global_obj = {}
/**
 * 判断数据是否为NULL或者EMPTY
 * @param {Any} arg1 数据
 * @param {Number} [arg2=1] 数据例外值
 * @param {Any} [arg3=true] 空值
 * @param {Any} [arg4=false] 非空值
 * @author Lucita
 * @version 0.0.1
 * @returns {Any} 空值与非空值
 */
const global_fn = (arg1, arg2 = 1, arg3 = true, arg4 = false) => {
    switch (Object.prototype.toString.call(arg1).toLowerCase()) {
        case '[object undefined]':
        case '[object null]':
            return arg3
        case '[object string]':
            return (arg1.trim().length === 0 && arg3) || arg4
        case '[object number]':
            arg2 = (isNaN(Number(arg2)) && 1) || arg2
            if (arg2 === 1) return ((isNaN(arg1) || arg1 < 1) && arg3) || arg4
            else if (arg2 === 0) return ((isNaN(arg1) || arg1 < 0) && arg3) || arg4
            else return (isNaN(arg1) && arg3) || arg4
        case '[object boolean]':
            return (!arg1 && arg3) || arg4
        case '[object object]':
        case '[object module]':
            return (Object.keys(arg1).length === 0 && arg3) || arg4
        case '[object array]':
            return (arg1.length === 0 && arg3) || arg4
        case '[object date]':
            return (!arg1 && arg3) || arg4
        case '[object function]':
            return arg4
        case '[object window]':
            return arg4
        default:
            return !arg1
    }
}

/**
 * 重载方法
 * @param {Any} arg1 数据
 * @author Lucita
 * @version 0.0.1
 * @returns {Any} 空值与非空值
 */
Overload(global_obj, 'fn', function (arg1) {
    return global_fn(arg1)
})
/**
 * 重载方法
 * @param {Any} arg1 数据
 * @param {Number} [arg2=1] 数据例外值
 * @author Lucita
 * @version 0.0.1
 * @returns {Any} 空值与非空值
 */
Overload(global_obj, 'fn', function (arg1, arg2) {
    return global_fn(arg1, arg2)
})
/**
 * 重载方法
 * @param {Any} arg1 数据
 * @param {Any} [arg2=true] 空值
 * @param {Any} [arg3=false] 非空值
 * @author Lucita
 * @version 0.0.1
 * @returns {Any} 空值与非空值
 */
Overload(global_obj, 'fn', function (arg1, arg2, arg3) {
    return global_fn(arg1, NaN, arg2, arg3)
})
/**
 * 重载方法
 * @param {Any} arg1 数据
 * @param {Number} [arg2=1] 数据例外值
 * @param {Any} [arg3=true] 空值
 * @param {Any} [arg4=false] 非空值
 * @author Lucita
 * @version 0.0.1
 * @returns {Any} 空值与非空值
 */
Overload(global_obj, 'fn', function (arg1, arg2, arg3, arg4) {
    return global_fn(arg1, arg2, arg3, arg4)
})

/**
 * 重载方法
 * @author Lucita
 * @version 0.0.1
 * @returns {Any} 空值与非空值
 */
export default global_obj.fn

'use strict'
import Overload from './overload'
import IsFunction from './is-function'

/**
 * 重载对象
 */
const global_obj = {}

/**
 * 异步执行函数
 * @example arg1 = const fun = function (a, b) { return `${b} = ${a + 1}` }
 * arg2 = 0
 * arg3 = [12, 'a'] => fun(12, 'a').then((a) => {console.log(a)}) => a = 13
 * @param {Function} arg1 函数
 * @param {Number} arg2 延迟时间（毫秒）
 * @param {...Any} args 函数传参（虚参）
 * @author Lucita
 * @version 0.0.1
 * @returns {Promise} Promise对象
 */
const global_fn = (arg1, arg2, ...args) => {
    const promise = new Promise(resolve => {
        if (IsFunction(arg1)) {
            if (arg2 >> 0 > 0) setTimeout(
                () => resolve(arg1(...args)), arg2
            )
            else resolve(arg1(...args))
        } else setTimeout(() => resolve(), arg2)
    })
    return promise
}

/**
 * 重载方法
 * @param {Function} arg 函数
 * @author Lucita
 * @version 0.0.1
 * @returns {Promise} Promise对象
 */
Overload(global_obj, 'fn', function (arg) {
    return global_fn(arg, 0)
})
/**
 * 重载方法
 * @param {Function} arg1 函数
 * @param {Number} arg2 延迟时间（毫秒）
 * @author Lucita
 * @version 0.0.1
 * @returns {Promise} Promise对象
 */
Overload(global_obj, 'fn', function (arg1, arg2) {
    return global_fn(arg1, arg2 >> 0)
})
/**
 * 重载方法
 * @param {Function} arg1 函数
 * @param {Number} arg2 延迟时间（毫秒）
 * @param {Array} args 函数传参
 * @author Lucita
 * @version 0.0.1
 * @returns {Promise} Promise对象
 */
Overload(global_obj, 'fn', function (arg1, arg2, ...args) {
    return global_fn(arg1, arg2 >> 0, ...args)
})

/**
 * 重载方法
 * @author Lucita
 * @version 0.0.1
 * @returns {Promise} Promise对象
 */
export default global_obj.fn

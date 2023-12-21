'use strict'

/**
 * 方法重载
 * @param {Object} arg1 绑定对象
 * @param {String} arg2 绑定方法名
 * @param {Function} arg3 绑定方法实现
 */
export default (arg1, arg2, arg3) => {
    const fn = arg1[arg2]
    arg1[arg2] = function () {
        if (arg3.length === arguments.length) {
            return arg3.apply(this, arguments)
        } else if (fn) {
            return fn.apply(this, arguments)
        } else {
            return undefined
        }
    }
}

'use strict'
import * as Library from './libraries'

/**
 * 绑定属性
 * @param {String} arg1 属性名
 * @param {Function} arg2 属性值
 * @author Lucita
 * @version 0.0.1
 * @returns {Function} 返回函数
 */
Function.prototype.binding = function (arg1, arg2) {
    if (!this.prototype[arg1]) this.prototype[arg1] = arg2
    return this
}
/**
 * 异步
 */
Function.binding('async', function () {
    return Library.Promiser(this, ...arguments)
})

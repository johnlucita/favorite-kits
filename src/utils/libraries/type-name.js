'use strict'

/**
 * 返回数据类型名称
 * @param {Any} arg 对象
 * @author Lucita
 * @version 0.0.1
 * @returns {String} result 对象类型名称
 */
export default arg => {
    const _typeDesc = Object.prototype.toString.call(arg)
    const result = _typeDesc.replace(/[/[,\]]/g, '').split(' ')[1] || ''
    return result
}

'use strict'

/**
 * 判断数据是否为数值型
 * @param {String, Number} arg 数据
 * @author Lucita
 * @version 0.0.1
 * @returns {Boolean} true/false
 */
export default arg => {
    switch (typeof arg) {
        case 'string':
        case 'number':
            return !isNaN(Number(arg))
        default:
            return false
    }
}

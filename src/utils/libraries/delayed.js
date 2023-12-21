'use strict'
import IsNullOrEmpty from './is-null-or-empty'

/**
 * 异步延迟
 * @example 
 * @param {Number} arg 延迟时间，单位毫秒，默认500毫秒
 * @author Lucita
 * @version 0.0.1
 * @returns {Promise} 返回异步对象
 */
export default arg => {
    if (IsNullOrEmpty(arg)) arg = 500
    return new Promise(resolve => {
        setTimeout(() => resolve(), arg)
    })
}

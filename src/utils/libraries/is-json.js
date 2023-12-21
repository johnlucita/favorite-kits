'use strict'
import IsObject from './is-object'
import IsString from './is-string'

/**
 * 判断对象是否是JSON对象
 * @example arg = {key: 'I', value: '1'} => true
 * or
 * arg = '{key: 0, value: 1}' => true
 * @param {Object} arg 对象
 * @returns {Boolean} true/false
 */
export default arg => {
    try {
        if (IsString(arg)) arg = JSON.parse(arg)
        if (IsObject(arg)) {
            return JSON.stringify(arg).indexOf('{') === 0
        } else return false
    } catch { return false }
}

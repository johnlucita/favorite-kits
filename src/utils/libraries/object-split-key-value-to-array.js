'use strict'
import IsNullOrEmpty from './is-null-or-empty'
import IsObject from './is-object'
import IsModule from './is-module'

/**
 * 拆分对象，并转换成对象数组
 * @example arg1 = { field1: 1, field2: 2, field3: 3 } => [{key: 'field1', value: 1}, {key: 'field2', value: 2}, {key: 'field3', value: 3}]
 * @param {Object} arg1 对象
 * @author Lucita
 * @version 0.0.1
 * @returns {Array} 对象数组
 */
export default arg1 => {
    let result = []
    if (!IsNullOrEmpty(arg1) && (IsObject(arg1) || IsModule(arg1))) {
        for (const [key, value] of Object.entries(arg1)) {
            result.push({ key, value })
        }
    }
    return result
}

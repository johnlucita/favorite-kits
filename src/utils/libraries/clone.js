'use strict'
import IsArray from './is-array'
import IsObject from './is-object'

/**
 * 克隆
 * @example arg = [{key: 'I', value: '1'}] => [{key: 'I', value: '1'}]
 * or
 * arg = {key: 'I', value: '1'} => {key: 'I', value: '1'}
 * @param {Object, Array} arg 对象或者数组
 * @author Lucita
 * @version 0.0.1
 * @returns {Object, Array} 克隆的对象或者数组
 */
export default arg => {
    if (IsArray(arg) || IsObject(arg)) {
        return JSON.parse(JSON.stringify(arg))
    } else return arg
}

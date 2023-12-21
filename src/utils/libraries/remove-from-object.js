'use strict'
import IsObject from './is-object'
import IsArray from './is-array'
import IsString from './is-string'

/**
 * 从对象中删除指定的属性
 * @example arg1 = '{key: 'times', value: '1', name: '次数'},
 * arg2 = ['value'] => {key: 'times', name: '次数'}
 * or
 * arg2 = 'value, name'
 * arg3 = ',' => {key: 'times'}
 * @param {Object} arg1 原对象
 * @param {Array, String} arg2 要删除的属性值，可以是数组，也可以是字符串，如果是字符串，需要传递参数arg3
 * @param {String} [arg3=','] 分隔符，默认为逗号
 * @author Lucita
 * @version 0.0.1
 * @returns {Object} 提取出的新对象
 */
export default (arg1, arg2, arg3 = ',') => {
    if (!IsObject(arg1)) return arg1
    if (!IsArray(arg2) && !IsString(arg2)) return arg1
    if (IsString(arg2)) arg2 = arg2.split(arg3)
    return Object.fromEntries(
        Object.entries(arg1).filter(
            ([k]) => !arg2.includes(k)
        )
    )
}

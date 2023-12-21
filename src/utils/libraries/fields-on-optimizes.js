'use strict'
import IsNullOrEmpty from './is-null-or-empty'
import IsObject from './is-object'
import IsArray from './is-array'

/**
 * 检索指定字段的对象
 * ps: 从指定的对象或者对象数组中按回调参数给定的字段返回对应的对象或者对象数组
 * @example arg1 = [{key: 'I', value: '1'}, {key: 'O', value: '2'}, {key: 'A', value: '2'}]
 * arg2 = ({key}) => ({key}) => [{key: 'I'}, {key: 'O'}, {key: 'A'}]
 * or
 * arg1 = {key: 'I', value: '1'}
 * arg2 = ({key}) => ({key}) => {key: 'I'}
 * @param {Object, Array} arg1 对象或者对象数组
 * @param {Function} [arg2=({...args}) => ({...args})] 回调函数
 * @author Lucita
 * @version 0.0.1
 * @returns {Object, Array} 按回调参数指定的字段返回对象或者对象数组
 */
export default (arg1, arg2 = ({...args}) => ({...args})) => {
    if (IsNullOrEmpty(arg1) || (!IsObject(arg1) && !IsArray(arg1))) return undefined
    return IsObject(arg1) ? arg2(arg1) : Object.keys(arg1).map(key => arg2(arg1[key])) || []
}

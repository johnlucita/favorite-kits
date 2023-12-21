'use strict'
import Overload from './overload'
import IsNullOrEmpty from './is-null-or-empty'
import IsArray from './is-array'
import IsObject from './is-object'
import IsFunction from './is-function'

/**
 * 重载对象
 */
const global_obj = {}

/**
 * 检索对象
 * @example arg1 = [{key: 'I', value: '1'}, {key: 'O', value: '2'}, {key: 'A', value: '2'}],
 * arg2 = 'value',
 * arg3 = '2' => [{key: 'O', value: '2'}, {key: 'A', value: '2'}]
 * or
 * arg2 = (arg) => {return arg['value'] === '2'} => [{key: 'O', value: '2'}, {key: 'A', value: '2'}]
 * @param {Array} arg1 对象数组
 * @param {String, Number, Function} arg2 查询字段名或者索引或者回调函数
 * @param {Any} arg3 匹配查询的字段值，arg2为回调函数时，arg3=undefined
 * @author Lucita
 * @version 0.0.1
 * @returns {Array} 查询对象数组中与[查询字段名或者索引或者回调函数]值匹配的对象数组并返回
 */
const global_fn = (arg1, arg2, arg3) => {
    if (IsNullOrEmpty(arg1) || !IsArray(arg1) || IsNullOrEmpty(arg2, true)) return []
    return arg1.filter(arg => arg && IsObject(arg) && (
        IsFunction(arg2) ? arg2(arg) : arg[arg2] === arg3
    )) || []
}

/**
 * 重载方法
 * @param {Array} arg1 对象数组
 * @param {Function} arg2 查询字段名或者索引或者回调函数
 * @returns {Array} 查询对象数组中与[查询回调函数]值匹配的对象数组并返回
 */
Overload(global_obj, 'fn', function (arg1, arg2) {
    return global_fn(arg1, arg2, undefined)
})
/**
 * 重载方法
 * @param {Array} arg1 对象数组
 * @param {String, Number} arg2 查询字段名或者索引
 * @param {Any} arg3 匹配查询的字段值
 * @returns {Array} 查询对象数组中与[查询字段名或者索引]值匹配的对象数组并返回
 */
Overload(global_obj, 'fn', function (arg1, arg2, arg3) {
    return global_fn(arg1, arg2, arg3)
})

export default global_obj.fn

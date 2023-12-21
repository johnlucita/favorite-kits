'use strict'
import Overload from './overload'
import ObjectsFromObjects from './objects-from-objects'
import IsNullOrEmpty from './is-null-or-empty'
import IsArray from './is-array'

/**
 * 重载对象
 */
const global_obj = {}

/**
 * 检索对象指定字段的值
 * @example arg1 = '[{key: 'I', value: '1'}, {key: 'O', value: '2'}, {key: 'A', value: '2'}]',
 * arg2 = 'value'
 * arg3 = 'key'
 * arg4 = 'I' => '1'
 * or
 * arg2 = 'value'
 * arg3 =  (arg) => { return arg['key'] === 'I' } => '1'
 * @param {Array} arg1 对象数组
 * @param {String, Number} arg2 返回的字段名或者索引
 * @param {String, Number, Function} arg3 查询的字段名或者索引或者回调函数
 * @param {Any} arg4 匹配查询字段值，当arg3为回调函数时，arg4=undefined
 * @author Lucita
 * @version 0.0.1
 * @returns {Array} 查询对象数组中与[查询字段名或者索引或者回调函数]值匹配的对象并返回指定[字段名或者索引]对应的值的数组
 */
const global_fn = (arg1, arg2, arg3, arg4) => {
    if (!IsArray(arg1) || IsNullOrEmpty(arg1) || IsNullOrEmpty(arg2, true)) return []
    if (IsNullOrEmpty(arg3)) return arg1.map(arg => arg[arg2])
    const arrs = ObjectsFromObjects(arg1, arg3, arg4)
    return Object.keys(arrs).map(arg => arrs[arg][arg2]) || []
}

/**
 * 重载方法
 * @param {Array} arg1 对象数组
 * @param {String, Number, Function} arg2 返回的字段名或者索引
 * @author Lucita
 * @version 0.0.1
 * @returns {Array} 查询对象数组，返回指定[字段名或者索引]对应的值的数组
 */
Overload(global_obj, 'fn', function (arg1, arg2) {
    return global_fn(arg1, arg2, undefined, undefined)
})
/**
 * 重载方法
 * @param {Array} arg1 对象数组
 * @param {String, Number, Function} arg2 返回的字段名或者索引
 * @param {String, Number, Function} arg3 查询回调函数
 * @author Lucita
 * @version 0.0.1
 * @returns {Array} 查询对象数组中与[查询回调函数]值匹配的对象并返回指定[字段名或者索引]对应的值的数组
 */
Overload(global_obj, 'fn', function (arg1, arg2, arg3) {
    return global_fn(arg1, arg2, arg3, undefined)
})
/**
 * 重载方法
 * @param {Array} arg1 对象数组
 * @param {String, Number, Function} arg2 返回的字段名或者索引
 * @param {String, Number, Function} arg3 查询的字段名或者索引
 * @param {Any} arg4 匹配查询字段值
 * @author Lucita
 * @version 0.0.1
 * @returns {Array} 查询对象数组中与[查询字段名或者索引]值匹配的对象并返回指定[字段名或者索引]对应的值的数组
 */
Overload(global_obj, 'fn', function (arg1, arg2, arg3, arg4) {
    return global_fn(arg1, arg2, arg3, arg4)
})

export default global_obj.fn

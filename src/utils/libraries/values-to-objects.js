'use strict'
import IsNullOrEmpty from './is-null-or-empty'
import IsObject from './is-object'
import IsArray from './is-array'
import IsFunction from './is-function'
import IsString from './is-string'
import IsNumber from './is-number'

/**
 * 设置对象数组中的对象字段值
 * @example arg1 = [{key: 'I', value: '1'}, {key: 'O', value: '2'}, {key: 'A', value: '2'}]
 * arg2 = 'value',
 * arg3 = '10' => [{key: 'I', value: '10'}, {key: 'O', value: '10'}, {key: 'A', value: '10'}]
 * or
 * arg2 = (arg, value) => {arg['value'] = value}
 * arg3 = '10' => [{key: 'I', value: '10'}, {key: 'O', value: '10'}, {key: 'A', value: '10'}]
 * or
 * arg2 = 'value',
 * arg3 = arg => (arg['key'] === 'I' && '10') || '20' => [{key: 'I', value: '10'}, {key: 'O', value: '20'}, {key: 'A', value: '20'}]
 * or
 * arg2 = (arg, value) => {arg['value'] = value}
 * arg3 = arg => (arg['key'] === 'I' && '10') || '20' => [{key: 'I', value: '10'}, {key: 'O', value: '20'}, {key: 'A', value: '20'}]
 * @param {Array} arg1 对象数组
 * @param {String, Number, Function} arg2 赋值字段名或者索引或者回调函数
 * @param {Any} arg3 要赋的值或者回调函数
 * @author Lucita
 * @version 0.0.1
 * @returns 返回赋值后的对象数组
 */
export default (arg1, arg2, arg3) => {
    if (!IsArray(arg1) || IsNullOrEmpty(arg1)) return
    for (const arg of arg1) {
        if (IsObject(arg)) {
            if (IsFunction(arg2)) {
                IsFunction(arg3) ? arg2(arg, arg3(arg, arg1.indexOf(arg), arg1), arg1.indexOf(arg), arg1)
                    : arg2(arg, arg3, arg1.indexOf(arg), arg1)
            } else if (IsString(arg2) || IsNumber(arg2)) {
                IsFunction(arg3) ? arg[arg2] =
                    arg3(arg, arg1.indexOf(arg), arg1) : arg[arg2] = arg3
            } else break
        } else break
    }
    return arg1
}

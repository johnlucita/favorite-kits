'use strict'
import Overload from './overload'
import IsNullOrEmpty from './is-null-or-empty'
import IsArray from './is-array'
import IsObject from './is-object'
import IsString from './is-string'
import IsNumber from './is-number'

/**
 * 重载对象
 */
const global_obj = {}

/**
 * 设置对象数组索引字段及值
 * @param {Array} arg1 对象数组
 * @param {String, Number} arg2 查询字段或者索引
 * @param {Number} arg3 索引起始值
 * @author Lucita
 * @version 0.0.1
 */
const global_fn = (arg1, arg2, arg3) => {
    if (IsArray(arg1) && !IsNullOrEmpty(arg1) &&
        (IsString(arg2) || IsNumber(arg2))) {
        for (const arg of arg1) {
            if (IsObject(arg)) {
                arg[arg2] = arg3++
            }
        }
    }
}

/**
 * 重载方法
 * @param {Array} arg1 对象数组
 * @param {String, Number} arg2 查询字段或者索引
 * @author Lucita
 * @version 0.0.1
 */
Overload(global_obj, 'fn', function (arg1, arg2) {
    return global_fn(arg1, arg2, 0)
})

/**
 * 重载方法
 * @param {Array} arg1 对象数组
 * @param {String, Number} arg2 查询字段或者索引
 * @param {Number} arg3 索引起始值
 * @author Lucita
 * @version 0.0.1
 */
Overload(global_obj, 'fn', function (arg1, arg2, arg3) {
    return global_fn(arg1, arg2, arg3 >> 0)
})

export default global_obj.fn

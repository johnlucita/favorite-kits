'use strict'
import IsDate from './is-date'
import IsArray from './is-array'
import IsObject from './is-object'
import IsModule from './is-module'
import IsNumber from './is-number'
import IsString from './is-string'
import IsBoolean from './is-boolean'
import IsFunction from './is-function'

/**
 * 判断变量是否为数据类型变量
 * @example arg = {a: 1} => true
 * or
 * arg = 'a' => true
 * or
 * arg = 0 => true
 * or
 * arg = document => false
 * @param {Any} arg 变量
 * @author Lucita
 * @version 0.0.1
 * @returns {Boolean} true/false
 */
export default arg => {
    return IsDate(arg) || IsArray(arg) || IsObject(arg) ||
        IsModule(arg) || IsNumber(arg) || IsString(arg) ||
        IsBoolean(arg) || IsFunction(arg)
}

'use strict'
import IsNullOrEmpty from './is-null-or-empty'
import IsArray from './is-array'
import IsObject from './is-object'

const global_hasOwnProperty = Object.prototype.hasOwnProperty
const global_propertyIsEnumerable = Object.prototype.propertyIsEnumerable

/**
 * 合并对象键值到目标对象
 * @param {Object} arg1 目标对象
 * @param {Object} arg2 合并对象
 * @param {String, Number} arg3 合并键名或数组下标
 * @author Lucita
 * @version 0.0.1
 */
const global_assign_key = (arg1, arg2, arg3) => {
    if (IsArray(arg2[arg3]) && global_hasOwnProperty.call(arg1, arg3)) {
        for (const key in arg2[arg3]) {
            if (IsNullOrEmpty(arg1[arg3][key])) arg1[arg3].push(arg2[arg3][key])
            else global_assign(arg1[arg3][key], arg2[arg3][key])
        }
    } else if (IsObject(arg2[arg3]) && global_hasOwnProperty.call(arg1, arg3)) {
        global_assign(Object(arg1[arg3]), arg2[arg3])
    } else arg1[arg3] = arg2[arg3]
}

/**
 * 合并对象到目标对象
 * @param {Object} arg1 目标对象
 * @param {Object} arg2 合并对象
 * @author Lucita
 * @version 0.0.1
 * @returns {Object} 合并后的目标对象
 */
const global_assign = (arg1, arg2) => {
    if (arg1 === arg2) return arg1
    arg2 = Object(arg2)
    for (const key in arg2) {
        global_assign_key(arg1, arg2, key)
    }
    if (Object.getOwnPropertySymbols) {
        const symbols = Object.getOwnPropertySymbols(arg2)
        for (const symbol of symbols) {
            if (global_propertyIsEnumerable.call(arg2, symbol)) {
                global_assign_key(arg1, arg2, symbol)
            }
        }
    }
    return arg1
}

/**
 * 对象深度合并
 * @example arg1 = {key: 'I', Name: {a: 1, b: 2}}
 * arg2 = {value: '2'} => {key: 'I', value: '2', Name: {a: 1, b: 2}}
 * arg3 = {Name: {c: 3}} => {key: 'I', value: '2', Name: {a: 1, b: 2, c: 3}}
 * ...
 * @param {Object} arg1 对象
 * @param {Object} args ...对象（虚参）
 * @author Lucita
 * @version 0.0.1
 * @returns {Object} 合并后对象
 */
export default (arg1, ...args) => {
    arg1 = Object(arg1)
    for (const arg of args) {
        global_assign(arg1, arg)
    }
    return arg1
}

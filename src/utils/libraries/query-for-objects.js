'use strict'

/**
 * 检索对象数组
 * @example arg1 = 'I',
 * arg2 = [{key: 'I', value: '住院'}, {key: 'O', value: '门诊'}],
 * arg3 = ['key', 'value'] => '住院'
 * @param {String, Number, Date} arg1 查询字段值
 * @param {Array} arg2 对象数组
 * @param {Array} arg3 ['查询字段名'，'返回字段名']
 * @author Lucita
 * @version 0.0.1
 * @returns {Any} 查询对象数组中与[查询字段名]值匹配的对象并返回[返回字段名]对应的字段值
 */
export default (arg1, arg2, arg3 = ['key', 'value']) => {
    let result = null
    if (Array.isArray(arg2) && arg2.length) {
        const obj = arg2.find(
            x => typeof x === 'object' &&
                x[arg3[0]] === arg1
        ) || {}
        if (obj.hasOwnProperty(arg3[1]))
            result = obj[arg3[1]]
    }
    return result
}

'use strict'
import IsNullOrEmpty from './is-null-or-empty'
import IsArray from './is-array'

/**
 * 对象数组去重
 * @example arg1 = '[{key: 'I', value: '1'}, {key: 'O', value: '2'}, {key: 'A', value: '2'}]',
 * arg2 = 'value' => [{key: 'I', value: '1'}, {key: 'O', value: '2'}]
 * @param {Array} arg1 对象数组
 * @param {String, Number} arg2 查询字段名或者索引
 * @param {Any} arg3 匹配查询的字段值
 * @author Lucita
 * @version 0.0.1
 * @returns {Array} 查询对象数组中，按[查询字段名或者索引]取值去重后的对象数组并返回
 */
export default (arg1, arg2) => {
    let result = []
    if (!IsNullOrEmpty(arg1) && IsArray(arg1) && !IsNullOrEmpty(arg2, true)) {
        const _hash = {}
        result = arg1.reduceRight((item, next) => {
            if (next[arg2] in _hash) return item
            else _hash[next[arg2]] = true, item.push(next)
        }, [])
    }
    return result || []
}

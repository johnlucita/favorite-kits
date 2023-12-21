'use strict'
import Replacer from './replacer'

/**
 * 替换键值对儿
 * @param {String} arg1 原字符串
 * @param {Object} arg2 搜索键值对
 * @author Lucita
 * @version 0.0.1
 * @returns {String} 替换后的字符串
 */
export default (arg1, arg2 = {}) => {
    let result = arg1 || ''
    Object.keys(arg2).map(key => {
        result = Replacer(result, `%{${key}}`, arg2[key], false)
        result = Replacer(result, `{${key}}`, arg2[key], false)
    })
    return result
}

'use strict'
import IsString from './is-string'

/**
 * 从字符串中提取内容
 * @example arg1 = '-￥1,200.01'
 * arg2 = \/[-]?\d*\.?\d*\/ig => -1200.01
 * @param {String} arg1 任意字符串
 * @param {String} arg2 正则表达式，默认为提取数值
 * @author Lucita
 * @version 0.0.1
 * @returns {String} 提取的内容，默认返回空串
 */
export default (arg1, arg2 = /[-]?\d*\.?\d*/ig) => {
    if (!IsString(arg1)) arg1 = ''
    try {
        return arg1.match(arg2).join('')
    } catch {
        return ''
    }
}

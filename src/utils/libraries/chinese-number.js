'use strict'
import IsNullOrEmpty from './is-null-or-empty'
import ExtractFromString from './extract-from-string'

/**
 * 阿波罗数字转换为中文大写数字
 * @example '12' => '一二'
 * '12', TC => '壹贰'
 * @param {String, Number} arg1 数字
 * @param {String} arg2 简体/繁体，取值范围[CN 简体, TC 繁体, RM 罗马]，默认TC
 * @author Lucita
 * @version 0.0.1
 * @returns {String} 转换后的中文大写数字
 */
export default (arg1, arg2 = 'TC') => {
    arg1 = ExtractFromString(arg1.toString(), /\d*/ig)
    if (IsNullOrEmpty(arg1)) return ''
    const extracts = Array.from(arg1)
    const values = {
        CN: ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'],
        TC: ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'],
        RM: ['', 'Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ', 'Ⅵ', 'Ⅶ', 'Ⅷ', 'Ⅸ']
    }
    extracts.forEach((x, i, arr) => arr[i] = values[arg2][Number(x)] || '')
    return extracts.join('')
}

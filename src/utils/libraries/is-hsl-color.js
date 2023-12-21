'use strict'
import IsString from './is-string'

/**
 * 判断字符串是否为HSL或者HSLA颜色值
 * arg = 'hsl(65, 20%, 10%)' => true
 * @param {Any} arg 字符串
 * @author Lucita
 * @version 0.0.1
 * @returns {Boolean} true/false
 */
export default arg => {
    if (!IsString(arg)) arg = arg.toString()
    return /^hsla?\(\s*(0|\d{0,2}|2\d{2}|3[0-5][0-9]|360),\s*((\d{1,2}|100)[%]?),\s*((\d{1,2}|100)[%]?)(?:,\s*((\d{0,2}(?:\.\d+)?|100)[%]?))?\s*\)$/.test(arg.toLowerCase())
}

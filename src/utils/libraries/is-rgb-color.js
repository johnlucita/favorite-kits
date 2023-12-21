'use strict'
import IsString from './is-string'

/**
 * 判断字符串是否为RGB或者RGBA颜色值
 * arg = 'rgb(65, 66, 128)' => true
 * @param {Any} arg 字符串
 * @author Lucita
 * @version 0.0.1
 * @returns {Boolean} true/false
 */
export default arg => {
    if (!IsString(arg)) arg = arg.toString()
    return /^rgba?\(\s*(0|\d{0,2}|1\d{2}|2[0-4][0-9]|25[0-5])?,\s*(0|\d{0,2}|1\d{2}|2[0-4][0-9]|25[0-5])?,\s*(0|\d{0,2}|1\d{2}|2[0-4][0-9]|25[0-5])?\s*\)$/.test(arg.toLowerCase())
}

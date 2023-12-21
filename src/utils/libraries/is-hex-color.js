'use strict'
import IsString from './is-string'

/**
 * 判断字符串是否为HEX颜色值
 * arg = '#FFFFFF' => true
 * @param {Any} arg 字符串
 * @author Lucita
 * @version 0.0.1
 * @returns {Boolean} true/false
 */
export default arg => {
    if (!IsString(arg)) arg = arg.toString()
    return /^#([0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(arg.toLowerCase())
}

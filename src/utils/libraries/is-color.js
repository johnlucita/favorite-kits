'use strict'
import IsString from './is-string'
import IsRgb from './is-rgb-color'
import IsHsl from './is-hsl-color'
import IsHex from './is-hex-color'

/**
 * 判断字符串是否为颜色值
 * arg = '#FFFFFF' => true
 * @param {Any} arg 字符串
 * @author Lucita
 * @version 0.0.1
 * @returns {Boolean} true/false
 */
export default arg => {
    if (!IsString(arg)) arg = arg.toString()
    arg = arg.toLowerCase()
    return IsRgb(arg) || IsHsl(arg) || IsHex(arg)
}

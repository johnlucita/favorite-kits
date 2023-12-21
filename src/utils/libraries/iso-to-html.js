'use strict'
import Enums from '../../enums'
import IsNullOrEmpty from './is-null-or-empty'

const { HTML_ESCAPE } = Enums || {}

/**
 * 将ISO编码转义成HTML
 * @param {String} arg 存在ISO编码的字符串
 * @author Lucita
 * @version 0.0.1
 * @returns {String} 转义后的字符串
 */
export default arg => {
    if (IsNullOrEmpty(arg)) return ''
    let _str = arg
    for (const [key, value] of Object.entries(HTML_ESCAPE)) {
        const _deci = `&#${key};`
        const _enti = `&${value[0]};`
        const _char = value[1]
        _str = _str.replace(new RegExp(_deci, 'g'), _char)
        _str = _str.replace(new RegExp(_enti, 'g'), _char)
    }
    return _str
}

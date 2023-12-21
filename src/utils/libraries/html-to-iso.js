'use strict'
import Enums from '../../enums'
import IsNullOrEmpty from './is-null-or-empty'

const { ISO_NAEM_TYPE, HTML_ESCAPE } = Enums || {}

/**
 * 将HTML转义成ISO编码
 * @param {String} arg1 Html字符串
 * @param {Number} [arg2=ISO_NAME_TYPE.Name] 编码类型，默认为实体名称
 * @author Lucita
 * @version 0.0.1
 * @returns {String} ISO编码后的字符串
 */
export default (arg1, arg2 = ISO_NAEM_TYPE.Name) => {
    if (IsNullOrEmpty(arg1)) return ''
    let _str = arg1
    for (const [key, value] in Object.entries(HTML_ESCAPE)) {
        const _repl = arg2 === ISO_NAEM_TYPE.Name ? `&${value[0]};` : `&#${key};`
        const _char = value[1]
        _str = _str.replace(new RegExp(_char, 'g'), _repl)
    }
    return _str
}

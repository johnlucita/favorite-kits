'use strict'

/**
 * 将字符串使用指定符号括起来
 * @param {String} [arg1 = ''] 字符串，默认为空串
 * @param {String} [arg2 = 'parenthesis'] 符号, 默认取值：parenthesis
 * 取值范围：
 * 1、brace = {}
 * 2、square = []
 * 3、parenthesis = ()
 * 4、angular = <>
 * 6、single = ''
 * 7、double = ""
 * 8、custom = 自定义参数custom值
 * @param {Array} [arg3 = '['', '']'] 自定义符号
 * @author Lucita
 * @version 0.0.1
 * @returns {String} 使用指定符号括起来的字符串
 */
export default (arg1 = '', arg2 = 'parenthesis', arg3 = ['', '']) => {
    let result = arg1 || ''
    if (arg1) {
        switch (arg2) {
            case 'brace':
                result = `{${result}}`
                break
            case 'square':
                result = `[${result}]`
                break
            case 'parenthesis':
                result = `(${result})`
                break
            case 'angular':
                result = `<${result}>`
                break
            case 'single':
                result = `'${result}'`
                break
            case 'double':
                result = `"${result}"`
                break
            case 'custom':
            default:
                result = `${arg3[0] || ''}${result}${arg3[1] || ''}`
                break
        }
    }
    return result
}

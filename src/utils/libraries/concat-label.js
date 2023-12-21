'use strict'
import Enums from '../../enums'

const { DIRECTION_NAME } = Enums || {}

/**
 * 组合字符串
 * @param {String} arg1 字符串1
 * @param {String} arg2 字符串2 (默认为空串)
 * @param {String} arg3 方向（front, behind, 默认标签显示在后面）
 * @author Lucita
 * @version 0.0.1
 * @returns {String} 组合后的字符串
 */
export default (arg1, arg2 = '', arg3 = 'behind') => {
    let result = arg1 || ''
    if (arg1 && typeof arg1 === 'string') {
        if (arg3 && typeof arg3 === 'string') {
            let cheao = ''
            if (arg2 && typeof arg2 === 'string') {
                cheao = arg2
            }
            switch (arg3) {
                case DIRECTION_NAME.Front:
                    result = cheao + arg1
                    break
                default:
                case DIRECTION_NAME.Behind:
                    result = arg1 + cheao
                    break
            }
        } else {
            result = arg1
        }
    }
    return result
}

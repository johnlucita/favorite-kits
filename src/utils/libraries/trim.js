'use strict'
import Enums from '../../enums'

const { DIRECTION_NAME } = Enums || {}

/**
 * 去掉字符串中的空格
 * @param {String} arg1 字符串
 * @param {String} arg2 空格位（left：去左边空格；right：去右边空格；side：去两边空格（默认））
 * @author Lucita
 * @version 0.0.1
 * @returns {String} result 去掉空格后的字符串
 */
export default (arg1, arg2) => {
    arg2 = arg2 || DIRECTION_NAME.Outside
    switch (arg2) {
        case DIRECTION_NAME.Left:
            return (arg1 || '').replace(/(^\s*)/g, '')
        case DIRECTION_NAME.Right:
            return (arg1 || '').replace(/(\s*$)/g, '')
        case DIRECTION_NAME.Outside:
        default:
            return (arg1 || '').replace(/(^\s*)|(\s*$)/g, '')
    }
}

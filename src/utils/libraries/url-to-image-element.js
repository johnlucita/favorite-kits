'use strict'
import Enums from '../../enums'
import IsNullOrEmpty from './is-null-or-empty'
import IsString from './is-string'
import IsFunction from './is-function'

const { ERROR_MESSAGE } = Enums || {}

/**
 * 图像地址转成图像元素
 * @example 
 * @param {String} arg1 图像地址
 * @param {Function} [arg2=()=>null] 回调函数，返回图像元素，默认返回null
 * @author Lucita
 * @version 0.0.1
 * @returns {HTMLImageElement} 回调返回图像元素
 */
export default (arg1, arg2 = () => null) => {
    if (IsNullOrEmpty(arg1) || IsNullOrEmpty(arg2)) {
        throw new Error(ERROR_MESSAGE.InvalidArgument)
    }
    if (!IsString(arg1)) {
        throw new Error(ERROR_MESSAGE.ArgTypeNotString)
    }
    if (!IsFunction(arg2)) {
        throw new Error(ERROR_MESSAGE.ArgTypeNotFunction)
    }
    const _image = new Image()
    _image.onload = event => arg2(_image, event)
    _image.onerror = event => arg2(_image, event)
    _image.src = arg1
}

'use strict'
import Enums from '../../enums'
import IsNullOrEmpty from './is-null-or-empty'
import IsCanvasElement from './is-canvas-element'

const { ERROR_MESSAGE } = Enums || {}

/**
 * canvas元素转成dataUrl编码字符串
 * @example 
 * @param {File} arg1 canvas元素
 * @param {String} [arg2='image/jpeg'] 图像MIME类型，默认image/jpeg
 * @param {Number} [arg3=0.8] 图像质量，取值范围0-1，默认0.8，超出范围取值0.92
 * @author Lucita
 * @version 0.0.1
 * @returns {String} dataUrl编码字符串
 */
export default (arg1, arg2 = 'image/jpeg', arg3 = 0.8) => {
    if (IsNullOrEmpty(arg1)) {
        throw new Error(ERROR_MESSAGE.InvalidArgument)
    }
    if (!IsCanvasElement(arg1)) {
        throw new Error(ERROR_MESSAGE.ArgTypeNotCanvasElement)
    }
    return arg1.toDataURL(arg2, arg3)
}

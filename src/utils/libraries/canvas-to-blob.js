'use strict'
import Enums from '../../enums'
import IsNullOrEmpty from './is-null-or-empty'
import IsCanvasElement from './is-canvas-element'
import IsFunction from './is-function'

const { ERROR_MESSAGE } = Enums || {}

/**
 * canvas元素转成二进制大对象
 * @example 
 * @param {File} arg1 canvas元素
 * @param {Function} [arg2=()=>null] 回调函数，返回图像元素，默认返回null
 * @param {String} [arg3='image/jpeg'] 图像MIME类型，默认image/jpeg
 * @param {Number} [arg4=0.8] 图像质量，取值范围0-1，默认0.8，超出范围取值0.92
 * @author Lucita
 * @version 0.0.1
 * @returns {String} 回调返回二进制大对象
 */
export default (arg1, arg2 = () => null, arg3 = 'image/jpeg', arg4 = 0.8) => {
    if (IsNullOrEmpty(arg1) || IsNullOrEmpty(arg2)) {
        throw new Error(ERROR_MESSAGE.InvalidArgument)
    }
    if (!IsCanvasElement(arg1)) {
        throw new Error(ERROR_MESSAGE.ArgTypeNotCanvasElement)
    }
    if (!IsFunction(arg2)) {
        throw new Error(ERROR_MESSAGE.ArgTypeNotFunction)
    }
    arg1.toBlob(blob => arg2(blob), arg3, arg4)
}

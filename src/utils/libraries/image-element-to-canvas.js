'use strict'
import Enums from '../../enums'
import IsNullOrEmpty from './is-null-or-empty'
import IsNumber from './is-number'
import IsImageElement from './is-image-element'

const { ERROR_MESSAGE } = Enums || {}

/**
 * image元素转成canvas元素
 * @example 
 * @param {HTMLImageElement} arg1 image元素
 * @param {Number} [arg2=null] 画布宽度
 * @param {Number} [arg3=null] 画面高度
 * @author Lucita
 * @version 0.0.1
 * @returns {Canvas} canvas元素
 */
export default (arg1, arg2 = null, arg3 = null) => {
    if (IsNullOrEmpty(arg1)) {
        throw new Error(ERROR_MESSAGE.InvalidArgument)
    }
    if (!IsImageElement(arg1)) {
        throw new Error(ERROR_MESSAGE.ArgTypeNotImageElement)
    }
    if (!IsNumber(arg2)) arg2 = 0
    if (!IsNumber(arg3)) arg3 = 0
    const _ratio = arg1.naturalWidth / arg1.naturalHeight
    arg2 = Math.max(arg2, 0) || arg1.naturalWidth
    arg3 = Math.max(arg3, 0) || arg1.naturalHeight
    if (arg3 * _ratio > arg2) arg3 = arg2 / _ratio
    else arg2 = arg3 * _ratio
    const _canvas = document.createElement('canvas')
    const _ctx = _canvas.getContext('2d')
    _canvas.width = arg2 || arg1.naturalWidth
    _canvas.height = arg3 || arg1.naturalHeight
    _ctx.fillStyle = 'transparent'
    _ctx.drawImage(arg1, 0, 0, _canvas.width, _canvas.height)
    return _canvas
}

'use strict'
import Enums from '../../enums'
import IsNullOrEmpty from './is-null-or-empty'
import IsBlob from './is-blob'
import IsFunction from './is-function'

const { ERROR_MESSAGE } = Enums || {}

/**
 * 二进制大对象转成dataurl编码字符串
 * @example 
 * @param {File} arg1 图像文件
 * @param {Function} [arg2=()=>null] 回调函数，返回图像元素，默认返回null
 * @author Lucita
 * @version 0.0.1
 * @returns {String} 回调返回dataurl编码字符串
 */
export default (arg1, arg2 = () => null) => {
    if (IsNullOrEmpty(arg1) || IsNullOrEmpty(arg2)) {
        throw new Error(ERROR_MESSAGE.InvalidArgument)
    }
    if (!IsBlob(arg1)) {
        throw new Error(ERROR_MESSAGE.ArgTypeNotBlob)
    }
    if (!IsFunction(arg2)) {
        throw new Error(ERROR_MESSAGE.ArgTypeNotFunction)
    }
    const _reader = new FileReader()
    _reader.onload = () => arg2(_reader.result)
    _reader.readAsDataURL(arg1)
}

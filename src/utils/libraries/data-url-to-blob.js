'use strict'
import IsDataUrl from './is-dataurl'
import Base64 from './base-64'

/**
 * dataUrl编码为File
 * @param {String} arg1 dataUrl编码字符串
 * @param {String} [arg2=null] MIME类型
 * @author Lucita
 * @version 0.0.1
 * @returns {Blob} 成功解码返回文件对象，否则返回null
 */
export default (arg1, arg2 = null) => {
    if (!IsDataUrl(arg1)) return null
    const _data = arg1.split(',')[1]
    const _mime = arg1.match(/:(.*?);/)[1]
    const _buffer = Base64(_data, false)
    const _bytes = new Uint8Array(_buffer.length)
    for (let i = 0; i < _buffer.length; i++) {
        _bytes[i] = _buffer.charCodeAt(i)
    }
    return new Blob([_bytes], { type: arg2 || _mime })
}

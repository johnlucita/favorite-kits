'use strict'
import Enums from '../../enums'
import IsNullOrEmpty from './is-null-or-empty'
import IsFile from './is-file'
import IsFunction from './is-function'
import FileToDataUrl from './file-to-data-url'

const { ERROR_MESSAGE } = Enums || {}

export default (arg1, arg2 = () => null) => {
    if (IsNullOrEmpty(arg1) || IsNullOrEmpty(arg2)) {
        throw new Error(ERROR_MESSAGE.InvalidArgument)
    }
    if (!IsFile(arg1)) {
        throw new Error(ERROR_MESSAGE.ArgTypeNotFile)
    }
    if (!IsFunction(arg2)) {
        throw new Error(ERROR_MESSAGE.ArgTypeNotFunction)
    }
    const _image = new Image()
    const _url = window.webkitURL || window.URL
    if (_url) {
        const _dataUrl = _url.createObjectURL(arg1)
        _image.src = _dataUrl
        _image.onload = event => {
            arg2(_image, event)
            _url.revokeObjectURL(_dataUrl)
        }
    } else {
        FileToDataUrl(arg1, arg => {
            _image.onload = event => arg2(_image, event)
            _image.onerror = event => arg2(_image, event)
            _image.src = arg
        })
    }
}

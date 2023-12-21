'use strict'
import * as Library from './libraries'

if (!HTMLCanvasElement.prototype.toBlob) {
    Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
        value: function (callback, type, quality) {
            const _dataUrl = this.toDataURL(type, quality)
            callback(Library.ConvertDataUrlToBlob(_dataUrl))
        }
    })
}

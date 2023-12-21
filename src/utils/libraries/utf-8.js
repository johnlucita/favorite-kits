'use strict'

/**
 * UTF-8编码
 * @example arg = 'utf-8' => 
 * @param {String} arg 字符串
 * @returns {String} 编码后的字符串
 */
export default (arg) => {
    let utftext = ''
    for (let n = 0; n < arg.length; n++) {
        const c = arg.charCodeAt(n)
        if (c < 128) {
            utftext += String.fromCharCode(c)
        } else if ((c > 127) && (c < 2048)) {
            utftext += String.fromCharCode((c >> 6) | 192)
            utftext += String.fromCharCode((c & 63) | 128)
        } else {
            utftext += String.fromCharCode((c >> 12) | 224)
            utftext += String.fromCharCode(((c >> 6) & 63) | 128)
            utftext += String.fromCharCode((c & 63) | 128)
        }
    }
    return utftext
}

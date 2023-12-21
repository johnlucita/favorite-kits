'use strict'

/**
 * BASE-64编码
 * @param { String } arg1 字符串
 * @param { Boolean } [arg2=true] 编码/解码， true为编码，false为解码，默认为true
 * @author Lucita
 * @version 0.0.1
 * @returns { String } 编码/解码后字符串
 */
export default (arg1, arg2 = true) => {
    if (arg2) {
        return Buffer.from(arg1).toString('base64')
    } else return Buffer.from(
        arg1.replace(/\s/g, '+'), 'base64'
    ).toString()
}

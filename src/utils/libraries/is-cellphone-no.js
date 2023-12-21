'use strict'
import IsString from './is-string'
import Enums from '../../enums'

const { COUNTRY_CODE } = Enums || {}

/**
 * 判断数据是否为手机号
 * @param {String} arg1 数据
 * @param {COUNTRY_CODE} arg2 国家编码
 * @author Lucita
 * @version 0.0.1
 * @returns {Boolean} true/false
 */
export default (arg1, arg2 = COUNTRY_CODE.CN) => {
    if (!IsString(arg1)) arg1 = arg1.toString()
    switch (arg2) {
        case COUNTRY_CODE.TW:
            return /^(\+?886-?|0)?9\d{8}$/.test(arg1)
        case COUNTRY_CODE.MO:
            return /^(\+?853-?|0)?[6]([6|8])\d{5}$/.test(arg1)
        case COUNTRY_CODE.HK:
            return /^(\+?852-?|0)?([6|9])\d{7}$/.test(arg1)
        case COUNTRY_CODE.CN:
        default:
            return /^(\+?0?86-?)?1[345789]\d{9}$/.test(arg1)
    }
}

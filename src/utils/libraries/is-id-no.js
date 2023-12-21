'use strict'
import IsString from './is-string'
import Enums from '../../enums'

const { COUNTRY_CODE } = Enums || {}

/**
 * 判断数据是否为身份证号
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
            return /^[a-zA-Z][0-9]{9}$/.test(arg1)
        case COUNTRY_CODE.MO:
            return /^[1|5|7][0-9]{6}[0-9A-Z]$/.test(arg1)
        case COUNTRY_CODE.HK:
            return /^[A-Z]{1,2}[0-9]{6,10}[0-9A-Z]$/.test(arg1)
        case COUNTRY_CODE.CN:
        default: {
            return /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(arg1)
        }
    }
}

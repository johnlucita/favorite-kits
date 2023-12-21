'use strict'
import Enums from '../../enums'

const { DATE_PART_NAME } = Enums || {}

/**
 * 时间差
 * @param {Date, String, Number} arg1 时间1
 * @param {Date, String, Number} arg2 时间2
 * @param {String} arg3 计算单位
 * @author Lucita
 * @version 0.0.1
 * @returns {Number} 时间差
 */
export default (arg1, arg2, arg3) => {
    arg1 = new Date(arg1)
    arg2 = new Date(arg2)
    let statmps = 24 * 60 * 60 * 1000
    switch (arg3) {
        case DATE_PART_NAME.Year:
            statmps *= 365
            break
        case DATE_PART_NAME.Quarter:
            statmps *= 30 * 4
            break
        case DATE_PART_NAME.Month:
            statmps *= 30
            break
        case DATE_PART_NAME.Week:
            statmps *= 7
            break
        case DATE_PART_NAME.Day:
        default:
            statmps *= 1
            break
    }
    return parseInt(Math.abs(arg1 - arg2) / statmps) || 0
}

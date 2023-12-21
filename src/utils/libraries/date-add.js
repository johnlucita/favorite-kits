'use strict'
import Enums from '../../enums'

const { DATE_PART_NAME } = Enums || {}

/**
 * 日期加减
 * @param {Date} arg1 加减前的日期
 * @param {Number} arg2 计算单位
 * @param {Number} arg3 单位数量
 * @author Lucita
 * @version 0.0.1
 * @returns {Date} 加减后的日期
 */
export default (arg1, arg2, arg3) => {
    const result = new Date(arg1)
    if (!isNaN(Number(arg3))) {
        switch (arg2) {
            case DATE_PART_NAME.Year:
                result.setFullYear(result.getFullYear() + arg3)
                break
            case DATE_PART_NAME.Quarter:
                result.setMonth(result.getMonth() + arg3 * 3)
                break
            case DATE_PART_NAME.Month:
                result.setMonth(result.getMonth() + arg3)
                break
            case DATE_PART_NAME.Week:
                result.setDate(result.getDate() + arg3 * 7)
                break
            case DATE_PART_NAME.Day:
            default:
                result.setDate(result.getDate() + arg3)
                break
            case DATE_PART_NAME.Hour:
                result.setHours(result.getHours() + arg3)
                break
            case DATE_PART_NAME.Minutes:
                result.setMinutes(result.getMinutes() + arg3)
                break
            case DATE_PART_NAME.Seconds:
                result.setSeconds(result.getSeconds() + arg3)
                break
        }
    }
    return result
}

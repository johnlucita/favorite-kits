'use strict'
import Enums from '../../enums'

const { WEEK_TABLE } = Enums || {}

/**
 * 获取星期
 * @param {Number, String, Date} arg 日期
 * @author Lucita
 * @version 0.0.1
 * @returns {String} 星期
 */
export default arg => {
    arg = new Date(arg)
    if (isNaN(arg.getTime())) return undefined
    const _week = arg.getDay()
    return WEEK_TABLE[_week]
}

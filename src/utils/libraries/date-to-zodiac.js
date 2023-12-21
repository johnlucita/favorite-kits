'use strict'
import Enums from '../../enums'
import IsNullOrEmpty from './is-null-or-empty'
import First from './first'
import Clone from './clone'
import SloarToLunar from './sloar-to-lunar'

const { CHINESE_CALENDAR_TABLE, ZODIAC_TABLE } = Enums || {}

/**
 * 农历年份
 */
const CHINESE_CALENDAR_YEARS = Object.keys(CHINESE_CALENDAR_TABLE).sort((m, n) => m - n)
/**
 * 基准年
 */
const BENCHMARK_YEAR = Number(First(Clone(CHINESE_CALENDAR_YEARS)))
/**
 * 获取属相
 * @param {Number, String, Date} arg 日期
 * @author Lucita
 * @version 0.0.1
 * @returns {String} 属相
 */
export default arg => {
    arg = new Date(arg)
    if (isNaN(arg.getTime())) return undefined
    const _lunar = SloarToLunar(arg)
    if (IsNullOrEmpty(_lunar.y)) return undefined
    const _key = (_lunar.y - BENCHMARK_YEAR) % 12
    return ZODIAC_TABLE[_key] || ''
}

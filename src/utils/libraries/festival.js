'use strict'
import Enums from '../../enums'
import IsNullOrEmpty from './is-null-or-empty'
import IsNumeric from './is-numeric'
import Filler from './filler'
import SloarToLunar from './sloar-to-lunar'

const { FESTIVAL_TYPE, SOLAR_CALENDAR_FESTIVAL } = Enums || {}
const { WEEKLY_CALENDAR_FESTIVAL } = Enums || {}
const { TWENTY_FOUR_SOLAR_TERMS } = Enums || {}
const { LUNAR_FESTIVAL } = Enums || {}

/**
 * 获取指定年、月、日所对应的节日、节气等
 * @param {Number, String} arg1 年份
 * @param {Number, String} arg2 月份
 * @param {Number, String} arg3 日期
 * @param { FESTIVAL_TYPE } [arg4=FESTIVAL_TYPE.SolarCalendar] 获取节日类型，默认获取阳历节日
 * @author Lucita
 * @version 0.0.1
 * @returns {String} 日期对应的节日、节气等
 */
export default (arg1, arg2, arg3, arg4 = FESTIVAL_TYPE.SolarCalendar) => {
    let result = ''
    switch (arg4) {
        default:
        case FESTIVAL_TYPE.SolarCalendar:
            result = getSolarCalendar(arg2, arg3)
            break
        case FESTIVAL_TYPE.WeeklyCalendar:
            result = getWeeklyCalendar(arg1, arg2, arg3)
            break
        case FESTIVAL_TYPE.TwentyFourSolarTerms:
            result = getTwentyFourSolarTerms(arg1, arg2, arg3)
            break
        case FESTIVAL_TYPE.ChineseCalendar:
            result = getChineseCalendar(arg1, arg2, arg3)
            break
    }
    return result
}

/**
 * 获取阳历节日
 * @param {Number, String} arg1 月份
 * @param {Number, String} arg2 日期
 * @returns 阳历节日，指定日期下没有节日则返回空串
 */
const getSolarCalendar = (arg1, arg2) => {
    let result = ''
    if (IsNumeric(arg1) && IsNumeric(arg2)) {
        arg1 = Number(arg1)
        arg2 = Number(arg2)
        for (const [key, value] of Object.entries(SOLAR_CALENDAR_FESTIVAL)) {
            if (`${key} ${value}`.match(/^(\d{2})(\d{2})([\s*])(.+)$/)) {
                if (Number(RegExp.$1) === arg1 && Number(RegExp.$2) === arg2) {
                    result = RegExp.$4
                    break
                }
            }
        }
    }
    return result
}

/**
 * 获取指定日期的周历节日
 * @param {Number, String} arg1 年份
 * @param {Number, String} arg2 月份
 * @param {Number, String} arg3 日期
 * @returns 返回周历节日
 */
const getWeeklyCalendar = (arg1, arg2, arg3) => {
    let result = ''
    if (IsNumeric(arg1) && IsNumeric(arg2) && IsNumeric(arg3)) {
        arg1 = Number(arg1)
        arg2 = Number(arg2)
        arg3 = Number(arg3)
        for (const [key, value] of Object.entries(WEEKLY_CALENDAR_FESTIVAL)) {
            if (`${key} ${value}`.match(/^(\d{2})(\d)(\d)([\s*])(.+)$/)) {
                if (Number(RegExp.$1) === arg2) {
                    const _firstWeek = new Date(`${arg1}/${arg2}/01`).getDay()
                    let _part1 = Number(RegExp.$2)
                    const _part2 = Number(RegExp.$3)
                    let _day = 0
                    if (_part1 < 5) {
                        _day = ((_firstWeek > _part2) ? 7 : 0)
                            + 7 * (_part1 - 1)
                            + _part2 - _firstWeek + 1
                    } else {
                        _part1 -= 5
                        const _currMonth = new Date(`${arg1}/${arg2}/01`).getTime()
                        const _nextMonth = new Date(`${arg1}/${arg2 + 1}/01`).getTime()
                        const _currDays = (_nextMonth - _currMonth) / 24 / 60 / 60 / 1000
                        const _part3 = (_firstWeek + _currDays - 1) % 7
                        _day = _currDays - _part3 - 7 * _part1
                            + _part2 - (_part2 > _part3 ? 7 : 0)
                    }
                    if (_day === arg3) {
                        result = RegExp.$5
                        break
                    }
                }
            }
        }
    }
    return result
}

/**
 * 获取指定日期对应的二十四节气
 * @param {Number, String} arg1 年份
 * @param {Number, String} arg2 月份
 * @param {Number, String} arg3 日期
 * @returns 返回二十四节气
 */
const getTwentyFourSolarTerms = (arg1, arg2, arg3) => {
    let result = {
        cd: `${arg1}/${arg2}/${arg3}`,
        td: '',
        nd: '',
        value: '',
        day: 0,
        next: '',
        countdown: 0
    }
    if (IsNumeric(arg1) && IsNumeric(arg2) && IsNumeric(arg3)) {
        let _arg1 = Number(arg1)
        let _arg2 = Number(arg2)
        let _arg3 = Number(arg3)
        const _keys = Object.keys(TWENTY_FOUR_SOLAR_TERMS)
        const _values = Object.values(TWENTY_FOUR_SOLAR_TERMS)
        const _utc = Date.UTC(1900, 0, 6, 2, 5)
        const getLastDate = (y, m) => {
            return new Date(y, m, '0').getDate()
        }
        const getUTCDate = (y, value) => {
            const _utcDate = new Date((
                31556925974.7 * (y - 1900) +
                Number(_keys[value]) * 60000
            ) + _utc)
            return _utcDate.getUTCDate()
        }
        const getNextSolar = () => {
            if (arg2 === 12) {
                return _values[0]
            } else {
                return _values[arg2 * 2]
            }
        }
        const getCountdownDays = () => {
            const _lastDays = getLastDate(arg1, arg2)
            const _nextUtc = getUTCDate(
                arg2 === 12 ? arg1 + 1 : arg1,
                arg2 === 12 ? 0 : arg2 * 2
            )
            return _lastDays - arg3 + _nextUtc
        }
        const getNextDate = () => {
            const _utc = getCountdownDays()
            if (arg2 === 12) {
                return `${arg1 + 1}/01/${_utc}`
            } else {
                return `${arg1}/${arg2}/${_utc}`
            }
        }
        while (IsNullOrEmpty(result.value)) {
            const _index = (_arg2 - 1) * 2
            const _utc1 = getUTCDate(_arg1, _index + 1)
            const _utc2 = getUTCDate(_arg1, _index)
            if (_utc1 === _arg3) {
                result.value = _values[_index + 1]
                result.day++
                result.td = `${_arg1}/${_arg2}/${_arg3}`
                result.nd = getNextDate()
                result.next = getNextSolar()
                result.countdown = getCountdownDays()
            } else if (_utc2 === _arg3) {
                result.value = _values[_index]
                result.day++
                result.td = `${_arg1}/${_arg2}/${_arg3}`
                result.nd = `${_arg1}/${_arg2}/${_utc1}`
                result.next = _values[_index + 1]
                result.countdown = _utc1 - _arg3
            } else {
                if (_arg3 > 1) _arg3--
                else {
                    _arg2--
                    if (_arg2 < 0) {
                        _arg1--
                        _arg2 = 12
                    }
                    _arg3 = getLastDate(_arg1, _arg2)
                }
                result.day++
            }
        }
    }
    return result
}

/**
 * 获取指定日期的农历节日
 * @param {Number, String} arg1 年份
 * @param {Number, String} arg2 月份
 * @param {Number, String} arg3 日期
 * @returns 返回农历节日
 */
const getChineseCalendar = (arg1, arg2, arg3) => {
    let result = ''
    if (IsNumeric(arg1) && IsNumeric(arg2) && IsNumeric(arg3)) {
        arg1 = Number(arg1)
        arg2 = Number(arg2)
        arg3 = Number(arg3)
        const { m, d } = SloarToLunar(new Date(arg1, arg2 - 1, arg3))
        const _month = Filler(m, '0', 2)
        const _day = Filler(d, '0', 2)
        result = LUNAR_FESTIVAL[`${_month}${_day}`] || ''
    }
    return result
}

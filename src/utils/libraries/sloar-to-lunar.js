'use strict'
import Enums from '../../enums'
import First from './first'
import Last from './last'
import Clone from './clone'

const {
    CHINESE_CALENDAR_TABLE,
    CELESTIAL_STEM_TABLE,
    TERRESTRIAL_BRANCH_TABLE,
    LUNAR_MONTH_TABLE,
    LUNAR_DAY_TABLE
} = Enums || {}

/**
 * 农历年份
 */
const CHINESE_CALENDAR_YEARS = Object.keys(CHINESE_CALENDAR_TABLE).sort((m, n) => m - n)
/**
 * 基准年
 */
const BENCHMARK_YEAR = Number(First(Clone(CHINESE_CALENDAR_YEARS)))
/**
 * 上限年
 */
const UPPERLIMIT_YEAR = Number(Last(Clone(CHINESE_CALENDAR_YEARS)))
/**
 * 基准时间
 */
const BENCHMARK_TIME = Date.UTC(BENCHMARK_YEAR, 0, 30)
/**
 * 一天时间
 */
const ONEDAY_TIME = 24 * 60 * 60 * 1000
/**
 * 将公历日期转成农历日期
 * @param {Number, String, Date} arg1 公历日期
 * @returns {Object} 农历日期对象
 */
export default arg => {
    arg = new Date(arg)
    if (isNaN(arg.getTime())) return undefined
    const result = {
        y: null,
        year: '',
        m: null,
        month: '',
        d: null,
        day: '',
        value: ''
    }
    const _year = arg.getFullYear()
    const _month = arg.getMonth() + 1
    const _day = arg.getDate()
    if (_year >= BENCHMARK_YEAR && _year <= UPPERLIMIT_YEAR) {
        let _diff = (Date.UTC(
            Number(_year), Number(_month) - 1, Number(_day)
        ) - BENCHMARK_TIME) / ONEDAY_TIME
        let _year_key = UPPERLIMIT_YEAR
        for (let y = 0; y < CHINESE_CALENDAR_YEARS.length; y++) {
            _year_key = Number(CHINESE_CALENDAR_YEARS[y])
            result.lunar = CHINESE_CALENDAR_TABLE[_year_key]
            _diff -= getLunarYearDays(result.lunar)
            if (_diff <= 0) {
                result.year = `${
                    getCelestialStem(BENCHMARK_YEAR + y)
                }${
                    getTerrestrialBranch(BENCHMARK_YEAR + y)
                }年`
                result.y = BENCHMARK_YEAR + y
                _diff += getLunarYearDays(result.lunar)
                break
            }
        }
        const _lunar_months = getLunarYearMonths(result.lunar)
        for (let m = 0; m < _lunar_months.length; m++) {
            _diff -= getLunarYearMonths(result.lunar)[m]
            if (_diff <= 0) {
                const _leap_month = getLeapMonth(result.lunar)
                if (_leap_month && _leap_month <= m) {
                    if (_leap_month < m) {
                        result.month = `${LUNAR_MONTH_TABLE[m]}月`
                    } else if (_leap_month === m) {
                        result.month = `闰${LUNAR_MONTH_TABLE[m]}月`
                    }
                    result.m = m
                } else {
                    result.month = `${LUNAR_MONTH_TABLE[m + 1]}月`
                    result.m = m + 1
                }
                _diff += getLunarYearMonths(result.lunar)[m]
                break
            }
        }
        if (_diff < 11) {
            result.day = `${LUNAR_DAY_TABLE[11]}${LUNAR_DAY_TABLE[_diff]}`
        } else if (_diff > 10 && _diff < 20) {
            result.day = `${LUNAR_DAY_TABLE[10]}${LUNAR_DAY_TABLE[_diff - 10]}`
        } else if (_diff === 20) {
            result.day = `${LUNAR_DAY_TABLE[2]}${LUNAR_DAY_TABLE[10]}`
        } else if (_diff > 20 && _diff < 30) {
            result.day = `${LUNAR_DAY_TABLE[12]}${LUNAR_DAY_TABLE[_diff - 20]}`
        } else if (_diff === 30) {
            result.day = `${LUNAR_DAY_TABLE[3]}${LUNAR_DAY_TABLE[10]}`
        }
        result.d = _diff
        const { year, month, day } = result || {}
        result.value = `${year} ${month} ${day}`
    }
    return result
}

/**
 * 获取农历年闰月
 * @param {Hex} arg 农历年十六进制
 * @returns {Hex} 闰月
 */
const getLeapMonth = arg => {
    arg = arg & 0x0000f
    return arg || false
}

/**
 * 获取农历闰月天数
 * @param {Hex} arg 农历年十六进制
 * @returns {Number} 闰月天数
 */
const getLeapMonthDays = arg => {
    if (getLeapMonth(arg)) {
        return (arg & 0xf0000) ? 30 : 29
    } else return 0
}

/**
 * 获取农历一年的总天数
 * @param {Hex} arg 农历年十六进制
 * @returns {Number} 总天数
 */
const getLunarYearDays = arg => {
    let result = 0
    for (let i = 0x8000; i > 0x8; i >>= 1) {
        const _days = (arg & i) ? 30 : 29
        result += _days
    }
    if (getLeapMonth(arg)) {
        result += getLeapMonthDays(arg)
    }
    return result
}

/**
 * 获取农历每个月的天数
 * @param {Hex} arg 农历年十六进制
 * @returns {Array} 每个月的天数
 */
const getLunarYearMonths = arg => {
    let result = []
    for (let i = 0x8000; i > 0x8; i >>= 1) {
        result.push((arg & i) ? 30 : 29)
    }
    if (getLeapMonth(arg)) {
        result.splice(
            getLeapMonth(arg), 0,
            getLeapMonthDays(arg)
        )
    }
    return result
}

/**
 * 获取天干
 * @param {Hex} arg 农历年十六进制
 * @returns {String} 天干
 */
const getCelestialStem = arg => {
    let result = (arg - 3) % 10
    if (result === 0) result = 10
    return CELESTIAL_STEM_TABLE[result - 1]
}

/**
 * 获取地支
 * @param {Hex} arg 农历年十六进制
 * @returns {String} 地支
 */
const getTerrestrialBranch = arg => {
    let result = (arg - 3) % 12
    if (result === 0) result = 12
    return TERRESTRIAL_BRANCH_TABLE[result - 1]
}

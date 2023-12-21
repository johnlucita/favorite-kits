'use strict'
import Overload from './overload'
import IsNullOrEmpty from './is-null-or-empty'
import IsString from './is-string'
import IsDate from './is-date'
import IsBoolean from './is-boolean'

/**
 * 重载对象
 */
const global_obj = {}

/**
 * 将日期转换成年龄（支持岁、月、周、天）
 * @example arg1 = '2019-10-11' => 29岁
 * arg1 = '2019-10-11', arg2 = '2019-10-14' => 3天
 * @param {String, Date} arg1 指定日期
 * @param {String, Date} [arg2=new Date()] 当前日期（默认为系统当前日期）
 * @param {Boolean} [arg3=true] 是否带单位，（true: 带单位，false: 不带单位，默认带单位）
 * @author Lucita
 * @version 0.0.1
 * @returns {String} 年龄字符串
 */
const global_fn =  (arg1, arg2, arg3 = true) => {
    if (IsNullOrEmpty(arg1)) return ''
    if (IsString(arg1)) arg1 = arg1.replace(/-/g, '/')
    if (IsNullOrEmpty(arg2)) arg2 = new Date()
    if (IsString(arg2)) arg2 = arg2.replace(/-/g, '/')
    const _now = new Date(arg2)
    const _date = new Date(arg1)
    if (!IsDate(_now) || !IsDate(_date)) return ''
    let _year = _now.getFullYear() - _date.getFullYear()
    let _month = (_now.getMonth() + 1) - (_date.getMonth() + 1)
    let _day = _now.getDate() - _date.getDate()
    if (_day < 0) {
        _month--
        const _temp = new Date()
        _temp.setDate(0)
        _day += _temp.getDate()
    }
    if (_month < 0) {
        _year--
        _month += 12
    }
    if (_year > 0) return `${_year}${arg3 ? '岁' : ''}`
    else if (_month > 0) return `${_month}${arg3 ? '月' : ''}`
    else {
        if (_day > 0 && _day % 7 === 0) {
            return `${parseInt(_day / 7)}${arg3 ? '周' : ''}`
        } else {
            return `${_day}${arg3 ? '天' : ''}`
        }
    }
}

/**
 * 重载方法
 * @param {String, Date} arg1 指定日期
 * @author Lucita
 * @version 0.0.1
 * @returns {String} 年龄字符串
 */
Overload(global_obj, 'fn', function (arg1) {
    return global_fn(arg1)
})

/**
 * 重载方法
 * @param {String, Date} arg1 指定日期
 * @param {String, Date, Boolean} arg2 指定日期或者单位标识
 * @author Lucita
 * @version 0.0.1
 * @returns {String} 年龄字符串
 */
Overload(global_obj, 'fn', function (arg1, arg2) {
    if (IsBoolean(arg2)) return global_fn(arg1, null, arg2)
    else return global_fn(arg1, arg2)
})


/**
 * 重载方法
 * @param {String, Date} arg1 指定日期
 * @param {String, Date} arg2 指定日期
 * @param {Boolean} arg3 单位标识
 * @author Lucita
 * @version 0.0.1
 * @returns {String} 年龄字符串
 */
Overload(global_obj, 'fn', function (arg1, arg2, arg3) {
    return global_fn(arg1, arg2, arg3)
})

export default global_obj.fn

'use strict'
import Enums from '../../enums'

const { OUTPUT_TYPE, ARRAY_ELEMENT_TYPE } = Enums || {}

/**
 * 日期时间格式化
 * @param {String, Number, Date} arg1 日期字符串，日期时间戳，日期对象
 * @param {String} arg2 格式化字符串，默认 yyyy-MM-dd
 * @param {OUTPUT_TYPE} [arg3=OUTPUT_TYPE.String] 输出格式，默认为字符串格式
 * @param {ARRAY_ELEMENT_TYPE} [arg4=ARRAY_ELEMENT_TYPE.Number] 数组元素类型，默认为数值型
 * @author Lucita
 * @version 0.0.1
 * @returns {String, Array} 格式化后的日期时间
 */
export default (arg1, arg2 = 'yyyy-MM-dd', arg3 = OUTPUT_TYPE.String, arg4 = ARRAY_ELEMENT_TYPE.Number) => {
    if (!arg1) return undefined
    switch (typeof arg1) {
        case 'string':
            // 兼容safair日期格式
            arg1 = new Date(arg1.replace(/-/g, '/'))
            break
        case 'number':
            arg1 = new Date(arg1)
            break
    }
    if (!(arg1 instanceof Date)) return undefined
    const format = {
        'M+': arg1.getMonth() + 1,
        'd+': arg1.getDate(),
        'h+': arg1.getHours(),
        'm+': arg1.getMinutes(),
        's+': arg1.getSeconds(),
        'q+': Math.floor((arg1.getMonth() + 3) / 3),
        'S': arg1.getMilliseconds()
    }
    const arrs = []
    if (/(y+)/.test(arg2)) {
        arg2 = arg2.replace(RegExp.$1, (arg1.getFullYear() + '').substr(4 - RegExp.$1.length))
        if (arg3 === OUTPUT_TYPE.Array) {
            arrs.push(arg4 === ARRAY_ELEMENT_TYPE.String ? String(arg1.getFullYear()) : arg1.getFullYear())
        }
    }
    for (const f in format) {
        if (new RegExp('(' + f + ')').test(arg2)) {
            const v = (RegExp.$1.length === 1 ? format[f] : ('00' + format[f]).substr(('' + format[f]).length))
            arg2 = arg2.replace(RegExp.$1, v)
            if (arg3 === OUTPUT_TYPE.Array) {
                arrs.push(arg4 === ARRAY_ELEMENT_TYPE.String ? String(v) : Number(v))
            }
        }
    }
    return arg3 === OUTPUT_TYPE.Array ? arrs : arg2
}

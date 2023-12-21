'use strict'
import Enums from '../../enums'
import IsNullOrEmpty from './is-null-or-empty'

const { DIRECTION_NAME } = Enums || {}

/**
 * 字符串生成器
 * @param {String} arg1 字符串
 * @param {Number} [arg2=0] 总数
 * @returns 字符
 */
function * generator (arg1, arg2 = 0) {
    if (IsNullOrEmpty(arg1)) return ''
    if (IsNullOrEmpty(arg2)) return ''
    const arrs = Array.from(arg1)
    let index = -1
    for (let i = 0; i < arg2; i++) {
        if (++index === arrs.length) index = 0
        if (i === arg2 - 1) return arrs[index]
        else yield arrs[index]
    }
}
/**
 * 获取填补数量
 * @param {String} arg1 字符串
 * @param {Number} arg2 总长度
 * @returns 填补数量
 */
function paddings (arg1, arg2) {
    return arg1.length >= arg2
        ? 0 : arg2 - arg1.length
}
/**
 * 将字符串对切
 * @param {String} arg1 字符串
 * @returns 对切后的字符串数组
 */
function bisection (arg1) {
    let base = parseInt(arg1.length / 2)
    if (arg1.length % 2 === 1) base++
    return [
        arg1.slice(0, base),
        arg1.slice(0 - base)
    ]
}
/**
 * 获取迭代结果集
 * @param {String} arg1 填补字符串
 * @param {Number} [arg2=0] 迭代次数
 * @param {Function} [arg3=()=>true] 用于判定的回调函数
 * @returns 迭代结果集
 */
function intention (arg1, arg2 = 0, arg3 = () => true) {
    let result = ''
    const char = generator(arg1, arg2)
    for (let i = 0; i < arg2; i++) {
        if (arg3(i)) result += char.next().value
        else char.next()
    }
    return result
}

/**
 * 字符串补位
 * @param {String} arg1 原字符串
 * @param {String} arg2 补位字符 （默认字符为空串）
 * @param {Number} arg3 补位长度 （默认长度为0）
 * @param {String} arg4 补位方式（默认前方，取值范围：front 前方补位，behind 后方补位，outside 外侧补位，between 中心补位）
 * @author Lucita
 * @version 0.0.1
 * @returns {String} 补位后的字符串
 */
export default (arg1, arg2 = '', arg3 = 0, arg4 = 'front') => {
    let result = String(arg1) || ''
    const fills = paddings(result, arg3)
    if (arg2 !== '' && fills > 0) {
        switch (arg4) {
            case DIRECTION_NAME.Front:
                result = result.padStart(arg3, arg2)
                break
            case DIRECTION_NAME.Behind:
                result = result.padEnd(arg3, arg2)
                break
            case DIRECTION_NAME.Outside:
                result = `${intention(
                    arg2, fills, i => i + 1 <= parseInt(fills / 2) + (fills % 2 === 0 ? 0 : 1)
                )}${result}${intention(
                    arg2, fills, i => i + 1 > parseInt(fills / 2) + (fills % 2 === 0 ? 0 : 1)
                )}`
                break
            case DIRECTION_NAME.Between:
                result = bisection(result)
                result.splice(1, 0, intention(arg2, fills))
                result = result.join('')
                break
            default:
                break
        }
    }
    return result
}

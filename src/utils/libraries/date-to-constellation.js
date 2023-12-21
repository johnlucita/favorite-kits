'use strict'
import Enums from '../../enums'
import Filler from './filler'

const { CONSTELLATION_TABLE } = Enums || {}

/**
 * 获取星座
 * @param {Number, String, Date} arg 日期
 * @author Lucita
 * @version 0.0.1
 * @returns {String} 星座
 */
export default arg => {
    arg = new Date(arg)
    if (isNaN(arg.getTime())) return undefined
    let result = ''
    const _month = Filler(arg.getMonth() + 1, '0', 2)
    const _day = Filler(arg.getDate(), '0', 2)
    const _md = Number(`${_month}${_day}`)
    for (const [key, value] of Object.entries(CONSTELLATION_TABLE)) {
        const _ranges = key.split(',')
        const _fornt = Number(_ranges[0])
        const _back = Number(_ranges[1])
        if (_fornt < _back) {
            if (_md >= _fornt && _md <= _back) {
                result = value
                break
            }
        } else {
            if (_md >= _fornt || _md <= _back) {
                result = value
                break
            }
        }
        
    }
    return result
}

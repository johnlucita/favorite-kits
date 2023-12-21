'use strict'
import IsString from './is-string'
import IsNullOrEmpty from './is-null-or-empty'
import ExtractFromString from './extract-from-string'

/**
 * 中文大写金额
 * @example '1200.12' => '壹仟贰佰元零壹角贰分'
 * '1200.12', TC => 一千二百元零一角二分
 * @param {String, Number} arg1 金额
 * @param {String} arg2 简体/繁体，取值范围[CN 简体, TC 繁体]，默认CN
 * @param {String} arg3 是否为货币，取值范围[true 是,false 否]，默认true
 * @author Lucita
 * @version 0.0.1
 * @returns {String} 转换后的中文大写金额
 */
export default (arg1, arg2 = 'TC', arg3 = true) => {
    if (IsString(arg1)) arg1 = Number(ExtractFromString(arg1))
    const numberValue = Math.round(arg1 * 100).toString()
    const len = numberValue.length
    let result = ''
    if (len > 15) {
        result = '超出上限'
    } else {
        if (numberValue <= 0) {
            result = `${arg3 ? '零元整' : ''}`
        } else {
            const String1 = arg2 === 'CN' ? '零一二三四五六七八九' : '零壹贰叁肆伍陆柒捌玖'
            let String2 = arg2 === 'CN' ? '万千百十亿千百十万千百十元角分' : '万仟佰拾亿仟佰拾万仟佰拾元角分'
            let String3 = 0
            let Ch1 = ''
            let Ch2 = ''
            let nZero = 0
            String2 = String2.substr(String2.length - len, (arg3 ? len : len - 3))
            for (let i = 0; i < len; i++) {
                String3 = parseInt(numberValue.substr(i, 1), 10)
                if (i !== (len - 3) && i !== (len - 7) && i !== (len - 11) && i !== (len - 15)) {
                    if (String3 === 0) {
                        Ch1 = ''
                        Ch2 = ''
                        nZero++
                    } else if (String3 !== 0 && nZero !== 0) {
                        Ch1 = '零' + String1.substr(String3, 1)
                        Ch2 = String2.substr(i, 1)
                        nZero = 0
                    } else {
                        Ch1 = String1.substr(String3, 1)
                        Ch2 = String2.substr(i, 1)
                        nZero = 0
                    }
                } else {
                    if (String3 !== 0 && nZero !== 0) {
                        Ch1 = '零' + String1.substr(String3, 1)
                        Ch2 = String2.substr(i, 1)
                        nZero = 0
                    } else if (String3 !== 0 && nZero === 0) {
                        Ch1 = String1.substr(String3, 1)
                        Ch2 = String2.substr(i, 1)
                        nZero = 0
                    } else if (String3 === 0 && nZero >= 3) {
                        Ch1 = ''
                        Ch2 = ''
                        nZero++
                    } else {
                        Ch1 = ''
                        Ch2 = String2.substr(i, 1)
                        nZero++
                    }
                    if (i === (len - 11) || i === (len - 3)) {
                        Ch2 = String2.substr(i, 1)
                    }
                }
                result = result + Ch1 + Ch2
            }
            if (String3 === 0) {
                result = `${arg3 ? result + '整' : result}`
            }
        }
    }
    return IsNullOrEmpty(arg3) ? result.replace('元', '') : result
}

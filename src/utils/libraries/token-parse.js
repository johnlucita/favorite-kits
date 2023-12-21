'use strict'
import IsString from './is-string'
import IsJson from './is-json'
import Base64 from './base-64'

/**
 * 解析Token
 * @example arg = '
 *      eyJhbGciOiJIUzI1NiJ9.eyJvcmdhbml6YXRpb25JZCI6Ij
 *      A2MGI1MDY2YWM2Zjk2MDM0YTBkNDRmODVjOTJkNmQwIiwia
 *      WRlbnRpdHkiOiIxLDIiLCJiYXNlSWQiOiIxIiwiY2l0eUlk
 *      IjoiMTA3IiwiaWF0IjoxNjgzMjQ5OTYzLCJleHAiOjE2ODM
 *      zMDI0MDB9.-3PC1LcU6HwguWREmFHyeoFr62Q1r5LHqODXV
 *      jJRBc4
 *  ' => {
 *      baseId: "1"
 *      cityId: "107"
 *      exp: 1683302400
 *      iat: 1683249963
 *      identity: "1,2"
 *      organizationId: "060b5066ac6f96034a0d44f85c92d6d0"
 * }
 * @param {String} arg Token
 * @returns {Object} 解析后的Token对象，或者null
 */
export default arg => {
    if (!IsString(arg)) return null
    const _parts = arg.split('.')
    if (_parts.length < 2) return null
    const _buffer = Base64(_parts[1], false)
    const _json = decodeURIComponent(escape(_buffer))
    if (!IsJson(_json)) return null
    else return JSON.parse(_json)
}

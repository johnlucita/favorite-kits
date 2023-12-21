'use strict'
import IsNullOrEmpty from './is-null-or-empty'
import IsString from './is-string'

export default arg => {
    if (IsNullOrEmpty(arg)) arg = ''
    if (!IsString(arg)) arg = String(arg)
    return /^data:/.test(arg)
}

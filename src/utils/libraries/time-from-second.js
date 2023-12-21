'use strict'
import IsNumber from './is-number'
import Filler from './filler'
import Datetime from './datetime'

export default arg => {
    if (!IsNumber(arg)) arg = 0
    const hh = Filler(parseInt(arg / 60 / 60 % 24), '0', 2)
    const mm = Filler(parseInt(arg / 60 % 60), '0', 2)
    const ss = Filler(parseInt(arg % 60), '0', 2)
    return Datetime(new Date(0, 0, 0, hh, mm, ss), 'hh:mm:ss')
}

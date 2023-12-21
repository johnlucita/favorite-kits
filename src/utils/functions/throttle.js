'use strict'

export default (fn, wait) => {
    let _pre = Date.now()
    return function () {
        const _self = this
        const _args = arguments
        const _now = Date.now()
        if (_now - _pre >= wait) {
            fn.apply(_self, _args)
            _pre = Date.now()
        }
    }
}

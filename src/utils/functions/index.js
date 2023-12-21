'use strict'
import throttle from './throttle'
import delay from './delay'

const func = new Proxy({
    throttle,
    delay
}, {
    get (target, key) {
        if (key in target) {
            return target[key]
        } else return undefined
    },
    set (target, key, value) {
        if (key in target) {
            throw new Error(`"${
                key.toString()
            }" is a readonly property.`)
        }
        return true
    }
})

export default func

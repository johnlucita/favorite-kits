'use strict'

export default arg => {
    if (!arg) arg = 500
    return new Promise(resolve => {
        setTimeout(() => resolve(), arg)
    })
}

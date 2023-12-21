'use strict'
import { Config } from './window'

// 定义日志配置项
export const logOptions = {
    enabled: false,
    notation: false,
    clear: function () {
        Config.$console.clear()
    },
    print: function (type = 'info', ...args) {
        if (type === 'warn') Config.$console.warn(...args)
        else if (type === 'error') Config.$console.error(...args)
        else if (type === 'info') Config.$console.info(...args)
        else if (type === 'node') Config.$console.dir(...args)
        else if (type === 'xml') Config.$console.dirxml(...args)
        else Config.$console.log(...args)
    },
    table: function (value) {
        Config.$console.table(value)
    },
    group: function (toggle = true, collapsed = true, name) {
        if (!toggle) Config.$console.groupEnd()
        else {
            if (!name) return
            if (collapsed) Config.$console.groupCollapsed(name)
            else Config.$console.group(name)
        }
    },
    time: function (toggle = true, name) {
        if (!name) return
        if (toggle) Config.$console.time(name)
        else Config.$console.timeEnd(name)
    },
    count: function (name) {
        if (!name) return
        Config.$console.count(name)
    },
    trace: function () {
        Config.$console.trace()
    },
    assert: function () {
        Config.$console.assert(...arguments)
    }
}

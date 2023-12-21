'use strict'
import Enums from '../enums'
import * as Library from './libraries'
import { logOptions } from './config'
import Logger from './logger'

const { STORAGE_TYPE } = Enums || {}

export const Config = new Proxy(window.$configurator, {
    get: function (target, property) {
        if (property in target) {
            return target[property]
        } else if (property === '$logger') {
            return logOptions || {}
        } else return {}
    }
})

const checking = Symbol('type-checking')

/**
 * 类：存储
 */
class Storage {
    // 存储类型
    type = null
    /**
     * 构造函数
     * @param {String} type 存储类型
     */
    constructor (type) {
        if (this[checking](type)) {
            this.type = type
        }
    }
    /**
     * 校验存储类型
     * @param {String} value 存储类型值
     * @returns 是否存在该存储类型
     */
    [checking] (value) {
        let result = false
        Object.keys(STORAGE_TYPE).map(key => {
            if (STORAGE_TYPE[key] === value) {
                result = true
                return
            }
        })
        return result
    }
    /**
     * 包含存储
     * @param {String} arg 数据键名
     * @returns {Boolean} 包含返回true，不包含返回false
     */
    include (arg) {
        if (!this.type) return false
        else return arg in window[this.type]
    }
    /**
     * 写入存储
     * @param  {...any} args 数据键值对{key, value}, {key, value}, ...
     */
    write (...args) {
        if (this.type) {
            for (const {key, value} of args) {
                window[this.type].setItem(key, value)
            }
        }
    }
    /**
     * 读取存储
     * @param  {...any} args 数据键key1, key2, key3, ...
     * @returns 键值对{key1: value1, key2: value2, ...}
     */
    read (...args) {
        let result = {}
        if (this.type) {
            for (const key of args) {
                result[key] = window[this.type].getItem(key)
            }
        }
        return result
    }
    /**
     * 删除存储
     * @param  {...any} args 数据键key1, key2, key3, ...
     */
    remove (...args) {
        if (this.type) {
            for (const key of args) {
                window[this.type].removeItem(key)
            }
        }
    }
    /**
     * 清空存储
     */
    clear () {
        if (this.type) {
            window[this.type].clear()
        }
    }
}
/**
 * 类：动画帧
 */
class AnimationFrame {
    auto = (elapsed, timer) => {
        timer.tick(elapsed - timer.stamp)
        timer.stamp = elapsed
        timer.id = requestAnimationFrame(
            elapsed => this.auto(elapsed, timer)
        )
    }
    enable (timer) {
        timer.paused = false
        timer.stamp = 0
        timer.id = requestAnimationFrame(
            elapsed => this.auto(elapsed, timer)
        )
    }
    disable (timer) {
        cancelAnimationFrame(timer.id)
    }
}
// 实例化动画帧
const animationFrame = new AnimationFrame()
/**
 * 类：定时器队列
 */
class TimeQueuer {
    constructor () {
        this.paused = true
        this.queue = new Map()
        animationFrame.enable(this)
    }
    setTimeout (fn, delay, id = Symbol('timeoutID')) {
        this.queue.set(id, {
            fn,
            type: 0,
            paused: 0,
            elapsed: 0,
            delay
        })
        return id
    }
    clearTimeout (...ids) {
        return this.delete(...ids)
    }
    setInterval (fn, delay, id = Symbol('intervalID')) {
        this.queue.set(id, {
            fn,
            type: 1,
            paused: 0,
            elapsed: 0,
            delay
        })
        return id
    }
    clearInterval (...ids) {
        return this.delete(...ids)
    }
    set (id, config = {}) {
        const item = this.queue.get(id) || {}
        for (const key in config) {
            item[key] = config[key]
        }
        return true
    }
    delete (...ids) {
        return ids.every(id => this.queue.delete(id))
    }
    pause (id) {
        if (!id) {
            this.pauseAll()
        } else {
            const item = this.queue.get(id)
            if (item) item.paused = 1
        }
        return true
    }
    resume (id) {
        return this.play(id)
    }
    play (id) {
        if (!id) {
            this.playAll()
        } else {
            const item = this.queue.get(id)
            if (item) item.paused = 0
        }
        return true
    }
    clean () {
        this.queue = new Map()
        return true
    }
    pauseAll () {
        this.queue.forEach(
            item => (item.paused = 1)
        )
        return true
    }
    playAll () {
        this.queue.forEach(
            item => (item.paused = 0)
        )
        return true
    }
    reset (id) {
        if (!id) {
            this.resetAll()
        } else {
            const item = this.queue.get(id)
            if (item) item.elapsed = 0
        }
    }
    resetAll () {
        this.queue.forEach(
            item => (item.elapsed = 0)
        )
    }
    tick (delta) {
        this.paused || this.updateQueue(delta)
    }
    updateQueue (delta) {
        this.queue.forEach((item, id) => {
            if (item.paused === 1) return
            item.elapsed += delta
            if (item.elapsed >= item.delay) {
                item.fn()
                item.type === 0 ? this.delete(id) : (item.elapsed = 0)
            }
        })
    }
}
export const timeQueuer = new TimeQueuer()
/**
 * 类：定时器
 */
class Timer {
    intervalometer = null
    constructor () {}
    get isRunning () {
        return !!this.intervalometer
    }
    get isPausing () {
        return !!this.intervalometer && timeQueuer.queue.get(
            this.intervalometer
        ).paused === 1
    }
    run (value, interval, ...params) {
        if (!this.intervalometer) {
            let fn = null
            if (typeof value === 'function') {
                if (params && params.length) {
                    fn = () => value(...params)
                } else fn = value
            } else fn = () => { value }
            this.intervalometer = timeQueuer.setInterval(fn, interval)
        }
    }
    pause () {
        timeQueuer.pause(this.intervalometer)
    }
    resume () {
        timeQueuer.resume(this.intervalometer)
    }
    stop () {
        timeQueuer.clearInterval(this.intervalometer)
        this.intervalometer = null
    }
}
export { Storage, Timer }
/**
 * 类：图像压缩
 */
class ImageCompress {
    defaultOptions = {
        file: null,
        width: 100,
        height: 100,
        quality: 0.8,
        max: Infinity,
        limit: Infinity
    }
    isImageType = value => /^image\//.test(value)
    constructor (options = {}) {
        this.options = Object.assign({}, this.defaultOptions, options)
        this.file = options?.file
    }
    compress () {
        const _this = this
        let key = 'ConvertFileToImageElement'
        const file = this.file
        const options = this.options
        if (Library.IsNullOrEmpty(file)
            || !this.isImageType(file?.type)) {
            throw new Error('未找到图像文件')
        }
        if (!this.isImageType(options?.mimeType)) {
            options.mimeType = file?.type
        }
        if (Library.IsBlob(file)) key = 'ConvertBlobToImageElement'
        Library[key](file, image => {
            const _canvas = Library.ConvertImageElementToCanvas(
                image, options?.width, options?.height
            )
            file.width = image.naturalWidth
            file.height = image.naturalHeight
            _this.before(file, _canvas)
            Library.ConvertCanvasToBlob(_canvas, blob => {
                blob.width = _canvas.width
                blob.height = _canvas.height
                const _infinity = options?.limit === Infinity
                if (!_infinity) {
                    const _allowed = options?.max === Infinity || options?.max > 0
                    const _resultSize = (blob?.size / 1024).toFixed(2)
                    if (_resultSize > options?.limit && _allowed) {
                        options.max--
                        Logger.outputting({
                            '压缩前：': file?.size,
                            '压缩后：': blob?.size,
                            '剩余压缩次数：': options?.max
                        }, '再次压缩')
                        _this.compress(Object.assign({}, options, { file: blob }))
                        return
                    }
                }
                if (Library.IsFunction(options?.success)) {
                    options?.success(blob)
                }
            }, options?.mimeType, options?.quality)
        })
    }
    before (file, canvas) {
        if (Library.IsFunction(this.options?.beforeCompress)) {
            this.options?.beforeCompress(file, canvas)
        }
    }
}

export { ImageCompress }

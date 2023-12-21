'use strict'

const global_auth_code = 'console output my log'

/**
 * 校验静态配置文档
 */
const global_check_config_value = function () {
    if (window.$configurator && window.$configurator.$logger) {
        return window.$configurator.$logger.enabled
    } else {
        return false
    }
}
/**
 * 校验动态会话存储
 */
const global_check_session_storage = function () {
    if (window.sessionStorage && window.sessionStorage.outputting) {
        return window.sessionStorage.outputting === global_auth_code.md5(-1)
    } else {
        return false
    }
}

export default {
    /**
     * 执行会话存储
     * @param {Boolean} value 开启/关闭
     */
    run: (value = false) => {
        if (value) {
            window.sessionStorage.outputting = global_auth_code.md5(-1)
            return '(^_^)：控制台日志输出模式已开启……'
        } else {
            window.sessionStorage.removeItem('outputting')
            return '(-_-|：控制台日志输出模式已关闭……'
        }
    },
    /**
     * 校验
     */
    check: () => global_check_config_value() || global_check_session_storage()
}

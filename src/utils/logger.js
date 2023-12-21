'use strict'
import Command from './commands'
import { Config } from './window'

// 指令控制器
const global_commander = new Command()
// 固定字符串
const global_fixedstring = {
    clear_after: '%c***%c输出日志%c***',
    title_default: '输出日志：',
    title_prefix: '>_ %c%s',
    type_default: 'info',
    print_after: '%c*****End*****',
    group_default: 'GROUP',
    group_after: ' ↓'
}
// 输出字色
const global_printcolor = {
    printcolor_light_sea_green: 'color: LightSeaGreen',
    printcolor_light_coral: 'color: LightCoral',
    printcolor_steel_blue: 'color: SteelBlue',
    printcolor_indianRed: 'color: IndianRed'
}

export default {
    /**
     * 获取调试开关
     * @returns true/false
     */
    get Outputting () {
        return global_commander.check('outputting')
    },
    /**
     * 获取JSON格式化开关
     * @returns true/false
     */
    get JsonString () {
        return global_commander.check('jsonparse')
    },
    /**
     * 清空日志
     */
    clearonly () {
        if (this.Outputting !== true) return
        if (!Config) return
        if (!Config.$logger) return
        Config.$logger.clear()
        Config.$logger.print(
            null, global_fixedstring.clear_after,
            global_printcolor.printcolor_light_sea_green,
            global_printcolor.printcolor_light_coral,
            global_printcolor.printcolor_light_sea_green
        )
    },
    /**
     * 分组
     * @param {Boolean} [toggle=true] 新建/闭合分组，默认新建分组
     * @param {Boolean} [collapsed=true] 新建/闭合折叠的分组，默认新建折叠分组
     * @param {String} [name=`${global_fixedstring.group_default}`] 分组名称
     * @param {Boolean} [cleared=false] 是否清空已有日志
     */
    grouping () {
        if (this.Outputting !== true) return
        if (!Config) return
        if (!Config.$logger) return
        let [toggle, collapsed, name, cleared] = arguments
        if (cleared) Config.$logger.clear()
        name = `${name || global_fixedstring.group_default}${global_fixedstring.group_after}`
        Config.$logger.group(!!toggle, !!collapsed, name)
    },
    /**
     * 输出单条日志
     * @param {String} message 日志内容
     * @param {String} [title=`${global_fixedstring.title_default}`] 日志标题
     * @param {String} [type=`${global_fixedstring.type_default}`] 日志类型
     * @param {Boolean} [cleared=false] 是否清空已有日志
     */
    outputting () {
        if (this.Outputting !== true) return
        if (!Config) return
        if (!Config.$logger) return
        let [message, title, type, cleared] = arguments
        if (cleared) Config.$logger.clear()
        title = title || global_fixedstring.title_default
        type = type || global_fixedstring.type_default
        Config.$logger.print(
            'info', global_fixedstring.title_prefix,
            global_printcolor.printcolor_steel_blue, title
        )
        if (typeof message === 'object') {
            if (this.JsonString) {
                Config.$logger.print(
                    type, JSON.stringify(message || {})
                )
            } else Config.$logger.print(type, message)
        } else Config.$logger.print(type, message)
        Config.$logger.print(
            'info', global_fixedstring.print_after,
            global_printcolor.printcolor_indianRed
        )
    },
    /**
     * 输出多条日志
     * @param {Object} [message={}] 日志内容
     * @param {String} [title=`${global_fixedstring.title_default}`] 日志标题
     * @param {String} [type=`${global_fixedstring.type_default}`] 日志类型
     * @param {Boolean} [cleared=false] 是否清空已有日志
     */
    outputtings () {
        if (this.Outputting !== true) return
        if (!Config) return
        if (!Config.$logger) return
        let [message, title, type, cleared] = arguments
        if (cleared) Config.$logger.clear()
        message = message || {}
        title = title || global_fixedstring.title_default
        type = type || global_fixedstring.type_default
        Config.$logger.print(
            'info', global_fixedstring.title_prefix,
            global_printcolor.printcolor_steel_blue, title
        )
        if (typeof message === 'object') {
            Object.keys(message).map((field) => {
                Config.$logger.print(type, field)
                if (typeof message[field] === 'object') {
                    if (this.JsonString) {
                        Config.$logger.print(
                            type, JSON.stringify(message[field] || {})
                        )
                    } else Config.$logger.print(type, message[field])
                } else Config.$logger.print(type, message[field])
            })
        }
        Config.$logger.print(
            'info', global_fixedstring.print_after,
            global_printcolor.printcolor_indianRed
        )
    }
}

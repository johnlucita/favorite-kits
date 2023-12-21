'use strict'
import Enums from '../../enums'
import TypeName from './type-name'

const { DATA_TYPE } = Enums || {}

/**
 * 判断数据是否为window对象
 * @param {Any} arg 数据
 * @author Lucita
 * @version 0.0.1
 * @returns {Boolean} true/false
 */
export default arg => TypeName(arg) === DATA_TYPE.Window

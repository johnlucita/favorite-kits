'use strict'
import Enums from './enums'
import Library, * as Utils from './utils'

export default {
    $enums: Enums,
    $tools: Utils,
    ...Library
}

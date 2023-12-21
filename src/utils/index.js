'use strict'
import './function'
import './canvas'
import * as Library from './libraries'
import Func from './functions'
import Logger from './logger'
import Command from './commands'
import { timeQueuer, Timer } from './window'
import { Config, Storage, ImageCompress } from './window'

window.$commander = new Command()
window.$timeQueuer = timeQueuer

export { Func, Logger, Config, Timer, Storage, ImageCompress }

export default Library

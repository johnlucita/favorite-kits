'use strict'

/**
 * 枚举：数据类型
 */
export const DATA_TYPE = {
    Null: 'Null',
    Window: 'Window',
    RegExp: 'RegExp',
    Object: 'Object',
    Blob: 'Blob',
    Boolean: 'Boolean',
    Module: 'Module',
    Date: 'Date',
    String: 'String',
    Number: 'Number',
    Array: 'Array',
    Math: 'Math',
    JSON: 'JSON',
    File: 'File',
    Symbol: 'Symbol',
    FormData: 'FormData',
    Function: 'Function',
    AsyncFunction: 'AsyncFunction',
    Undefined: 'Undefined',
    HTMLDocument: 'HTMLDocument',
    HTMLElement: 'HTMLElement',
    HTMLHtmlElement: 'HTMLHtmlElement',
    HTMLAllCollection: 'HTMLAllCollection',
    HTMLImageElement: 'HTMLImageElement',
    HTMLCanvasElement: 'HTMLCanvasElement'
}
/**
 * 枚举：转换类型
 */
export const CONVERT_TYPE = {
    SpellCode: 'spell-code',
    WbCode: 'wb-code',
    Chinese: 'chinese',
    ChineseNumber: 'chinese-number',
    Capitalize: 'capitalize',
    Uppercase: 'uppercase',
    Lowercase: 'lowercase',
    ArabToRome: 'arab2rome',
    DateToAge: 'date2age',
    DateToWeek: 'date2week',
    DateToSign: 'date2sign',
    DateToLunar: 'date2lunar',
    DateToZodiac: 'date2zodiac',
    UrlToImage: 'url2image',
    DataUrlToImage: 'dataurl2image',
    DataUrlToBlob: 'dataurl2blob',
    ImageToDataUrl: 'image2dataurl',
    HtmlToISO: 'html2iso',
    ISOToHtml: 'iso2html'
}
/**
 * 枚举：格式化类型
 */
export const FORMAT_TYPE = {
    Currency: 'currency',
    DateTime: 'date-time',
    Concatlabel: 'concat-label',
    Filler: 'filler',
    Bracket: 'bracket',
    SecondTime: 'second-time'
}
/**
 * 枚举：可括符号
 */
export const BRACKET_SYMBOL = {
    Brace: 'brace',
    Square: 'square',
    Parenthesis: 'parenthesis',
    Angular: 'angular',
    Single: 'single',
    Double: 'double',
    Custom: 'custom'
}
/**
 * 枚举：数学表达式
 */
export const MATH_EVALUATION = {
    Addition: '+',
    Subtraction: '-',
    Multiplication: '*',
    Division: '/',
    Mode: '%',
    LessThan: '<',
    LessAndEqualThan: '<=',
    Equal: '=',
    GreatThan: '>',
    GreatAndEqualThan: '>='
}
/**
 * 枚举：方向性
 */
export const DIRECTION_NAME = {
    Above: 'above',
    Under: 'under',
    Front: 'front',
    Behind: 'behind',
    Left: 'left',
    Right: 'right',
    Outside: 'outside',
    Between: 'between'
}
/**
 * 枚举：日期部分
 */
export const DATE_PART_NAME = {
    Year: 'y',
    Quarter: 'q',
    Month: 'M',
    Week: 'w',
    Day: 'd',
    Hour: 'h',
    Minutes: 'm',
    Seconds: 's',
    Millisecond: 'ms'
}
/**
 * 枚举：比较结果
 */
export const COMPARE_RESULT = {
    GreaterThan: '1',
    EqualTo: '0',
    LessThan: '-1'
}
/**
 * 枚举：日志类型
 */
export const LOGGER_TYPE = {
    Log: 'log', Info: 'info',
    Warn: 'warn', Error: 'error'
}
/**
 * 枚举：存储类型
 */
export const STORAGE_TYPE = {
    Session: 'sessionStorage',
    Local: 'localStorage',
    Cookies: 'cookies',
    WebSQL: 'webSQL',
    IndexedDB: 'indexedDB'
}
/**
 * 枚举：编码类型
 */
export const ENCODE_TYPE = {
    UTF8: 'utf-8',
    GB2312: 'gb2312',
    BASE64: 'base64'
}
/**
 * 枚举：输出数据类型
 */
export const OUTPUT_TYPE = {
    String: 1,
    Array: 2,
    JSON: 3
}
/**
 * 枚举：数组元素类型
 */
export const ARRAY_ELEMENT_TYPE = {
    String: 1,
    Number: 2,
    Object: 3,
    Array: 4,
    Date: 5
}
/**
 * 枚举：ISO编码类型
 */
export const ISO_NAEM_TYPE = {
    Code: 1,
    Name: 2
}

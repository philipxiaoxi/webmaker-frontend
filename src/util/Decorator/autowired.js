/* eslint-disable */
const autowiredCode = require('./autowiredCode')
const autowired = {
    transform(originCode) {
        let code = originCode
        const preCode = autowiredCode
        const autowiredPattern = /Autowired\s*=.*\r\n\s*let[\s\S]*?(?=\r\n)/g
        const decorators = code.match(autowiredPattern)
        if (decorators == null) {
            return originCode
        }
        for (const decorator of decorators) {
            const data = decorator.split('\n')
            const params = eval(`${data[0]}`)
            let valStr = data[1].trim()
            const index = valStr.indexOf('=')
            if(index == -1) index = valStr.length
            let valName = valStr.slice(0,index).trim()
            let valDefault = valStr.slice(index + 1).trim()
            if(eval(valDefault) instanceof Array) {
                valDefault = valDefault.substring(1,valDefault.length-1)
            }
            if(valName == undefined || (params.name == undefined && params == undefined)) {
                return originCode
            }
            const decoratorCode = `${valName} = Autowired['${params.name==undefined?params:params.name}'](${valDefault})`
            code = code.replace(decorator, decoratorCode)
        }
        return preCode +  code
    }
}

module.exports = autowired
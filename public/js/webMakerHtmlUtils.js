class Cs {
    fus = this.fusing()

    changeFusing(op) {
        this.fus = this.fusing(op)
    }

    watchLogsAndError() {
        // 监听代码错误全局异常捕获
        window.onerror = function(message, source, lineno, colno, error) {
            // 通知父窗口
            window.parent.postMessage({ message: '[您的代码运行出现错误]: ' + message, type: 'error' }, '*')
        }
        console.oldLog = console.log
        // 重写打印输出函数，实现获取输出内容
        console.log = cs.log.bind(this)
    }

    fusing(op) {
        const options = { times: 1000, timer: 7000, ...op }
        const { times, timer } = options
        let idx = 0
        let start = new Date().getTime() // 获取当前时间戳
        return function() {
            idx++
            const end = new Date().getTime() // 获取执行时间
            if (idx >= times || end - start >= timer) { // 10秒后执行或者idx大于100次执行
                idx = 0
                start = null
                window.parent.postMessage({ message: '[您的代码运行出现错误]: 产生了死循环，系统强制熔断！', type: 'error' }, '*')
                throw new Error('[您的代码运行出现错误]: 产生了死循环，系统强制熔断！')
            }
        }
    }

    dynamicLoadCss(url) {
        const head = document.getElementsByTagName('head')[0]
        const link = document.createElement('link')
        link.type = 'text/css'
        link.rel = 'stylesheet'
        link.href = url
        head.appendChild(link)
    }

    dynamicLoadJs(url, callback) {
        var script = document.createElement('script')
        var fn = callback || function() {}
        script.type = 'text/javascript'
        // IE
        if (script.readyState) {
            script.onreadystatechange = function() {
                if (script.readyState == 'loaded' || script.readyState == 'complete') {
                    script.onreadystatechange = null

                    fn()
                }
            }
        } else {
            // 其他浏览器
            script.onload = function() {
                fn()
            }
        }
        script.src = url
        document.getElementsByTagName('head')[0].appendChild(script)
    }

    info() {
        console.log(`
        WebMaker/CodeShare Html 调试工具脚本 1.0
        Aut: xiaoxi
        Msg：您的代码处理专家。
        Url: blog.diyxi.top
        `)
    }

    log(T, err = new Error()) {
        // 调用原先的打印
        console.oldLog(T)
        // 匹配所在行数
        const regexp = /:[0-9]+:[0-9]+/g
        let array = []
        let line = '[未知]'
        // 如果能够获得行数
        if (err.stack != null) {
            array = [...err.stack.matchAll(regexp)]
            line = parseInt(array[1][0].substring(1).split(':')[0])
        }
        // 判断是否对象，是对象需要格式化成文本
        if (T instanceof Object) {
            T = JSON.stringify(T, null, 4)
            T = T.replaceAll(' ', '&nbsp;')
            T = T.replaceAll('\n', '<br>')
        }
        window.parent.postMessage({ log: { content: T, line } }, '*')
    }

    setExample(Examples) {
        this.Examples = Examples
    }

    judge() {
        if (cs.runCode == null) {
            cs.insertLog('[ERROR]: ' + 'runCode代码为空，无法进行判断。', 'log-item-red', '[cs处理器]')
            return
        }
        if (cs.Examples == null) {
            cs.insertLog('[ERROR]: ' + 'Examples为空，无法进行判断。', 'log-item-red', '[cs处理器]')
            return
        }
        for (const item of this.Examples) {
            const out = cs.runCode(item.key)
            this.insertLog(
                `输入：${JSON.stringify(item.key)}，正确输出：${item.value}，您的输出：${out}。`
                , 'log-item'
                , '[cs处理器]')
            if (JSON.stringify(out) != JSON.stringify(item.value)) {
                cs.insertLog('[ERROR]: ' + '以上用例未通过。', 'log-item-red', '[cs处理器]')
                return
            }
        }
        cs.insertLog('[WINNER]: ' + '恭喜你！所有用例通过！', 'log-item-green', '[cs处理器]')
    }

    setLogContainerFontSize(type) {
        document.getElementById('cs_logs_container').style.fontSize = type
    }

    setStyle(type) {
        if (type == 'black') {
            document.body.style.backgroundColor = 'black'
            document.getElementById('webmaker_utils_c_124106').style.color = 'white'
        }
    }
}
const cs = new Cs(document.getElementById('webmaker_utils_c_124106'))
cs.info()
cs.dynamicLoadCss('https://webmaker.xiaotao2333.top:344/css/codesharePreview.css')
cs.watchLogsAndError()

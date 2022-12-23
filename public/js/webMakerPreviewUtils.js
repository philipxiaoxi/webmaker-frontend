// eslint-disable-next-line no-unused-vars
class Cs {
    fus = this.fusing()

    /**
     * @Ahthor: xiaoxi
     * @param {*} dom 插入区域
     * @param {*} selfShow 是否自我展示
     * @param {*} lineOffset 基准行
     */
    constructor(dom, selfShow = true, lineOffset = 0) {
        // 是否自我展示
        this.selfShow = selfShow
        this.baseline = lineOffset
        if (this.selfShow) {
            this.appendContainer(dom)
            this.appendDialog(dom)
        }
        this.info()
        this.watchLogsAndError()
    }

    changeFusing(op) {
        this.fus = this.fusing(op)
    }

    appendContainer(dom) {
        // 添加样式
        dom.classList.add('cs_console_container')
        // 创建标题
        let newInsertElement = document.createElement('h1')
        newInsertElement.innerText = '控制台'
        dom.appendChild(newInsertElement)
        // 创建提示词
        newInsertElement = document.createElement('p')
        newInsertElement.innerText = '工具类包已经加载完毕，下面将会显示您的输出信息。'
        dom.appendChild(newInsertElement)
        // 创建耗时显示
        newInsertElement = document.createElement('p')
        newInsertElement.innerText = '耗时：0ms'
        newInsertElement.id = 'cs_console_container_time'
        dom.appendChild(newInsertElement)
        // 创建打印输出容器
        newInsertElement = document.createElement('div')
        newInsertElement.id = 'cs_logs_container'
        dom.appendChild(newInsertElement)
    }

    appendDialog(dom) {
        // 创建弹窗
        const dialog = document.createElement('div')
        dialog.classList.add('cs_console_dialog')
        this.dialog = dialog
        dom.appendChild(dialog)
        // 创建标题
        let newInsertElement = document.createElement('h2')
        newInsertElement.innerText = '控制台弹窗'
        newInsertElement.style.textAlign = 'center'
        dialog.appendChild(newInsertElement)
        // 创建内容文本
        newInsertElement = document.createElement('p')
        newInsertElement.innerText = '弹窗内容'
        newInsertElement.style.textAlign = 'justify'
        newInsertElement.style.fontSize = '15px'
        newInsertElement.style.lineHeight = '2'
        this.dialogContentElement = newInsertElement
        dialog.appendChild(newInsertElement)
        // 创建关闭按钮
        newInsertElement = document.createElement('button')
        newInsertElement.innerText = '关闭'
        newInsertElement.style.textAlign = 'center'
        dialog.appendChild(newInsertElement)
        // 绑定关闭按钮时间
        newInsertElement.onclick = () => {
            this.dialog.style.display = 'none'// 隐藏
        }
    }

    watchLogsAndError() {
        // 监听代码错误全局异常捕获
        window.onerror = (message, source, lineno, colno, error) => {
            this.insertLog('[ERROR]: ' + message, 'log-item-red', lineno - this.baseline)
            // 通知父窗口
            window.parent.postMessage({ message: '[您的代码运行出现错误]: ' + message, type: 'error' }, '*')
        }
        console.oldLog = console.log
        // 重写打印输出函数，实现获取输出内容
        console.log = this.log.bind(this)
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

    // 插入到页面的显示区域函数 - codeshare辅助性函数
    insertLog(message, className = 'log-item', line = '-1') {
        const newInsertElement = document.createElement('div')
        newInsertElement.classList.add(className)
        newInsertElement.innerHTML = message
        const span = document.createElement('span')
        span.innerHTML = `${line}`
        span.style.float = 'right'
        newInsertElement.appendChild(span)
        newInsertElement.onclick = () => {
            // 通知父窗口
            window.parent.postMessage({ line }, '*')
            // this.dialogContentElement.innerText = message
            // this.dialog.style.display = 'flex'
        }
        if (this.selfShow) {
            document.getElementById('cs_logs_container').appendChild(newInsertElement)
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
        //         console.log(`
        // +-+-+-+-+-+-+-+-+ +-+-+-+-+-+
        // |W|e|b|M|a|k|e|r| |U|t|i|l|s|
        // +-+-+-+-+-+-+-+-+ +-+-+-+-+-+
        // 通用调试工具脚本
        // Version: 2.5.0
        // date   : 2021-11-10
        // Aut    : xiaoxi
        // Msg    ：您的代码处理专家。
        // Url    : blog.diyxi.top
        // +-+-+-+-+-+-+-+-+ +-+-+-+-+-+
        // `)
    }

    log(...T) {
        const err = new Error()
        // 调用原先的打印
        console.oldLog(...T)
        // 匹配所在行数
        const regexp = /:[0-9]+:[0-9]+/g
        let array = []
        let line = '[未知]'
        // 如果能够获得行数
        if (err.stack != null) {
            array = [...err.stack.matchAll(regexp)]
            line = parseInt(array[1][0].substring(1).split(':')[0]) - this.baseline
        }
        // 插入到显示区域
        const arr = Array.prototype.slice.apply(arguments)
        let logText = ''
        function toJson(T, num = 4, newLine = true) {
            T = JSON.stringify(T, null, num)
            T = T.replaceAll(' ', '&nbsp;')
            if (newLine) {
                T = T.replaceAll('\n', '<br>')
            }
            return T
        }
        for (const iterator of arr) {
            const type = Object.prototype.toString.call(iterator)
            console.oldLog(type)
            let htmlStr = ''
            switch (type) {
            case '[object Number]':
                htmlStr = `<span style="color: green;">${iterator}</span>`
                break
            case '[object String]':
                htmlStr = `<span>${iterator.replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('\n', '<br>')}</span>`
                break
            case '[object Object]':
                htmlStr = `<span style="color: rgb(121,38,117);">${toJson(iterator)}</span>`
                break
            case '[object Array]':
                htmlStr = `<span style="color: rgb(26,26,166);">${toJson(iterator, 2, false)}</span>`
                break
            case '[object Boolean]':
                htmlStr = `<span style="color: rgb(26,26,166);">${iterator}</span>`
                break
            case '[object Function]':
                htmlStr = `<span><span style="color: rgb(121,38,117); font-size: 15px;"> F </span><code>${iterator}</code></span>`
                break
            default:
                htmlStr = `<span>${iterator}</span>`
                break
            }
            logText += htmlStr + ' '
        }

        this.insertLog(logText, 'log-item', line)
        window.parent.postMessage({ log: { content: logText, line } }, '*')
    }

    setExample(Examples) {
        this.Examples = Examples
    }

    judge() {
        if (this.runCode == null) {
            this.insertLog('[ERROR]: ' + 'runCode代码为空，无法进行判断。', 'log-item-red', '[cs处理器]')
            return
        }
        if (this.Examples == null) {
            this.insertLog('[ERROR]: ' + 'Examples为空，无法进行判断。', 'log-item-red', '[cs处理器]')
            return
        }
        for (const item of this.Examples) {
            const out = this.runCode(item.key)
            this.insertLog(
                `输入：${JSON.stringify(item.key)}，正确输出：${item.value}，您的输出：${out}。`
                , 'log-item'
                , '[cs处理器]')
            if (JSON.stringify(out) != JSON.stringify(item.value)) {
                this.insertLog('[ERROR]: ' + '以上用例未通过。', 'log-item-red', '[cs处理器]')
                return
            }
        }
        this.insertLog('[WINNER]: ' + '恭喜你！所有用例通过！', 'log-item-green', '[cs处理器]')
    }

    setLogContainerFontSize(type) {
        document.getElementById('cs_logs_container').style.fontSize = type
    }

    setStyle(type) {
        if (type == 'black') {
            document.body.style.backgroundColor = 'black'
            document.getElementById('124106_codeshare_utils_c').style.color = 'white'
        }
    }
}

class Cs {
    /**
     * 插入显示区域
     * @Ahthor: xiaoxi
     * @param {*} dom
     */
    constructor(dom) {
        this.appendContainer(dom)
        this.appendDialog(dom)
    }

    // /**
    //  * 安全维护函数
    //  * 等级默认3级
    //  * @Ahthor: xiaoxi
    //  * @param {*} level
    //  */
    // SecurityMaintenance(level = 3) {
    //     switch (level) {
    //     case 3:
    //         // 禁止localStorage
    //         window.localStorage.getItem = tips
    //         window.localStorage.setItem = tips
    //         // 禁止访问cookie
    //         window.document.cookie = tips()
    //         // 禁止访问父级
    //         window.parent = null
    //         break
    //     default:
    //         break
    //     }
    //     function tips(params) {
    //         return '为了安全起见，该方法已经被禁用。'
    //     }
    // }

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
        window.onerror = function(message, source, lineno, colno, error) {
            cs.insertLog('[ERROR]: ' + message, 'log-item-red', lineno - 4)
            // 通知父窗口
            window.top.postMessage({ message: '[您的代码运行出现错误]: ' + message, type: 'error' }, '*')
        }
        console.oldLog = console.log
        // 重写打印输出函数，实现获取输出内容
        console.log = cs.log.bind(this)
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
            window.top.postMessage({ line }, '*')
            // this.dialogContentElement.innerText = message
            // this.dialog.style.display = 'flex'
        }
        document.getElementById('cs_logs_container').appendChild(newInsertElement)
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
        WebMaker/CodeShare JS 调试工具脚本 2.4
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
            line = parseInt(array[1][0].substring(1).split(':')[0]) - 4
        }
        // 判断是否对象，是对象需要格式化成文本
        if (T instanceof Object) {
            T = JSON.stringify(T, null, 4)
            T = T.replaceAll(' ', '&nbsp;')
            T = T.replaceAll('\n', '<br>')
        }
        // 插入到显示区域
        this.insertLog(T, 'log-item', line)
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
            document.getElementById('124106_codeshare_utils_c').style.color = 'white'
        }
    }
}
const newInsertElement = document.createElement('div')
newInsertElement.id = '124106_codeshare_utils_c'
document.body.appendChild(newInsertElement)
const cs = new Cs(document.getElementById('124106_codeshare_utils_c'))
cs.info()
cs.dynamicLoadCss('https://webmaker.xiaotao2333.top:344/css/codesharePreview.css')
cs.watchLogsAndError()

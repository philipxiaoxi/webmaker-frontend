class Cs {
    /**
     * 插入显示区域
     * @Ahthor: xiaoxi
     * @param {*} dom
     */
    constructor(dom) {
        this.appendContainer(dom)
    }

    appendContainer(dom) {
        // 添加样式
        dom.classList.add('cs_console_container')
        // 创建标题
        let newInsertElement = document.createElement('h1')
        newInsertElement.innerText = 'CodeShare控制台'
        dom.appendChild(newInsertElement)
        // 创建提示词
        newInsertElement = document.createElement('p')
        newInsertElement.innerText = 'codeshare工具类包已经加载完毕，下面将会显示您的输出信息。'
        dom.appendChild(newInsertElement)
        // 创建打印输出容器
        newInsertElement = document.createElement('div')
        newInsertElement.id = 'cs_logs_container'
        dom.appendChild(newInsertElement)
    }

    watchLogsAndError() {
        // 监听代码错误全局异常捕获
        window.onerror = function(message, source, lineno, colno, error) {
            cs.insertLog('[ERROR]: ' + message, 'log-item-red', lineno - 1)
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
        span.innerHTML = `第${line}行`
        span.style.float = 'right'
        newInsertElement.appendChild(span)
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

    info() {
        console.log(`
        CodeShare JS 调试工具脚本 1.0
        Aut: xiaoxi
        Msg：您的代码处理专家。
        Url: blog.diyxi.top
        `)
    }

    log(T, err = new Error()) {
        // 调用原先的打印
        console.oldLog(T)
        // 匹配所在行数
        const regexp = /\/:[0-9]+/g
        let array = []
        let line = '[未知]'
        // 如果能够获得行数
        if (err.stack != null) {
            array = [...err.stack.matchAll(regexp)]
            line = parseInt(array[0][0].replace('/:', '')) - 1
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
}
const newInsertElement = document.createElement('div')
newInsertElement.id = '124106_codeshare_utils_c'
document.body.appendChild(newInsertElement)
const cs = new Cs(document.getElementById('124106_codeshare_utils_c'))
cs.info()
cs.dynamicLoadCss('/css/codesharePreview.css')
cs.watchLogsAndError()
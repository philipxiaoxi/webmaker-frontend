import Axios from 'axios'

/*
 * @Ahthor: xiaoxi
 */
class SmartMerge {
    labels = []
    constructor(code, cb) {
        const obj = ScanLabels.scan(code)
        this.labels = obj.labels
        this.div = obj.div
        LabelsParse.prase(this.labels, { style: this.div.querySelector('style'), script: this.div.querySelector('script') }).then(() => {
            cb(this.div.innerHTML)
        })
    }
}
/**
 * webmaker自定义标签扫描器
 */
const ScanLabels = {
    scan(code) {
        const labels = []
        const placeholder = document.createElement('div')
        placeholder.innerHTML = code
        const nodes = placeholder.querySelectorAll('*')
        for (const node of nodes) {
            if (node.tagName != undefined && node.tagName.startsWith('WM:')) {
                labels.push({ name: node.tagName, target: node })
            }
        }
        return { labels, div: placeholder }
    }
}
/**
 * 标签解析器
 */
const LabelsParse = {
    prase(labels, div) {
        const events = []
        for (const label of labels) {
            events.push(this[label.name.split(':')[1].toLowerCase()](label, div))
        }
        return Promise.all(events)
    },
    include(label, div) {
        const url = label.target.getAttribute('file')
        const name = this.getFileNameByPath(url)
        const parse = (code) => {
            const placeholder = document.createElement('div')
            placeholder.innerHTML = code
            const styles = placeholder.querySelectorAll('style')
            for (const style of styles) {
                div.style.innerHTML += `\n/* ${name}组件样式代码 */ \n` + style.innerHTML
                style.remove()
            }
            const scripts = placeholder.querySelectorAll('script')
            for (const script of scripts) {
                if (script.src != '') {
                    continue
                } else {
                    div.script.innerHTML += `\n/* ${name}组件脚本代码 */ \n` + script.innerHTML
                    script.remove()
                }
            }

            /* eslint-disable */
            label.target.parentNode.insertBefore(document.createTextNode('\n'), label.target)
            label.target.parentNode.insertBefore(document.createComment(`${name}组件html代码- 参考：${url}`), label.target)
            label.target.parentNode.insertBefore(document.createTextNode('\n'), label.target)
            label.target.innerHTML = `${placeholder.innerHTML}`
            this.removeShell(label.target)
        }
        return Axios({ url: url, method: 'get' }).then((res) => {
            parse(res.data)
        }).catch((e) => {
            console.log(e)
        })
    },
    removeShell(shell) {
        const childs = shell.children
        const father = shell.parentNode
        for (const child of childs) {
            const node = child.cloneNode(true)
            father.insertBefore(node, shell)
        }
        shell.remove()
    },
    getFileNameByPath(path) {
        var index = path.lastIndexOf('/') // lastIndexOf("/")  找到最后一个  /  的位置
        var fileName = path.substr(index + 1) // substr() 截取剩余的字符，即得文件名xxx.doc
        return fileName
    }
}
export default SmartMerge

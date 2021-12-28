import Axios from 'axios'

/*
 * @Ahthor: xiaoxi
 */
class SmartMerge {
    labels = []
    constructor(code) {
        const obj = ScanLabels.scan(code)
        this.labels = obj.labels
        this.div = obj.div
        LabelsParse.prase(this.labels).then(() => {
            console.log(this.div.innerHTML)
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
    prase(labels) {
        const events = []
        for (const label of labels) {
            events.push(this[label.name.split(':')[1].toLowerCase()](label))
        }
        return Promise.all(events)
    },
    include(label) {
        const url = label.target.getAttribute('file')
        const parse = (code) => {
            label.target.innerHTML = code
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
    }
}
export default SmartMerge

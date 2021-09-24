<template>
    <div>
        <iframe class="xx-iframe" frameborder='0' sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals" ref="preview_iframe" style="width:100%;height:100%;"></iframe>
    </div>
</template>

<script>
import API from '../api/'
/* eslint-disable */
export default {
    methods: {
        goPreview(content, type) {
            console.log(type)
            this.$refs.preview_iframe.src = '/mock/default.html'
            this.$refs.preview_iframe.onload = () => {
                if (!this.$refs.preview_iframe.contentWindow) {
                    return
                }
                switch (type) {
                    case 'javascript':
                        this.writeJsC(content)
                        break;
                    default:
                        this.writeHtml(content)
                        break;
                }

            }
        },
        writeHtml(content) {
            const base = `<base href="${API.getServer()}common/getSnippetProjectFile/${this.$parent.item.id}/" />`
            this.$refs.preview_iframe.contentWindow.document.write(base + content) // 动态写入返回页面到iframe
            this.$refs.preview_iframe.contentWindow.document.close()
        },
        writeJsC(content) {
            this.$refs.preview_iframe.contentWindow.document.write(
                `<style>
                    body {
                        font-size: 10px;
                    }
                    .log-item {
                        border-bottom: 1px solid rgba(148, 148, 148, 0.25);
                        padding: 5px;
                        padding-left: 20px;
                        cursor: pointer;
                        font-size: 10px;
                        word-break: break-all;
                    }
                    .log-item::before {
                        content: '> ';
                        height: 100%;
                        position: absolute;
                        left: 10px;
                        color: gray;
                    }
                    .log-item:hover {
                        background-color: aliceblue;
                    }
                <\/style>`  +
                `
                <h1 style="text-align: center;">CodeShare控制台<\/h1>
                <p style="text-align: center;">codeshare控制台显示您的打印结果。无需打开F12。<\/p>
                <div id="container"><\/div>
                `+
                '<script>' + 
                this.catchConsoleLog() + content
                +
                '<\/script>'
            ) // 动态写入返回页面到iframe
            this.$refs.preview_iframe.contentWindow.document.close()
        },
        catchConsoleLog() {
            const code = `
                console.oldLog = console.log
                console.log = function(T) {
                    console.oldLog(T)
                    if(T instanceof Object) {
                        T = JSON.stringify(T)
                    }
                    let newInsertElement = document.createElement("div")
                    newInsertElement.classList.add("log-item")
                    newInsertElement.innerText = T
                    document.getElementById("container").appendChild(newInsertElement)
                }
            `
            return code
        }
    }
}
</script>
<style lang="less" scoped>
.xx-iframe {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    background-color: white;
}
</style>

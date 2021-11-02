<template>
    <div>
        <iframe class="xx-iframe" frameborder='0' sandbox="allow-scripts allow-popups allow-forms allow-modals" ref="preview_iframe" style="width:100%;height:100%;"></iframe>
    </div>
</template>

<script>
import API from '../api/'
import GA from '../util/GrammarAnalysis'
/* eslint-disable */
export default {
    methods: {
        // 该预览方式有xss、csrf攻击的可能性
        // goPreview(content, type) {
        //     console.log(type)
        //     this.$refs.preview_iframe.src = '/mock/default.html'
        //     content = this.SecurityMaintenance(content)
        //     this.$refs.preview_iframe.onload = () => {
        //         if (!this.$refs.preview_iframe.contentWindow) {
        //             return
        //         }
        //         switch (type) {
        //             case 'javascript':
        //                 this.writeJsC(content)
        //                 break;
        //             default:
        //                 this.writeHtml(content)
        //                 break;
        //         }

        //     }
        // },
        goPreview(content, type) {
            this.$refs.preview_iframe.src = '/mock/default.html'
            switch (type) {
                case 'javascript':
                    // 循环添加熔断函数
                    content = GA.addLoopFusing(content)
                    let code = `
                        <body><\/body>
                        <script src="${window.location.origin}/js/codesharePreviewUtils.js"><\/script>
                        <script>
                            let xiaoxiUtils_preview_1241060595_start = window.performance.now()
                            ${content}
                            let xiaoxiUtils_preview_1241060595_end = window.performance.now()
                            window.time = xiaoxiUtils_preview_1241060595_end - xiaoxiUtils_preview_1241060595_start
                            document.getElementById('cs_console_container_time').innerText = '代码耗时'+ time + 'ms'
                        <\/script>
                    `
                    this.$refs.preview_iframe.src = `data:text/html;charset=utf-8,${encodeURIComponent(code)}`
                    break;
                default:
                    const base = `<base href="${API.getServer()}common/getSnippetProjectFile/${this.$parent.item.id}/" />`
                    this.$refs.preview_iframe.src = `data:text/html;charset=utf-8,${encodeURIComponent(base + content)}`
                    break;
            }
        },
        /**
         * 安全维护函数
         * 将会去除代码敏感关键词
         * @Ahthor: xiaoxi
         * @param {*} content
         */
        SecurityMaintenance(content) {
            let words = [
                'parent',
                'localStorage',
                'token',
                'document',
                'window'
                ]
            for (const iterator of words) {
                content = content.replaceAll(iterator ,'禁止使用')
            }
            return content
        },
        writeHtml(content) {
            const base = `<base href="${API.getServer()}common/getSnippetProjectFile/${this.$parent.item.id}/" />`
            this.$refs.preview_iframe.contentWindow.document.write(base + content) // 动态写入返回页面到iframe
            this.$refs.preview_iframe.contentWindow.document.close()
        },
        writeJsC(content) {
            this.$refs.preview_iframe.contentWindow.document.write(
                `
                    <body><\/body>
                    <script src="/js/codesharePreviewUtils.js"><\/script>
                    <script>
                        ${content}
                    <\/script>
                `
            ) // 动态写入返回页面到iframe
            this.$refs.preview_iframe.contentWindow.document.close()
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

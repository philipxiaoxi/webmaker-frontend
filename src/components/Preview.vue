<template>
    <div v-loading="loading" :element-loading-text="texts[index]">
        <iframe :key="timer" :src="src" class="xx-iframe" frameborder='0' sandbox="allow-scripts allow-popups allow-forms allow-modals" ref="preview_iframe" style="width:100%;height:100%;"></iframe>
    </div>
</template>

<script>
import PreviewTemplate from '../util/PreviewTemplate.js'
export default {
    props: {
        item: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            loading: false,
            index: -1,
            texts: [
                '加载过慢时请使用国内CDN资源',
                '拼命加载中',
                'JS文件预览时可以使用CS类的资源',
                '写了死循环？没关系WebMaker会自动帮您熔断',
                '有个人前来嫖代码……',
                '在编写html代码？试试输入vue或者html',
                '看看帮助文档，有一堆快捷操作哦',
                '如果你想获得更好的体验，不如试试虚拟容器'
            ],
            src: '',
            timer: 1
        }
    },
    methods: {
        goPreview(content, type) {
            this.timer = new Date().getTime()
            this.index++
            if (this.index >= this.texts.length) {
                this.index = 0
            }
            console.log(this.index)
            // 加载动画
            this.loading = true
            this.src = '/mock/default.html'
            switch (type) {
            case 'javascript':
                content = PreviewTemplate.makeJsPreview(content)
                this.src = `data:text/html;charset=utf-8,${encodeURIComponent(content)}`
                break
            default:
                console.log(this.$parent)
                content = PreviewTemplate.makeHtmlPreview(content, this.$parent.item == undefined ? this.item.id : this.$parent.item.id)
                this.src = `data:text/html;charset=utf-8,${encodeURIComponent(content)}`
                break
            }
            this.$refs.preview_iframe.onload = () => {
                this.loading = false
            }
            // 加载时间太长，用户等不耐烦，最长3s自动关闭加载提示
            setTimeout(() => {
                this.loading = false
            }, 3000)
        },
        /**
         * 安全维护函数
         * 将会去除代码敏感关键词
         * @Ahthor: xiaoxi
         * @param {*} content
         */
        SecurityMaintenance(content) {
            const words = [
                'parent',
                'localStorage',
                'token',
                'document',
                'window'
            ]
            for (const iterator of words) {
                content = content.replaceAll(iterator, '禁止使用')
            }
            return content
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

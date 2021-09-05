<template>
    <div>
        <iframe class="xx-iframe" frameborder='0' sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals" ref="preview_iframe" style="width:100%;height:100%;"></iframe>
    </div>
</template>

<script>
export default {
    methods: {
        goPreview(content) {
            this.$refs.preview_iframe.src = '/mock/default.html'
            this.$refs.preview_iframe.onload = () => {
                if (!this.$refs.preview_iframe.contentWindow) {
                    return
                }
                this.$refs.preview_iframe.contentWindow.document.write(content) // 动态写入返回页面到iframe
                this.$refs.preview_iframe.contentWindow.document.close()
            }
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

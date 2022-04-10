<template>
    <div class="mirco-app-container" v-loading="loading" element-loading-text="子应用加载中">
        <iframe ref='mircoApp' frameborder="0"></iframe>
    </div>
</template>

<script>
export default {
    props: {
        src: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            loading: true
        }
    },
    mounted() {
        this.getHtml()
    },
    computed: {
        state() {
            return { ...this.$store.state }
        }
    },
    watch: {

    },
    methods: {
        getHtml() {
            this.axios.get(this.src).then(res => {
                const div = document.createElement('div')
                div.innerHTML = res.data
                const links = div.querySelectorAll('link')
                for (const link of links) {
                    link.href = this.src + link.getAttribute('href')
                }
                const scripts = div.querySelectorAll('script')
                for (const script of scripts) {
                    script.src = this.src + script.getAttribute('src')
                }
                this.$refs.mircoApp.contentWindow.document.write(div.innerHTML)
                this.$refs.mircoApp.contentWindow.document.close()
            })
            this.$refs.mircoApp.onload = () => {
                this.$refs.mircoApp.contentWindow.document.querySelector('.title').innerHTML = '测试'
                this.sendStore(this.state)
                this.loading = false
            }
        },
        sendStore(state) {
            this.$refs.mircoApp.contentWindow.postMessage(state, '*')
            console.log('[MircoAppInside]: Store数据已发送给子前端')
        }
    }
}
</script>

<style lang='less' scoped>
iframe {
    width: 100%;
    height: 100%;
}
.mirco-app-container {
    width: 100%;
    height: 100%;
}
</style>

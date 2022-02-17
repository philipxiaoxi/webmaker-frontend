<template>
    <iframe ref='mircoapp' :src="src" sandbox="allow-same-origin allow-top-navigation allow-forms allow-scripts allow-popups" frameborder="0"></iframe>
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
            form: {}
        }
    },
    mounted() {
        this.$refs.mircoapp.onload = () => {
            this.$refs.mircoapp.contentWindow.postMessage(this.state, '*')
            console.log('[MircoApp]: Store数据已发送给子前端')
        }
    },
    computed: {
        state() {
            return { ...this.$store.state }
        }
    },
    watch: {
        // 监听Vuex并传递给子前端
        state(newState) {
            // 发送给子前端
            this.sendStore(newState)
        }
    },
    methods: {
        sendStore(state) {
            this.$refs.mircoapp.contentWindow.postMessage(state, '*')
            console.log('[MircoApp]: Store数据已发送给子前端')
        }
    }
}
</script>

<style lang='less' scoped>
iframe {
    width: 100%;
    height: 100%;
}
</style>

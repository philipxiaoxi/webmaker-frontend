<template>
    <div class="mirco-app-container" v-loading="loading" element-loading-text="子应用加载中">
        <iframe ref='mircoapp' :src="src" sandbox="allow-same-origin allow-top-navigation allow-forms allow-scripts allow-popups" frameborder="0"></iframe>
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
            form: {},
            loading: true
        }
    },
    mounted() {
        this.$refs.mircoapp.onload = () => {
            // this.$refs.mircoapp.contentWindow.postMessage(this.state, '*')
            // console.log('[MircoApp]: Store数据已发送给子前端')
            this.loading = false
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
            // this.sendStore(newState)
        }
    },
    methods: {
        // sendStore(state) {
        //     if (this.src === '') return
        //     this.$refs.mircoapp.contentWindow.postMessage(state, '*')
        //     console.log('[MircoApp]: Store数据已发送给子前端')
        // }
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

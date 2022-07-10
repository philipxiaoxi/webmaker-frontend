<template>
    <div class="mirco-app-container" v-loading="loading" element-loading-text="子应用加载中">
        <iframe
        :key="timer"
        ref='mircoapp'
        :src="src"
        sandbox="allow-same-origin allow-top-navigation allow-forms allow-scripts allow-popups"
        frameborder="0"
        >
        </iframe>
    </div>
</template>

<script>
export default {
    props: {
        src: {
            type: String,
            default: ''
        },
        auth: {
            type: String,
            default: 'userId'
        },
        extra: {
            type: String,
            default: '{}'
        }
    },
    data() {
        return {
            form: {},
            loading: true,
            timer: 1
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
            this.sendStore()
        },
        src() {
            this.refresh()
        },
        auth() {
            this.refresh()
        },
        extra() {
            this.refresh()
        }
    },
    methods: {
        sendStore() {
            if (this.src === '') return
            let data = null
            if (this.auth === 'userId') data = { id: this.$store.getters.userId }
            if (this.auth === 'userInfo') data = { userInfo: this.$store.getters.userInfo }
            if (this.auth === 'token') data = { token: this.$store.getters.token }
            data.extra = this.extra
            this.$refs.mircoapp.contentWindow.postMessage({
                message: 'AUTH',
                type: this.auth,
                data
            }, '*')
            console.log('=========================================')
            console.log(this.$store.getters.userId, this.auth)
            console.log('[MircoApp]: Store数据已发送给子前端', data)
            console.log('[MircoApp]: 授权方式：', this.auth)
            console.log('[MircoApp]: 数据内容：', data)
            console.log('=========================================')
        },
        refresh() {
            this.timer = new Date().getTime()
            this.$nextTick(() => {
                this.$refs.mircoapp.onload = () => {
                    this.sendStore()
                    this.loading = false
                }
            })
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

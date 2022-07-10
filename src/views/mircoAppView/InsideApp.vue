<template>
    <div class="disk-container">
        <mico-app class="mico-app" :src="src" :auth="auth" :extra="extra"></mico-app>
    </div>
</template>

<script>
import MicoApp from '../../components/MircoApp/MicoApp.vue'
export default {
    components: { MicoApp },
    data() {
        return {
            src: '',
            auth: 'userId',
            extra: '{}'
        }
    },
    mounted() {
        this.loadApp()
    },
    // 监听,当路由发生变化的时候执行
    watch: {
        $route(to, from) {
            this.loadApp()
        }
    },
    methods: {
        loadApp() {
            if (this.$route.path === '/insideApp') {
                const url = this.$route.query.url
                const auth = this.$store.getters.auth
                const extra = this.$store.getters.extra
                if (url === undefined || url === '') {
                    this.$alert('子应用加载失败，请检查地址是否正确。 ', '错误', {
                        confirmButtonText: '确定'
                    })
                    return
                }
                this.src = url
                if (auth !== undefined || auth === '') this.auth = auth
                if (extra !== undefined || extra === '') this.extra = extra
                this.$store.commit('setAuth', 'userId')
                this.$store.commit('setExtra', '{}')
            }
        }
    }
}
</script>

<style lang='less' scoped>
.disk-container {
    margin-top: 60px;
    width: 100%;
    height: calc(100vh - 60px);
    overflow: hidden;
}
</style>

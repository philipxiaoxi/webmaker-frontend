<template>
    <div class="disk-container">
        <mico-app class="mico-app" :src="src"></mico-app>
    </div>
</template>

<script>
import MicoApp from '../../components/MircoApp/MicoApp.vue'
export default {
    components: { MicoApp },
    data() {
        return {
            src: ''
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
            if (this.src == '' && this.$route.path == '/insideApp') {
                const url = this.$route.query.url
                if (url === undefined || url === '') {
                    this.$alert('子应用加载失败，请检查地址是否正确。部分网站禁止第三方网站内嵌显示，请选择新窗口打开模式。', '错误', {
                        confirmButtonText: '确定'
                    })
                }
                this.src = url
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

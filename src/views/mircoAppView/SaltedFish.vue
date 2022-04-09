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
        if (this.$route.path == '/disk') {
            this.src = 'https://disk.xiaotao2333.top:344/#/'
        }
    },
    // 监听,当路由发生变化的时候执行
    watch: {
        $route(to, from) {
            if (this.src == '' && to.path == '/disk') {
                this.src = 'https://disk.xiaotao2333.top:344/#/'
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

<template>
    <div class="container">
        <mico-app :src="src"></mico-app>
    </div>
</template>

<script>
import MicoApp from '../components/MircoApp/MicoApp.vue'
export default {
    components: { MicoApp },
    data() {
        return {
            src: ''
        }
    },
    mounted() {
        if (this.$route.path == '/container') {
            this.src = 'https://docker.diyxi.top/#/'
        }
    },
    // 监听,当路由发生变化的时候执行
    watch: {
        $route(to, from) {
            if (this.src == '' && to.path == '/container') {
                this.src = 'https://docker.diyxi.top/#/'
            }
        }
    }
}
</script>

<style lang='less' scoped>
.container {
    margin-top: 60px;
    width: 100%;
    height: calc(100vh - 60px);
}
</style>

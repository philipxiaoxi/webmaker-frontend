<template>
    <div class="container">
        <mico-app-inside src="https://docker.diyxi.top/#/"></mico-app-inside>
    </div>
</template>

<script>
import MicoAppInside from '../components/MircoApp/MicoAppInside.vue'
export default {
    components: { MicoAppInside },
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

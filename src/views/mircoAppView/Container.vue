<template>
    <div id="container"></div>
</template>

<script>
import { loadMicroApp } from 'qiankun'

export default {
    data() {
        return {
            src: ''
        }
    },
    mounted() {
        this.loadApp()
    },
    methods: {
        loadApp() {
            const app = {
                name: 'docker',
                entry: 'http://192.168.31.67:4001/',
                container: '#container'
            }
            loadMicroApp(app)
        }
    }
}
</script>

<style lang='less' scoped>
.container {
    margin-top: 60px;
    width: 100%;
    height: calc(100vh - 60px);
    overflow: hidden;
}
</style>

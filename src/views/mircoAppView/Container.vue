<template>
    <div>
        <div v-show="loading" class="skeleton">
            <el-skeleton  :rows="6" animated />
        </div>
        <div v-show="!loading"  id="container"></div>
    </div>
</template>

<script>
import { loadMicroApp } from 'qiankun'

export default {
    data() {
        return {
            src: '',
            dockerApp: null,
            loading: true
        }
    },
    mounted() {
        this.loadApp()
    },
    activated() {
        this.sendStore()
    },
    methods: {
        loadApp() {
            const app = {
                name: 'docker',
                entry: 'https://wmdocker.xiaotao2333.top:344/',
                container: '#container'
            }
            this.dockerApp = loadMicroApp(app)
        },
        sendStore() {
            const p = new Promise((res, rej) => {
                const timer = setInterval(() => {
                    const status = this.dockerApp?.getStatus()
                    if (status === 'MOUNTED') {
                        this.loading = false
                        clearInterval(timer)
                        res()
                    }
                    if (status === 'NOT_LOADED' || status === 'NOT_MOUNTED' || status === 'LOAD_ERROR') {
                        clearInterval(timer)
                        rej(new Error('微应用加载错误' + status))
                    }
                }, 500)
            })
            p.then(() => {
                this.dockerApp.update(this.$store.state)
                console.log('[MircoApp-throw-qiankun]: store数据已发送给微应用。')
            })
        }
    }
}
</script>

<style lang='less' scoped>
.skeleton {
    width: 1144px;
    padding: 20px;
    margin: 0 auto;
    margin-top: 80px;
    box-sizing: border-box;
    // box-shadow: 0 10px 50px rgb(0 0 0 / 10%);
    background-color: white;
}
.container {
    margin-top: 60px;
    width: 100%;
    height: calc(100vh - 60px);
    overflow: hidden;
}
</style>

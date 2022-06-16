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
        this.sendStore()
    },
    // activated() {
    //     this.sendStore()
    // },
    computed: {
        state() {
            return { ...this.$store.state }
        }
    },
    watch: {
        // 监听Vuex并传递给子前端
        state() {
            // 发送给子前端
            this.sendStore()
        }
    },
    methods: {
        loadApp() {
            const app = {
                name: 'docker',
                entry: 'http://10.0.236.10:4001/',
                container: '#container',
                props: { state: this.$store.state }
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
                    console.log(status)
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

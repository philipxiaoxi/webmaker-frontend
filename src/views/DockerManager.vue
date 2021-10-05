<template>
    <div class="docker_container">
        <h1>WebMaker Docker Manager</h1>
        <p>由WebMaker管控的虚拟容器可以让你在web上开发任何语言。享受你的开发乐趣。</p>
        <p>更新：当前申请容器是一人一容器一目录，目录代码将会保存。</p>
        <p>容器状态：{{dockerStatus}}，当容器释放后可重新申请。</p>
        <div class="xx-from-container">
            <xx-input v-model="form.password" placeholder="设置连接密码"></xx-input>
            <div>
                <!-- <el-button type="success" round @click="openDocker">打开容器</el-button> -->
                <el-button type="primary" round @click="createDocker">申请容器</el-button>
            </div>

        </div>
    </div>
</template>
r
<script>
import API from '../api/'
import XxInput from '../components/XxInput.vue'
export default {
    components: { XxInput },
    data() {
        return {
            dockerStatus: '【无人使用】',
            form: {}
        }
    },
    mounted() {
        this.dockerCheck()
        this.dockerTimer = setInterval(() => {
            this.dockerCheck()
        }, 5000)
    },
    methods: {
        goTo() {
            window.open(window.location.origin + '/#/forumpage?id=21')
        },
        async createDocker() {
            const res = await this.axios(API.docker.createDocker(this.form.password)).catch((e) => {
                this.$message.error(e)
            })
            if (res.data.status == 200) {
                this.$message({
                    message: '您的容器申请成功，运行在端口' + res.data.data.port,
                    type: 'success'
                })
                window.open('http://www.xiaotao2333.top:' + res.data.data.port)
            }
        },
        openDocker() {
            window.open('http://www.xiaotao2333.top:8443')
        },
        async dockerCheck() {
            const res = await this.axios(API.docker.dockerCheck())
            if (res.data.data == null) {
                this.dockerStatus = '【无人使用】'
            } else {
                const createTime = new Date(res.data.data)
                const nowTime = new Date()
                const past = Math.ceil((nowTime - createTime) / 1000 / 60)
                this.dockerStatus = `【剩余${30 - past}分钟】后释放`
            }
        }
    }
}
</script>

<style lang='less' scoped>
.docker_container {
    max-width: 1144px;
    padding: 20px;
    margin: 0 auto;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.xx-from-container {
    display: flex;
    flex-direction: column;
    max-width: 400px;
    &>* {
        margin: 10px;
    }
}
</style>

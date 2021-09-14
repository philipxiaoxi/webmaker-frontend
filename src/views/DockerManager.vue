<template>
    <div class="container">
        <h1>CodeShare Docker Manager</h1>
        <p>由codeshare管控的虚拟容器可以让你在web上开发任何语言。享受你的开发乐趣。</p>
        <div class="xx-from-container">
            <xx-input v-model="form.password" placeholder="输入容器密码"></xx-input>
            <el-button type="primary" round @click="createDocker">创建容器</el-button>
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
            form: {}
        }
    },
    mounted() {

    },
    methods: {
        async createDocker() {
            const res = await this.axios(API.docker.createDocker(this.form.password)).catch((e) => {
                this.$message.error(e)
            })
            if (res.data.status == 200) {
                this.$message({
                    message: '您的容器申请成功，运行在端口' + res.data.data,
                    type: 'success'
                })
                window.open('http://www.xiaotao2333.top:' + res.data.data)
            }
        }
    }
}
</script>

<style lang='less' scoped>
.container {
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

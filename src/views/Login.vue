<template>
    <div class="container">
        <div class="login-card">
            <h1>登录</h1>
            <el-alert
                class="input"
                title="您好，欢迎使用CodeShare，新版本处于开发阶段。"
                type="info"
                :closable="false">
            </el-alert>
            <xx-input class="input" placeholder="请输入账号" v-model="form.account"></xx-input>
            <xx-input class="input" placeholder="请输入密码" v-model="form.password"></xx-input>
            <div>
                <el-button style="width: 200px;" type="primary" round>登录</el-button>
            </div>
            <div>
                <el-link type="info">使用咸鱼云通行证登录</el-link>
            </div>
        </div>

    </div>
</template>

<script>
import XxInput from '../components/XxInput.vue'
export default {
    components: { XxInput },
    data() {
        return {
            form: {}
        }
    }
}
</script>

<style lang="less" scoped>
.container{
    position: relative;
    margin-top: 60px;
    height: calc(100vh - 80px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.login-card {
    background-color: #fff;
    width: 500px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 18px 50px -10px;
    flex-direction: column;
    align-items: center;
    display: flex;
    .input {
        width: 80%;
        margin: 5px;
        margin-bottom: 20px;
    }
    >div {
        margin: 10px;
    }
    padding-bottom: 20px;
}
</style>

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
            <xx-input class="input" placeholder="请输入手机号" v-model="form.phone"></xx-input>
            <xx-input class="input" placeholder="请输入密码" v-model="form.password" type="password"></xx-input>
            <div>
                <el-button style="width: 200px;" type="primary" round @click="login">登录</el-button>
            </div>
            <div>
                <el-link type="info">使用咸鱼云通行证登录</el-link>
            </div>
        </div>

    </div>
</template>

<script>
import XxInput from '../components/XxInput.vue'
import API from '../api/'
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
        async login() {
            await this.getToken()
            await this.getUserInfo()
        },
        getToken() {
            const p = new Promise((resolve, reject) => {
                const param = new URLSearchParams()
                param.append('phone', this.form.phone)
                param.append('password', this.form.password)
                this.axios(API.user.getToken(this.form.phone, this.form.password)).then((res) => {
                    console.log(res.data)
                    if (res.data.status == 401) {
                        this.$message.error(res.data.data)
                        reject(res)
                    } else {
                        this.$store.commit('setToken', res.data)
                        localStorage.setItem('token', res.data.data)
                        resolve(res)
                    }
                }).catch((e) => {
                    console.log(e)
                    this.$message.error(e)
                })
            })
            return p
        },
        getUserInfo() {
            const p = new Promise((resolve) => {
                this.axios.get('/api/getUserInfo').then(res => {
                    resolve(res)
                    this.$message({
                        message: `欢迎您回来，${res.data.data.name}`,
                        type: 'success'
                    })
                    this.$store.commit('setUserInfo', res.data.data)
                    history.back()
                })
            })
            return p
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

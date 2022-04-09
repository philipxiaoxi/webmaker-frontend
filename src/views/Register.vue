<template>
    <div class="container">
        <div class="card">
            <h1>注册</h1>
            <el-alert
                class="input"
                title="您好，欢迎注册WebMaker，新版本处于开发阶段。"
                type="info"
                :closable="false">
            </el-alert>
            <xx-input class="input" placeholder="请输入邮箱" v-model="form.email"></xx-input>
            <div class="code-line">
                <xx-input class="input" placeholder="请输入验证码" v-model="form.code"></xx-input>
                <el-button :disabled='codeBtn' type="primary" round @click="getCode">{{codeBtnTitle}}</el-button>
            </div>
            <xx-input class="input" placeholder="请输入手机号" v-model="form.phone"></xx-input>
            <xx-input class="input" placeholder="请输入密码" v-model="form.password" type="password"></xx-input>
            <div>
                <el-button style="width: 200px;" type="primary" round @click="register">注册</el-button>
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
            form: {
                code: '',
                email: '',
                phone: '',
                password: ''
            },
            codeBtn: false,
            codeBtnTitle: '获取验证码'
        }
    },
    mounted() {

    },
    methods: {
        /**
         * 获取验证码
         * @Ahthor: xiaoxi
         */
        async getCode() {
            if (this.form.email == '') {
                this.$message.error('邮箱未输入。')
                return
            }
            const reg = /^(\w+)(\.\w+)*@(\w+)(\.\w+)*.(\w+)$/ig
            const bl = reg.test(this.form.email)
            console.log(bl)
            if (!bl) {
                this.$message.error('邮箱格式不正确。')
                return
            }
            this.codeBtnInterVal()
            const res = await this.axios(API.user.sendSignCode(this.form.email)).catch((e) => {
                this.$message.error(e)
            })
            if (res.data.status == 200) {
                this.$message({
                    message: '获取成功！',
                    type: 'success'
                })
            }
        },
        /**
         * 验证码定时器
         * @Ahthor: xiaoxi
         */
        codeBtnInterVal() {
            this.codeBtn = true
            this.codecount = 60
            this.codeBtnTitle = '60s'
            this.codeBtnInterValTimer = setInterval(
                () => {
                    this.codecount = this.codecount - 1
                    this.codeBtnTitle = this.codecount + 's'
                    if (this.codecount == 0) {
                        this.codeBtnTitle = '获取验证码'
                        this.codeBtn = false
                        clearInterval(this.codeBtnInterValTimer)
                    }
                },
                1000
            )
        },
        /**
         * 注册事件
         * @Ahthor: xiaoxi
         */
        async register() {
            if (this.form.code == '' || this.form.password == '' || this.form.phone == '' || this.form.email == '') {
                this.$message.error('有项目未填写。')
                return
            }
            const res = await this.axios(API.user.insertUser(this.form)).catch((e) => {
                this.$message.error(e)
            })
            if (res.data.status == 200) {
                this.$message({
                    message: '注册成功！',
                    type: 'success'
                })
                history.back()
            }
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
    overflow: hidden;
}
.card {
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
    .code-line {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 80%;
    }
    >div {
        margin: 10px;
    }
    padding-bottom: 20px;
}
</style>

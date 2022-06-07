<template>
    <div class="container">
        <div class="info-card">
        <el-tabs tab-position="left" style="height: 100%;">
            <el-tab-pane label="个人信息">
                <div class="headimg flex-col">
                    <img :src="getHeadImgSrc" :alt="this.$store.state.userInfo.name">
                    <el-button size="mini" style="margin: 10px;" type="primary" plain @click="setHeadImg">设置我的头像</el-button>
                </div>
                <el-descriptions title="个人信息"  border>
                    <el-descriptions-item label="姓名">{{this.$store.state.userInfo.name}}<el-tag style="margin-left: 10px;" :type="getString(this.$store.state.userInfo.identity).type">{{getString(this.$store.state.userInfo.identity).text}}</el-tag></el-descriptions-item>
                    <el-descriptions-item label="性别">{{this.$store.state.userInfo.sex}}</el-descriptions-item>
                    <el-descriptions-item label="手机号">{{this.$store.state.userInfo.phone}}</el-descriptions-item>
                    <el-descriptions-item label="个性签名">{{this.$store.state.userInfo.sign}}</el-descriptions-item>
                    <el-descriptions-item label="邮箱">{{this.$store.state.userInfo.email}}</el-descriptions-item>
                    <el-descriptions-item label="所属组">
                        <div v-if="this.$store.state.userInfo.type==0">普通用户</div>
                        <div v-else>管理员</div>
                    </el-descriptions-item>
                </el-descriptions>
                <el-button style="margin: 10px;" type="primary" plain @click="initFormData">修改</el-button>
            </el-tab-pane>
            <el-tab-pane label="编码成就">配置管理</el-tab-pane>
            <el-tab-pane label="第三方引入">角色管理</el-tab-pane>
            <el-tab-pane label="其他设置">定时任务补偿</el-tab-pane>
        </el-tabs>
        </div>
        <!-- 修改个人信息弹窗 -->
        <xx-dialog
        title="修改我的信息"
        :fromData="fromData"
        width="50%"
        :dialogVisible="dialogVisible"
        @dialogCancel='dialogCancel'
        @click='dialogClick'
        ></xx-dialog>
    </div>
</template>

<script>
import API from '../api/'
import XxDialog from '../components/XxDialog.vue'
import FS from '../util/FormatString'
import md5 from 'js-md5'

export default {
    components: { XxDialog },
    data() {
        return {
            form: {},
            dialogVisible: false,
            fromData: []
        }
    },
    computed: {
        getHeadImgSrc() {
            return 'https://cravatar.cn/avatar/' + md5(this.$store.state.userInfo.email || '')
        }
    },
    mounted() {
    },
    methods: {
        setHeadImg() {
            this.$confirm('您将跳转到第三方互联网公共头像服务，是否跳转?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                window.open('https://cravatar.cn/')
            })
        },
        saveInfo(userInfo) {
            this.axios(API.user.updateUser(userInfo)).then(() => {
                this.$message({
                    message: '您的信息更改成功！',
                    type: 'success'
                })
                this.dialogVisible = false
            }).catch((e) => {
                this.$message.error(e)
            })
        },
        initFormData() {
            this.fromData = [
                {
                    placeholder: '姓名',
                    value: this.$store.state.userInfo.name,
                    model: 'name'
                },
                {
                    placeholder: '邮箱',
                    value: this.$store.state.userInfo.email,
                    model: 'email'
                },
                {
                    placeholder: '手机号',
                    value: this.$store.state.userInfo.phone,
                    model: 'phone'
                },
                {
                    placeholder: '性别',
                    value: this.$store.state.userInfo.sex,
                    model: 'sex'
                },
                {
                    placeholder: '签名',
                    value: this.$store.state.userInfo.sign,
                    model: 'sign'
                }
            ]
            this.dialogVisible = true
        },
        getString(value) {
            return FS.getIdentityString(value)
        },
        /**
         * 对话框取消事件
         * @Ahthor: xiaoxi
         */
        dialogCancel() {
            this.dialogVisible = false
        },
        /**
         * 对话框点击事件
         * @Ahthor: xiaoxi
         * @param {*} form
         */
        dialogClick(form) {
            console.log(form)
            this.saveInfo(form)
        }
    }
}
</script>

<style lang="less" scoped>
.headimg {
    width: 120px;
    align-items: center;
    margin-bottom: 20px;
}
.headimg img {
    width: 100px;
    height: 100px;
    border: 1px solid #EEE;
    border-radius: 500rem;
    text-align: left;
}
.container{
    position: relative;
    margin-top: 80px;
    height: calc(100vh - 80px);
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
}
.info-card{
    background-color: #fff;
    width: 100%;
    max-width: 1144px;
    height: calc(100% - 100px);
    box-shadow: rgba(0, 0, 0, 0.2) 0px 18px 50px -10px;
    flex-direction: column;
    padding: 40px;
    display: flex;
    box-sizing: border-box;
}
</style>

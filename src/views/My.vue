<template>
    <div class="container">
        <div class="info-card">
        <el-tabs tab-position="left" style="height: 100%;">
            <el-tab-pane label="个人信息">
                <el-descriptions title="个人信息"  border>
                    <el-descriptions-item label="姓名">{{this.$store.state.userInfo.name}}<el-tag style="margin-left: 10px;">{{getString(this.$store.state.userInfo.identity)}}</el-tag></el-descriptions-item>
                    <el-descriptions-item label="性别">{{this.$store.state.userInfo.sex}}</el-descriptions-item>
                    <el-descriptions-item label="手机号">{{this.$store.state.userInfo.phone}}</el-descriptions-item>
                    <el-descriptions-item label="个性签名">{{this.$store.state.userInfo.sign}}</el-descriptions-item>
                    <el-descriptions-item label="邮箱">{{this.$store.state.userInfo.email}}</el-descriptions-item>
                    <el-descriptions-item label="所属组">
                        <div v-if="this.$store.state.userInfo.type==0">普通用户</div>
                        <div v-else>管理员</div>
                    </el-descriptions-item>
                </el-descriptions>
            </el-tab-pane>
            <el-tab-pane label="编码成就">配置管理</el-tab-pane>
            <el-tab-pane label="第三方引入">角色管理</el-tab-pane>
            <el-tab-pane label="其他设置">定时任务补偿</el-tab-pane>
        </el-tabs>
        </div>
    </div>
</template>

<script>
import FS from '../util/FormatString'
export default {
    data() {
        return {
            form: {}
        }
    },
    mounted() {

    },
    methods: {
        getString(value) {
            return FS.getIdentityString(value)
        }
    }
}
</script>

<style lang="less" scoped>
.container{
    position: relative;
    margin-top: 80px;
    height: calc(100vh - 80px);
    display: flex;
    flex-direction: column;
    align-items: center;
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

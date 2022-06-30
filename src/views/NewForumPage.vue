<template>
    <div class="container">
        <el-page-header @back="goBack" content="发布新帖子">
        </el-page-header>
        <div class="editor-tools">
            <el-divider></el-divider>
            <el-input v-model="form.title" placeholder="请输入标题"></el-input>
            <note height="100%" style="height: calc(100% - 170px);" v-model="form.content"></note>
            <div class="btns">
                <el-button type="primary" round @click="dialogVisible = true">下一步</el-button>
            </div>
        </div>
        <el-dialog
        title="确认发布"
        :visible.sync="dialogVisible"
        width="40%">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="帖子类别">
                <el-select style="width: 100%" v-model="form.topic" placeholder="请选择帖子类别">
                    <el-option label="软件分享" value="软件分享"></el-option>
                    <el-option label="知识课堂" value="知识课堂"></el-option>
                    <el-option label="论坛入门" value="论坛入门"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="帖子简述">
                <el-input placeholder="简单描述您的帖子内容是什么，如果您的帖子在列表首位将会显示您的帖子简述。" :rows="4"  type="textarea" v-model="form.preface"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="newForumPage">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
import Note from '../components/Note.vue'
import API from '../api/'
export default {
    components: { Note },
    data() {
        return {
            form: {
                content: ''
            },
            dialogVisible: false
        }
    },
    methods: {
        goBack() {
            history.back()
        },
        async newForumPage() {
            console.log(this.form)
            const res = await this.axios(API.forum.insertForumPage(this.form.title, this.form.preface, this.form.topic, this.form.content)).catch((e) => {
                this.$message.error(e)
            })
            if (res.data.data != null) {
                this.dialogVisible = false
                const status = await this.$confirm('您的帖子已经发布，是否跳转到您的帖子?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'success'
                })
                console.log(status)
                if (status == 'confirm') {
                    this.$router.push({ path: '/forumpage', query: { id: res.data.data } })
                }
            }
            console.log(res)
        }
    }
}
</script>

<style lang='less' scoped>
.editor-tools {
    height: 100%;
    text-align: left;
    display: flex;
    flex-direction: column;
    .el-input {
        margin-bottom: 5px;
    }
    .el-button {
        margin-top: 20px;
    }
    .btns {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}
.container {
    background-color: rgb(251, 251, 251);
    max-width: 1144px;
    padding: 20px;
    margin: 0 auto;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
    margin-top: 80px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    height: calc(100vh - 145px);
    overflow: hidden;
}
</style>

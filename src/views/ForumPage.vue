<template>
    <div class="container">
        <el-backtop :bottom="100">
            <div
            style="{
                height: 100%;
                width: 100%;
                background-color: #f2f5f6;
                box-shadow: 0 0 6px rgba(0,0,0, .12);
                text-align: center;
                line-height: 40px;
                color: #1989fa;
            }"
            >
            UP
            </div>
        </el-backtop>
        <el-page-header @back="goBack" content="详情页面">
        </el-page-header>
        <div class="page">
            <forum-item
                :title="item.title"
                :author="item.author"
                :topic="item.topic"
                :preface="item.preface"
                :identity="item.identity"
                :replyNum="item.replyNum"
                :time='item.time'
                :showPreface="false"
            ></forum-item>
            <div>
                <mavon-editor
                style="border: none;z-index: 0;"
                :autofocus="false"
                :toolbarsFlag='false'
                :boxShadow='false'
                :subfield='false'
                :editable='false'
                defaultOpen='preview'
                v-model="item.content"/>
            </div>
        </div>
        <div>
            <comment-list :data='dataList' @replyClick="replyClick"></comment-list>
        </div>
        <div class="reply-tools">
            <el-divider></el-divider>
            <h1><i class="el-icon-s-promotion"></i>回复{{form.replyName}} ：</h1>
            <note :boxShadow='false' v-model="form.content"></note>
            <div class="btns">
                <el-button type="primary" round @click="insertForumReply">回复TA</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import CommentList from '../components/commentList/commentList.vue'
import ForumItem from '../components/ForumList/ForumItem.vue'
import Note from '../components/Note.vue'
import API from '../api/'
export default {
    components: { ForumItem, CommentList, Note },
    data() {
        return {
            form: {
                replyid: null,
                replyName: '楼主'
            },
            item: {},
            dataList: []
        }
    },
    mounted() {
    },
    activated() {
        this.pageIndex = 0
        this.dataList = []
        this.item = {}
        this.form = {
            replyid: null,
            replyName: '楼主'
        }
        this.id = this.$route.query.id
        this.getForumPage(this.id)
        this.getForumReply()
    },
    methods: {
        replyClick(item) {
            this.form.replyId = item.id
            this.form.replyName = item.name
        },
        goBack() {
            history.back()
        },
        async getForumPage(id) {
            const res = await this.axios(API.forum.getForumPage(id))
            this.item = res.data.data
            this.form.forumId = this.item.id
            document.documentElement.scrollTop = 0
        },
        async getForumReply() {
            this.pageIndex = this.pageIndex ? this.pageIndex : 0
            this.pageIndex = this.pageIndex + 1
            const res = await this.axios(API.forum.getForumReply(this.id, this.pageIndex))
            this.dataList = res.data.data.list
        },
        async insertForumReply() {
            console.log(this.form)
            const item = {
                content: this.form.content,
                name: this.$store.state.userInfo.name,
                replyId: this.form.replyId,
                replyName: this.form.replyName == '楼主' ? null : this.form.replyName,
                time: new Date(),
                userId: 2
            }
            const res = await this.axios(API.forum.insertForumReply(this.form.forumId, this.form.content, this.form.replyId)).catch((e) => {
                this.$message.error(e)
            })
            if (res.data.data == 1) {
                this.$message({
                    message: '留言成功！',
                    type: 'success'
                })
                this.dataList.unshift(item)
            }
        }
    }
}
</script>

<style lang='less' scoped>
.reply-tools {
    text-align: left;
    .el-button {
        margin-top: 20px;
    }
    .btns {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}
.page {
    text-align: left;
    padding: 20px;
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
}
</style>

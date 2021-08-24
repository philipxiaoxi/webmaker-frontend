<template>
    <div class="container">
        <el-page-header @back="goBack" content="详情页面">
        </el-page-header>
        <div class="page">
            <forum-item
                :title="item.title"
                :author="item.author"
                :topic="item.topic"
                :preface="item.preface"
                :replyNum="item.replyNum"
                :time='item.time'
                :showPreface="false"
            ></forum-item>
            <div>
                <mavon-editor style="border: none;z-index: 0;" :toolbarsFlag='false' :boxShadow='false' :subfield='false' :editable='false' defaultOpen='preview' v-model="item.content"/>
            </div>
        </div>
        <div>
            <comment-list :data='dataList'></comment-list>
        </div>
        <div class="reply-tools">
            <el-divider></el-divider>
            <h1><i class="el-icon-s-promotion"></i>回复楼主</h1>
            <note :boxShadow='false' v-model="replyContent"></note>
            <div class="btns">
                <el-button type="primary" round>回复TA</el-button>
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
            form: {},
            item: {},
            dataList: [],
            replyContent: ''
        }
    },
    mounted() {
    },
    activated() {
        this.pageIndex = 0
        this.dataList = []
        this.item = {}
        this.id = this.$route.query.id
        this.getForumPage(this.id)
        this.getForumReply()
    },
    methods: {
        goBack() {
            history.back()
        },
        async getForumPage(id) {
            const res = await this.axios(API.forum.getForumPage(id))
            this.item = res.data.data
            document.documentElement.scrollTop = 0
        },
        async getForumReply(pageNum) {
            this.pageIndex = this.pageIndex ? this.pageIndex : 0
            this.pageIndex = this.pageIndex + 1
            const res = await this.axios(API.forum.getForumReply(this.id, this.pageIndex))
            this.dataList = res.data.data.list
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

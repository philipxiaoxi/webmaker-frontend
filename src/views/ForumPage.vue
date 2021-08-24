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
            dataList: [
                {
                    id: 1,
                    time: '2021-05-23',
                    name: '黄鉴熙',
                    content: '大家好，我是大熙哥今天教会你们如何使用codeshare，代码分享平台，CodeShare网站，能够保存前端代码片段，能够实实时修改，实时预览，在每个代码片段中提供笔记的功能，介绍代码片段的实现方式或者使用方式，通过这种的方式去学习前端。另外还可以提供单页html静态或者动态前端网页链接供开发者使用。分享你的代码片段，享受开源的互利共赢的乐趣。'
                },
                {
                    id: 2,
                    time: '2021-05-23',
                    name: '莫锦涛',
                    replyItem: { id: 1, name: '黄鉴熙' },
                    content: '这玩意还是挺好用的。'
                },
                {
                    id: 3,
                    time: '2021-05-23',
                    name: '黎文翀',
                    replyItem: { id: 1, name: '莫锦涛' },
                    content: '太拉跨了！！！'
                },
                {
                    id: 4,
                    time: '2021-05-23',
                    name: 'Ma6Jia',
                    content: '就不能好好玩耍了嘛。'
                }
            ],
            replyContent: ''
        }
    },
    mounted() {
    },
    activated() {
        this.getForumPage(this.$route.query.id)
    },
    methods: {
        goBack() {
            history.back()
        },
        async getForumPage(id) {
            const res = await this.axios(API.forum.getForumPage(id))
            this.item = res.data.data
            document.documentElement.scrollTop = 0
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

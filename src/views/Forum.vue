<template>
    <div class="container">
        <h1>欢迎来到 CodeShare Forum</h1>
        <p>你可以在此交流代码片段或使用CodeShare中遇到的问题、与他人分享使用经验。提问前请先阅读<el-link type="primary" @click="$router.push({ path: '/forumpage', query: { id: 4 } })">《提问的智慧》</el-link></p>
        <forum-list @click="goTo" :data='dataList'></forum-list>
    </div>
</template>

<script>
import ForumList from '../components/ForumList/ForumList.vue'
import API from '../api/'
export default {
    components: { ForumList },
    data() {
        return {
            form: {},
            dataList: []
        }
    },
    mounted() {
        this.getAllForumPage()
    },
    methods: {
        goTo(item) {
            console.log(item)
            this.$router.push({ path: '/forumpage', query: { id: item.id } })
        },
        async getAllForumPage() {
            this.pageIndex = this.pageIndex ? this.pageIndex : 0
            this.pageIndex = this.pageIndex + 1
            if (this.pageIndex > this.pageCount) {
                return
            }
            const res = await this.axios(API.forum.getAllForumPage(this.pageIndex))
            console.log(res)
            this.pageCount = res.data.data.lastPage
            this.dataList = this.dataList.concat(res.data.data.list)
            // 使前两个显示详情
            this.dataList[0].showPreface = true
            this.dataList[1].showPreface = true
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
    margin-top: 80px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
}
</style>

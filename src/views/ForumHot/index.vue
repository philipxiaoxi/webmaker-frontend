<template>
<div class="forum-hot-container" v-if="dataList.length > 0" @click="goTo(dataList[0])">
  <div class="header"><i class="el-icon-time"></i>最新讨论</div>
  <div class="flex-row ai-center jc-between article">
    <div>
        <div class="title">{{dataList[0].title}}</div>
        <div class="tag-title">{{dataList[0].preface}}</div>
    </div>
    <div>
        <el-avatar :size="40" :src="getHeadImgSrc"></el-avatar>
    </div>
  </div>
</div>
</template>

<script>
import API from '../../api/'

export default {
    name: 'ForumHot',
    data() {
        return {
            dataList: [],
            pageIndex: 0
        }
    },
    computed: {
        getHeadImgSrc() {
            return 'https://cravatar.cn/avatar/' + this.dataList?.[0]?.email || ''
        }
    },
    activated() {
        this.getAllForumPage()
    },
    methods: {
        async getAllForumPage() {
            this.pageIndex = this.pageIndex ? this.pageIndex : 0
            this.pageIndex = this.pageIndex + 1
            if (this.pageIndex > this.pageCount) {
                return
            }
            const res = await this.axios(API.forum.getAllForumPage(this.pageIndex))
            this.pageCount = res.data.data.lastPage
            this.dataList = this.dataList.concat(res.data.data.list)
        },
        goTo(item) {
            this.$router.push({ path: '/forumpage', query: { id: item.id } })
        }
    }
}
</script>

<style lang="less" scoped>
.forum-hot-container {
    cursor: pointer;
    text-align: left;
    background-color: white;
    margin: 20px 0;
}
.header {
    padding: 10px;
    border-bottom: 1px solid hsla(0,0%,59.2%,.1);
    font-size: 16px;
    color: #252933;
    > i {
        margin: 0 5px;
    }
}
.article {
    padding: 20px;
}
.title {
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    color: #1d2129;
    width: 100%;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    margin-bottom: 10px;
}
.tag-title {
    color: #86909c;
    font-size: 13px;
    line-height: 22px;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
}
</style>

<template>
    <div>
        <el-carousel height="350px" :interval="5000" arrow="always">
            <el-carousel-item v-for="item in carouselImgs" :key="item.imgurl">
                <img style="width: 100%;" :src="item.imgurl" :alt="item.title" :title="item.title">
            </el-carousel-item>
        </el-carousel>
        <div class="codes">
            <code-card :id="item.id" :title="item.title" :author="item.name" v-for="item in cards" :key="item.id"></code-card>
        </div>
        <div style="margin-top:20px;"><el-button type="primary" round @click="getAllSnippet">继续加载</el-button></div>
    </div>
</template>

<script>
import CodeCard from '../components/CodeCard.vue'
import API from '../api/'
export default {
    components: { CodeCard },
    data() {
        return {
            pageCount: 1,
            pageIndex: 0,
            cards: [],
            carouselImgs: [
                {
                    title: 'CodeShare轻松编码网站！',
                    imgurl: '/img/banner/Banner3.png'
                },
                {
                    title: '构建服务一体化的代码共享平台。',
                    imgurl: '/img/banner/Banner1.png'
                },
                {
                    title: '2021前端技术研讨会等你来参加！',
                    imgurl: '/img/banner/Banner2.png'
                }
            ]
        }
    },
    mounted() {
        this.getAllSnippet()
    },
    methods: {
        async getCodeimg(item) {
            const res = await this.axios.get(`/common/getSnippetImg/${item.id}`)
            return res.data.data
        },
        getAllSnippet() {
            this.pageIndex = this.pageIndex + 1
            if (this.pageIndex > this.pageCount) {
                return
            }
            this.axios(API.snippet.getAllSnippet(this.pageIndex)).then(res => {
                this.cards = this.cards.concat(res.data.data.list)
                this.pageCount = res.data.data.lastPage
            }).catch((e) => {
                console.log(e)
            })
        }
    }
}
</script>

<style lang='less' scoped>
.el-carousel {
    margin-bottom: 20px;
}
.codes {
    display: grid;
    grid-template-columns: repeat(auto-fill,minmax(350px,1fr));
    align-items: start;
    grid-gap: 1rem 1rem;
}
</style>

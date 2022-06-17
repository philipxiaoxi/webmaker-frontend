<template>
    <div class="container">
        <el-carousel :height="imgHeight+'px'" :interval="10000" arrow="always">
            <el-carousel-item v-for="item in carouselImgs" :key="item.imgurl">
                <img ref="image" style="width: 100%;" :src="item.imgurl" :alt="item.title" :title="item.title">
            </el-carousel-item>
        </el-carousel>
        <square-tools></square-tools>
        <codes-show></codes-show>
    </div>
</template>

<script>
import CodesShow from '../components/CodesShow.vue'
import SquareTools from '../components/SquareTools.vue'
export default {
    components: { CodesShow, SquareTools },
    data() {
        return {
            pageCount: 1,
            pageIndex: 0,
            cards: [],
            carouselImgs: [
                {
                    title: '申请免费的虚拟容器，无论是 挂机下载、远程开发、写笔记、海外加速通通一站式解决。',
                    imgurl: '/img/banner/Banner1.png'
                },
                {
                    title: 'WebMaker轻松编码网站！',
                    imgurl: '/img/banner/Banner3.png'
                },
                {
                    title: '开源开放，为你服务，24小时不间断提供网页托管、虚拟容器服务。',
                    imgurl: '/img/banner/Banner2.png'
                }
            ],
            imgHeight: 350
        }
    },
    activated() {
        setTimeout(() => {
            this.imgHeight = this.$refs.image[0].height == 0 ? 350 : this.$refs.image[0].height
        }, 200)
    },
    mounted() {
        // 监听窗口变化，使得轮播图高度自适应图片高度
        window.addEventListener('resize', () => {
            this.imgHeight = this.$refs.image[0].height
        })
    },
    methods: {

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
}
.el-carousel {
    margin-bottom: 20px;
    z-index: 3;
}
.codes {
    display: grid;
    grid-template-columns: repeat(auto-fill,minmax(350px,1fr));
    align-items: start;
    grid-gap: 1rem 1rem;
}
</style>

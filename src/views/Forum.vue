<template>
    <div class="container">
        <h1>欢迎来到 CodeShare Forum(测试页面)</h1>
        <p>你可以在此交流代码片段或使用CodeShare中遇到的问题、与他人分享使用经验。提问前请先阅读《提问的智慧》</p>
        <forum-list @click="goTo" :data='dataList'></forum-list>
    </div>
</template>

<script>
import ForumList from '../components/ForumList/ForumList.vue'
export default {
    components: { ForumList },
    data() {
        return {
            form: {},
            dataList: [
                {
                    id: 1,
                    title: '一分钟教会你codeshare的正确用法！',
                    author: '黄鉴熙',
                    topic: '知识小课堂',
                    showPreface: true,
                    replyNum: 12,
                    preface: '大家好，我是大熙哥今天教会你们如何使用codeshare，代码分享平台，CodeShare网站，能够保存前端代码片段，能够实实时修改，实时预览，在每个代码片段中提供笔记的功能，介绍代码片段的实现方式或者使用方式，通过这种的方式去学习前端。另外还可以提供单页html静态或者动态前端网页链接供开发者使用。分享你的代码片段，享受开源的互利共赢的乐趣。'
                },
                {
                    id: 2,
                    title: '咸鱼云的登录窗口自定义输入框的设计，很漂亮，不来看看你血亏！',
                    author: '莫锦涛',
                    topic: '知识小课堂',
                    showPreface: true,
                    replyNum: 6,
                    preface: '大家好，我是大熙哥今天教会你们如何使用codeshare，代码分享平台，CodeShare网站，能够保存前端代码片段，能够实实时修改，实时预览，在每个代码片段中提供笔记的功能，介绍代码片段的实现方式或者使用方式，通过这种的方式去学习前端。另外还可以提供单页html静态或者动态前端网页链接供开发者使用。分享你的代码片段，享受开源的互利共赢的乐趣。'
                },
                {
                    id: 3,
                    title: '测试2333333333333333',
                    author: '莫锦涛',
                    topic: '知识小课堂',
                    replyNum: 122,
                    preface: '大家好，我是大熙哥今天教会你们如何使用codeshare，代码分享平台，CodeShare网站，能够保存前端代码片段，能够实实时修改，实时预览，在每个代码片段中提供笔记的功能，介绍代码片段的实现方式或者使用方式，通过这种的方式去学习前端。另外还可以提供单页html静态或者动态前端网页链接供开发者使用。分享你的代码片段，享受开源的互利共赢的乐趣。'
                },
                {
                    id: 4,
                    title: '测试23333333333333335666666666666',
                    author: '莫锦涛',
                    topic: '知识小课堂',
                    replyNum: 999,
                    preface: '大家好，我是大熙哥今天教会你们如何使用codeshare，代码分享平台，CodeShare网站，能够保存前端代码片段，能够实实时修改，实时预览，在每个代码片段中提供笔记的功能，介绍代码片段的实现方式或者使用方式，通过这种的方式去学习前端。另外还可以提供单页html静态或者动态前端网页链接供开发者使用。分享你的代码片段，享受开源的互利共赢的乐趣。'
                }
            ]
        }
    },
    mounted() {

    },
    methods: {
        goTo(item) {
            console.log(item)
            this.$router.push({ path: '/forumpage', query: { id: item.id } })
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

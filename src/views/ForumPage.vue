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
                :showPreface="false"
            ></forum-item>
            <div>
                <mavon-editor style="border: none;z-index: 0;" :toolbarsFlag='false' :boxShadow='false' :subfield='false' :editable='false' defaultOpen='preview' v-model="value"/>
            </div>
        </div>
        <div>
            <comment-list :data='dataList'></comment-list>
        </div>
        <div class="reply-tools">
            <el-divider></el-divider>
            <h1><i class="el-icon-s-promotion"></i>回复莫锦涛的评论</h1>
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
export default {
    components: { ForumItem, CommentList, Note },
    data() {
        return {
            form: {},
            item: {
                id: 1,
                title: '一分钟教会你codeshare的正确用法！',
                author: '黄鉴熙',
                topic: '知识小课堂',
                showPreface: true,
                replyNum: 12,
                preface: '大家好，我是大熙哥今天教会你们如何使用codeshare，代码分享平台，CodeShare网站，能够保存前端代码片段，能够实实时修改，实时预览，在每个代码片段中提供笔记的功能，介绍代码片段的实现方式或者使用方式，通过这种的方式去学习前端。另外还可以提供单页html静态或者动态前端网页链接供开发者使用。分享你的代码片段，享受开源的互利共赢的乐趣。'
            },
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
            replyContent: '',
            value: `## 广东智慧团建第三方客户端young3.0
这是使用electron开发的广东智慧团建第三方客户端，目的是补全网页版缺失的功能如青年大学习未学名单，优化页面显示效果，优化加载速度等。并且添加一些新的实用性功能。

### 功能展示

#### 登录页面
登录页面输入您的账号密码即可登录，非频繁登录的情况下不需要输入验证码。

![登录页面](https://blog.diyxi.top/upload/2021/08/image-c9bbcf1e8dad4285a3ad78dda23f958d.png)

#### 学习状态
登录成功后便会进入到主页，默认进入到学习状态，学习状态显示当前青年大学习的状态信息，并给出具体未参学名单。

除此之外，还提供工具箱，分别有【一键复制信息】【生成催学信息】两个功能。

【一键复制信息】功能，就是把当前总人数、已学人数、参学率及未学名单进行合并成一句话并自动复制。

【生成催学信息】功能，就是把参学率及未学名单进行合并成一段催促学生学习的话并自动复制。

![学习状态](https://blog.diyxi.top/upload/2021/08/image-784af8bb55f348e88ff12e6f1009e3ff.png)

#### 我的团员
此处我的团员相对于网页版来说，为了能够尽快联系到同学，显示每一位团员的微信、QQ、电话。并贴心的提供了生日倒计时，小于30天的将会标注出来，方便团支书开展团日活动。

![我的团员](https://blog.diyxi.top/upload/2021/08/image-abbe2cedb19f43feb272b8c3713b85c6.png)

#### 团费查询
团费查询相对于网页版来说，做了UI和布局优化设计，头部显示当前全部状态，但是有更新时间，下面则会显示具体的已交名单和未交名单，已交名单将会在其名字上标注【优秀】以此来激励同学们尽早交团费。

![团费查询1](https://blog.diyxi.top/upload/2021/08/image-f56e582b8df844bfb305f26f35d75efb.png)

![团费查询2](https://blog.diyxi.top/upload/2021/08/image-b1792aad57f44b669655e9f21c91cbf3.png)

以上仅为示例，未来新增功能及样式外观改变可能不会替换图片。

### 构建项目

本项目只有前端，您只需要按照一定的步骤即可完成项目部署。

## Project setup
\`\`\`
npm install
\`\`\`

### Compiles and hot-reloads for development
\`\`\`
npm run electron:serve
\`\`\`

### Compiles and minifies for production
\`\`\`
npm run electron:build
\`\`\`

### 发行版本
预计8月10日左右将会提供发行版，安装包大小约50MB，压缩包大小约为80MB。

### 贡献
如果你也是一位团支书，也懂得编程，欢迎您贡献~

### 计划
如果你是一位团支书，在工作上您还想如何便利，均可提出Issues，我将会查看。你的想法或许能够实现。

### 声明
本系统仅供学习参考使用，请在下载后24小时内删除，请勿安装下载渠道来历不明的软件，因本软件是开源软件，为了确保安全，请在本页面下载或者去blog.diyxi.top下载，或者您可以选择自己构建和打包。

### gitee链接

[https://gitee.com/huang_jianxi/tuan12355-thirdParty](https://gitee.com/huang_jianxi/tuan12355-thirdParty)`
        }
    },
    mounted() {

    },
    methods: {
        goBack() {
            history.back()
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

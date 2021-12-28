<template>
    <div class="container">
        <h1>前端工具箱</h1>
        <div class="links-container">
            <link-icon
            v-for="(item,i) in linksList" :key="item.title + i"
            :title="item.title"
            :intro="item.intro"
            :url="item.url"
            :img='item.img'
            ></link-icon>
        </div>
        <creative-factory></creative-factory>
    </div>
</template>

<script>
import LinkIcon from '../components/LinkIcon.vue'
import CreativeFactory from '../components/CreativeFactory.vue'
export default {
    components: { LinkIcon, CreativeFactory },
    data() {
        return {
            linksList: [
                {
                    title: '获取漂亮的边框',
                    intro: 'All of these box-shadow were copied using.',
                    url: 'https://getcssscan.com/css-box-shadow-examples?ref=producthunt',
                    img: 'https://toastlog.com/img/logos/cssscan.svg'
                },
                {
                    title: '获取随机字符串和图片',
                    intro: 'API tool for generating lorem ipsum, and getting placeholder images.',
                    url: 'https://sdfsdf.dev/'
                },
                {
                    title: '在线base64解码/编码工具',
                    intro: '在线base64解码/编码工具是一个可以将字符串进行base64解码/编码。',
                    url: 'https://c.runoob.com/front-end/693/',
                    img: 'data:image/png;base64,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'
                },
                {
                    title: '免费SSL证书',
                    intro: 'FreeSSL.cn 是一个免费提供 HTTPS 证书申请。',
                    url: 'https://freessl.cn/login'
                },
                {
                    title: '正则表达式在线测试',
                    intro: '在线进行正则表达式在线测试。',
                    url: 'https://c.runoob.com/front-end/854/',
                    img: 'data:image/png;base64,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'
                },
                {
                    title: 'web前端学习架构',
                    intro: '聚集一切前端资源的导航系统。',
                    url: 'http://www.alloyteam.com/nav/'
                },
                {
                    title: '同态生成器',
                    intro: 'Generate Soft-UI CSS code',
                    url: 'https://neumorphism.io/#e0e0e0'
                },
                {
                    title: '色彩空间',
                    intro: 'free collection of 180 linear gradients.',
                    url: 'https://webgradients.com/',
                    img: 'https://webgradients.com/img/other/logos/webgradients_logo.png'
                },
                {
                    title: '免费音频素材',
                    intro: '113万首音频供您下载。',
                    url: 'https://www.aigei.com/sound'
                }
            ]
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
}
.links-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
}
</style>

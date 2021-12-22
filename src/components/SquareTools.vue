<template>
    <div class="square-crads">
        <div class="square-crad">
            <div class="card-icon">
                <i class="el-icon-edit"></i>
            </div>
            <div class="title">代码和测试</div>
            <p>通过在线编写代码来测试前端HTML/CSS/JS新特性，同时更快地了解代码原理。</p>
            <el-button  size="small" class="xx-btn">开始在线编码</el-button>
        </div>
        <div class="square-crad">
            <div class="card-icon">
                <i class="el-icon-search"></i>
            </div>
            <div class="title">发现和学习</div>
            <p>查看别人经典代码动画特效，理解它们是如何实现的。从而提升自己的学习开发能力。</p>
            <el-button  size="small" class="xx-btn">搜索全站代码</el-button>
        </div>
        <div class="square-crad">
            <div class="card-icon">
                <i class="el-icon-chat-dot-round"></i>
            </div>
            <div class="title">交流和分享</div>
            <p>通过查看别人代码，您可以留言和作者交流实现的思路，同时可以将代码分享嵌入到你自己的博客文章。</p>
            <el-button size="small" class="xx-btn">进入微论坛</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SquareTools',
    components: {},
    props: {
    },
    data() {
        return {
            content: '',
            editorOption: {}
        }
    },
    computed: {
    },
    watch: {
    },
    methods: {
    }
}
</script>

<style lang="less" scoped>
.square-crads {
    display: flex;
    flex-direction: row;
}
.square-crad {
    position: relative;
    width: 100%;
    text-align: left;
    margin: 10px;
    background-color: white;
    border-radius: 10px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: end;
    &>.title {
        font-size: 35px;
    }
    &>.xx-btn {
        border: 3px solid #444857;
        background: #444857;
        color: #fff;
    }
    &>p {
        text-align: justify;
    }
    margin-top: 30px;
    margin-bottom: 40px;
    &>.card-icon {
        position: absolute;
        font-size: 35px;
        top:-25px;
        background-color: #444857;
        width: 50px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        color: white;
        border-radius: 10px;
    }
}
</style>

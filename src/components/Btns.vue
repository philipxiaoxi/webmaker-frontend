<template>
    <div>
        <div class="btns">
            <el-button type="primary" round size="mini" >新建代码片段</el-button>
            <el-input size="mini" v-model="$parent.item.title" placeholder="请输入内容" style="width:200px;"></el-input>
            <el-tooltip id="code_pic" class="item" effect="dark" content="鼠标点击一下，Ctrl+V粘贴图片，自动获取代码首页大图" placement="top-start">
                <i style="margin-left:10px;font-size: 20px;" class="el-icon-picture"></i>
            </el-tooltip>
            <el-button type="primary" round size="mini" @click="$parent.preview()">预览</el-button>
            <el-button type="primary" round size="mini"  @click="$parent.save()">保存</el-button>
            <el-button type="primary" round size="mini" @click="copyRealLink">复制直链</el-button>
            <el-button type="primary" round size="mini" @click="copyLink">复制链接</el-button>
        </div>
    </div>
</template>

<script>
import API from '../api/'
import common from '../util/common'
export default {
    methods: {
        copyLink() {
            const data = window.location.href
            if (common.copy(data)) {
                this.$message({
                    message: '复制成功。',
                    type: 'success'
                })
            }
        },
        copyRealLink() {
            const type = this.$parent.item.type
            let content = ''
            switch (type) {
            case 0:
                content = API.getServer() + 'common/SnippetHtml/' + this.$parent.item.id
                break
            case 1:
                content = API.getServer() + 'common/getSnippetProjectFile/' + this.$parent.item.id + '/index.html'
                break
            default:
                content = '┗|｀O′|┛ 嗷~~生成链接失败！帮你复制了主站链接：codeshare.diyxi.top'
            }
            if (common.copy(content)) {
                this.$message({
                    message: '复制成功。',
                    type: 'success'
                })
            }
        }
    }
}
</script>

<style lang="less" scoped>
.btns {
    margin: 10px;
    text-align: left;
    margin-left: 15px;
    display: flex;
    align-items: center;
    &>* {
        margin-left: 10px;
    }
}
#code_pic:focus{
    color: #409EFF;
}
</style>

<template>
    <div class="container">
        <div class="btns">
            <el-button type="primary" round size="mini" @click="preview">预览</el-button>
        </div>
        <div class="con">
            <vs-code ref="vscode" class="xx-vscode"></vs-code>
            <div  class="xx-preview" style="position: relative;">
                <!--遮罩层 遮住iframe-->
                <div class="iframeDiv"></div>
                <preview ref="preview" style="height:100%;"></preview>
            </div>
        </div>
    </div>
</template>

<script>
import Preview from '../components/Preview.vue'
import VsCode from '../components/VsCode.vue'
import API from '../api/'
export default {
    components: { VsCode, Preview },
    data() {
        return {
            id: -1
        }
    },
    activated() {
        if (this.$route.query.id != null && this.$route.query.id != this.id) {
            this.id = this.$route.query.id
            this.axios(API.snippet.getSnippet(this.id)).then(res => {
                if (res.data.data == null) {
                    this.$message.error('该代码片段已下架或者被删除！')
                }
                this.$refs.vscode.monacoEditor.getModel().setValue(res.data.data.content)
                this.$refs.preview.goPreview(res.data.data.content)
            }).catch((e) => {
                console.log(e)
            })
        } else {
            this.preview()
        }
    },
    methods: {
        preview() {
            const content = this.$refs.vscode.value
            this.$refs.preview.goPreview(content)
        }
    }
}
</script>

<style lang="less" scoped>
.btns {
    margin: 10px;
    text-align: left;
    margin-left: 25px;
}
.container {
    margin-top: 70px;
}
.con {
    display: flex;
    flex-direction: row;
    justify-content: center;
}
.xx-vscode {
    height:calc(100vh - 135px) !important;
    width:calc(50% - 25px) !important;
}
.xx-preview {
    height:calc(100vh - 135px);
    width:calc(50% - 25px);
}
</style>

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
export default {
    components: { VsCode, Preview },
    activated() {
        this.preview()
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

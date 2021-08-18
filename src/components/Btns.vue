<template>
    <div>
        <div class="btns">
            <el-button type="primary" round size="mini" >新建代码片段</el-button>
            <el-input size="mini" v-model="$parent.item.title" placeholder="请输入内容" style="width:200px;"></el-input>
            <el-tooltip id="code_pic" class="item" effect="dark" content="鼠标点击一下，Ctrl+V粘贴图片，自动获取代码首页大图" placement="top-start">
                <i style="margin-left:10px;font-size: 20px;" class="el-icon-picture"></i>
            </el-tooltip>
            <el-button type="primary" round size="mini" @click="$parent.preview()">预览</el-button>
            <el-button type="primary" round size="mini" >保存</el-button>
            <el-button type="primary" round size="mini" >复制链接</el-button>
            <el-button type="primary" round size="mini" >复制可编辑链接</el-button>
            <el-button type="primary" round size="mini" >片段笔记</el-button>
        </div>
    </div>
</template>

<script>
export default {

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

<template>
    <div>
        <el-divider></el-divider>
        <div class="container">
            <div class="xx-row">
                <img :src="'https://api.sunweihu.com/api/sjtx/api.php?lx=a1&t=' + Math.random()" alt="">
                <div class="tips">
                    <div class="title">{{name}}</div>
                    <div class="info">
                        <div class="author">{{time}}</div>
                        <el-tag style="margin-left: 10px;margin-top: 1px;" type="info" size="mini">实习码农</el-tag>
                    </div>
                </div>
            </div>
            <el-link href="https://element.eleme.io" target="_blank">回复TA</el-link>
        </div>
       <div class="content">
           <el-tag v-if="replyItem != null"><i class="el-icon-s-promotion"></i>回复[{{replyItem.name}}]的评论</el-tag>
            <p>
                {{content}}
            </p>
        </div>
    </div>
</template>

<script>
export default {
    props: ['name', 'time', 'replyItem', 'content']
}
</script>

<style lang='less' scoped>
.container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    text-align: justify;
    padding: 20px;
    .content {
        text-align: justify;
        padding: 0px 20px;
        padding-left: 82px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        .el-tag {
            margin: 0px 0px;
            margin-top: 4px;
        }
    }
}
.xx-row {
    display: flex;
    flex-direction: row;
    align-items: center;
}
.tips {
    .info {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .title {
        font-size: 1.1em;
        white-space: nowrap;
        font-size: 1.1em;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
    }
    .author {
        color: #717790;
    }
}
img {
    width: 50px;
    height: 50px;
    border: 1px solid #EEE;
    border-radius: 500rem;
    margin-right: 10px;
}
</style>

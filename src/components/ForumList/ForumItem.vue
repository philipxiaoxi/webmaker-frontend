<template>
    <div class="ForumItemContainer" @click="$emit('click')">
        <div class="container">
            <div class="xx-row">
                <img src="https://disk.xiaotao2333.top:344/api/user/avatar/n" alt="">
                <div class="tips">
                    <div class="title">{{title}}</div>
                    <div class="info">
                        <div class="author">{{author}}</div>
                        <el-tag style="margin-left: 10px;margin-top: 1px;" type="info" size="mini">实习码农</el-tag>
                    </div>
                </div>
            </div>
            <div>
                <el-tag>{{topic}}</el-tag>
                <span class="replyNum"><i class="el-icon-chat-line-round"></i> {{replyNum}}</span>
            </div>
        </div>
        <div v-if="showPreface">
            <p class="preface">{{preface}}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: ['title', 'author', 'topic', 'replyNum', 'preface', 'showPreface']
}
</script>

<style lang='less' scoped>
.ForumItemContainer {
    cursor: pointer;
    padding: 20px;
    transition: all 0.3s;
    &:hover {
        background-color: white;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
}
.container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .replyNum {
        margin-left: 10px;
        width: 60px;
        display: inline-block;
        text-align: center;
    }
}
.preface {
    text-align: justify;
    margin: 20px 80px;
    color: #aaa;
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

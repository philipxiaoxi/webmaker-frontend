<template>
    <div style="position: relative;">
        <el-divider></el-divider>
        <div class="container">
            <div class="xx-row">
                <img :src="'https://cravatar.cn/avatar/' + email" alt="name">
                <div class="tips">
                    <div class="title">{{name}}</div>
                    <div class="info">
                        <div class="author">{{time}}</div>
                        <el-tag v-if="false" style="margin-left: 10px;margin-top: 1px;" :type="getIdentity.type" size="mini">{{getIdentity.text}}</el-tag>
                    </div>
                </div>
            </div>
            <div class="levelNum">#{{index + 1}}</div>
            <el-link @click.native="click" target="_blank">回复TA</el-link>
        </div>
       <div class="content">
            <el-popover
            ref="replyShow"
            placement="top-start"
            :title="replyName"
            width="200"
            trigger="hover"
            @show='replyShow'
            :content="replycontent">
            </el-popover>
           <el-tag v-popover:replyShow v-if="replyName != null"><i class="el-icon-s-promotion"></i>回复[{{replyName}}]的评论</el-tag>
            <note v-model="content" :preview="true"></note>
        </div>
    </div>
</template>

<script>
import API from '../../api'
import FS from '../../util/FormatString'
import Note from '../Note.vue'

export default {
    components: { Note },
    props: ['name', 'time', 'replyName', 'content', 'index', 'replyId', 'identity', 'email'],
    data() {
        return {
            replycontent: '加载中……'
        }
    },
    computed: {
        getIdentity() {
            return FS.getIdentityString(this.identity)
        }
    },
    methods: {
        click() {
            this.$emit('click')
        },
        async replyShow() {
            const res = await this.axios(API.forum.getForumReplyById(this.replyId))
            this.replycontent = res.data.content
        }
    }
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
    .levelNum {
        position: absolute;
        bottom: 0;
        right: 30px;
        font-size: 35px;
        color: #20dbfd;
        text-shadow: 0 0 25px #00d8ff;
        font-family: fantasy;
        text-align: right;
    }
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
            cursor: pointer;
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

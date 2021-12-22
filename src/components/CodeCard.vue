<template>
    <div>
        <el-card @click.native="$emit('clickCard')" class="xx-code-card" style="text-align: left;" :body-style="{ padding: '0px' }" shadow='hover'>
            <div class="heads">
                <img class="CodeImg" :src="RealCodeImg" alt="">
            </div>
            <div class="headimg">
                <div class="xx-row">
                    <img :src="headimg" alt="">
                    <div class="tips">
                        <div class="title">{{title}}</div>
                        <div class="info">
                            <div class="author">{{author}}</div>
                            <el-tag style="margin-left: 10px;margin-top: 1px;" :type="getIdentity.type" size="mini">{{getIdentity.text}}</el-tag>
                        </div>
                    </div>
                </div>
                <div @click.stop="$emit('clickPreview')" class="icon" title="预览">
                    <i class="el-icon-view"></i>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
import API from '../api'
import FS from '../util/FormatString'
export default {
    props: {
        title: {
            type: String,
            default: 'WebMaker代码卡片展示'
        },
        author: {
            type: String,
            default: '作者'
        },
        codeimg: {
            // 片段图片
            type: String,
            default: '/img/code.jpg'
        },
        headimg: {
            // 片段图片
            type: String,
            default: '/img/code.jpg'
        },
        identity: {
            type: Number,
            default: -1
        },
        id: {
            // 片段id
            type: Number,
            default: -1
        },
        type: {
            type: Number,
            default: -1
        }
    },
    data() {
        return {
            RealCodeImg: ''
        }
    },
    computed: {
        getIdentity() {
            return FS.getIdentityString(this.identity)
        }
    },
    mounted() {
        this.getCodeimgByFile(this.id)
    },
    methods: {
        async getCodeimgByFile(id) {
            this.RealCodeImg = API.getServer() + `/common/getImg/${id}`
        },
        async getCodeimg(id) {
            const res = await this.axios.get(`/common/getSnippetImg/${id}`)
            if (res.data.data != null) {
                this.RealCodeImg = res.data.data
            } else {
                this.RealCodeImg = this.codeimg
            }
        },
        codePreview() {
            console.log('通知预览')
        }
    }
}
</script>

<style lang='less' scoped>
.heads {
    width: 100%;
    height: 250px;
    overflow: hidden;
    img {
        width: 100%;
        height: 100%;
        padding-bottom: 0px;
    }
}

.headimg {
    padding: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .xx-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
    }
    img {
        width: 50px;
        height: 50px;
        border: 1px solid #EEE;
        border-radius: 500rem;
        margin-right: 10px;
    }
}
.tips {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    width: 0;
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
    }
    .author {
        color: #717790;
    }
}
.xx-code-card {
    transition: all 0.2s;
    &:hover {
        transform: translateY(-10px);
    }
    &:hover .icon {
        opacity: 1;
        transition: all 0.2s;
    }
}
.icon {
    width: 25px;
    height: 25px;
    font-size: 25px;
    opacity: 0;
    cursor: pointer;
    padding: 10px;
    border-radius: 10px;
    &:hover {
        background: #444857;
        color: #fff;
    }
}
</style>

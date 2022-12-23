<template>
    <div class="container" @mouseleave.stop="hover = false" @mouseover.stop="hover = true">
        <el-card @click.native="$emit('clickCard')" class="xx-code-card" style="text-align: left;" :body-style="{ padding: '0px' }" shadow='hover'>
            <div class="heads">
                <Preview v-if="showPreview" ref="preview" class="preview" :item="item"></Preview>
                <img
                    v-else
                    class="CodeImg"
                    :src="RealCodeImg"
                    alt=""
                    :title="quickPreview ? '鼠标停留2秒预览片段' : '在系统设置中可开启快速预览'"
                >
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
                <div
                class="icon" title="编辑片段">
                    <i class="el-icon-edit"></i>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
import API from '../api'
import FS from '../util/FormatString'
import Preview from './Preview.vue'
export default {
    name: 'CodeCard',
    components: { Preview },
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
        },
        quickPreview: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            RealCodeImg: '',
            hover: false,
            showPreview: false
        }
    },
    watch: {
        hover() {
            if (!this.quickPreview) return
            if (this.hover) {
                this.goPreviewTimer = setTimeout(this.goPreview, 2000)
            } else {
                clearTimeout(this.goPreviewTimer)
                this.showPreview = false
            }
        }
    },
    computed: {
        getIdentity() {
            return FS.getIdentityString(this.identity)
        },
        // 为预览组件服务（历史遗留坑）
        item() {
            return {
                id: this.id
            }
        }
    },
    mounted() {
        this.getCodeimgByFile(this.id)
        document.addEventListener('mouseover', this.closeHover)
    },
    beforeDestroy() {
        document.removeEventListener('mouseover', this.closeHover)
    },
    methods: {
        closeHover() {
            this.hover = false
        },
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
        },
        async goPreview() {
            console.log('loading', this.hover)
            if (!this.hover) return
            this.showPreview = true
            this.$nextTick(async() => {
                let url = ''
                switch (this.type) {
                case 0:
                    url = API.getServer() + 'common/SnippetHtml/' + this.id
                    break
                case 1:
                    url = API.getServer() + 'common/getSnippetProjectFile/' + this.id + '/index.html'
                    break
                default:
                    url = ''
                }
                console.log(this.type)
                const res = await this.axios({ url: url })
                this.$refs.preview && this.$refs.preview.goPreview(res.data, 'html')
            })
        }
    }
}
</script>

<style lang='less' scoped>
.container {
    position: relative;
    cursor: pointer;
    overflow: hidden;
}
.heads {
    position: relative;
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
.preview {
    width: calc(100% * 2);
    height: calc(100% * 2 - 144px);
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 999;
    transform:scale(0.5) translate(-50%,-50%);
}
</style>

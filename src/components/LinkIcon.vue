<template>
    <div :style="{backgroundColor: this.bgColor}" class="linkicon" @click="goTo(url)">
        <div class="title">{{title}}</div>
        <div class="intro">
            <img :src="imgSrc"  @error="imgLoadError"/>
            <div class="text">{{intro}}</div>
        </div>
        <div v-show="editMode" @click.stop="$emit('close', id)" class="close"><i class="el-icon-error"></i></div>
    </div>
</template>

<script>
export default {
    props: {
        editMode: {
            type: Boolean,
            default: false
        },
        id: {
            type: Number
        },
        title: {
            type: String,
            default: '默认标题'
        },
        img: {
            type: String,
            default: 'data:image/png;base64,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'
        },
        intro: {
            type: String,
            default: '默认介绍'
        },
        auth: {
            type: String,
            default: 'userId'
        },
        url: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'url'
        },
        bgColor: {
            type: String,
            default: ''
        },
        extra: {
            type: String,
            default: '{}'
        }
    },
    data() {
        return {
            imgSrc: ''
        }
    },
    mounted() {
        if (this.type === 'url') {
            const urlObject = new URL(this.url)
            this.imgSrc = urlObject.origin + '/favicon.ico'
        } else {
            this.imgSrc = this.img
        }
    },
    methods: {
        imgLoadError() {
            this.imgSrc = this.img
        },
        goTo(url) {
            if (this.type == 'url') window.open(url)
            if (this.type == 'path') this.$router.push({ path: url })
            this.$store.commit('setAuth', this.auth)
            this.$store.commit('setExtra', this.extra)
            if (this.type == 'insideApp') {
                this.$router.push({
                    path: 'insideApp',
                    query: {
                        url
                    }
                })
            }
        }
    }
}
</script>

<style lang="less" scoped>
.linkicon {
    position: relative;
    border-radius: 3px;
    cursor: pointer;
    margin: 15px;
    background-color: #FFFF;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    text-align: left;
    transition: all 0.3s;
    &>div {
        margin:  10px 20px;
    }
    .title {
        font-size: 16px;
        color: #409EFF;
        font-weight: bold;
    }
    .intro {
        display: flex;
        flex-direction: row;
        & > .text {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
        &>div {
            margin-left: 10px;
            font-size: 15px;
        }
        img {
            width: 40px;
            height: 40px;
        }
    }
    .close {
        position: absolute;
        right: -30px;
        top: -20px;
        z-index: 999;
        font-size: 35px;
    }
}
.linkicon:hover{
    transform: translateY(-2px);
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
</style>

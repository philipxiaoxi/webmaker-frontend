<template>
    <!-- 网页内嵌型组件 -->
    <div class="conponent-iframe-container">
        <div v-show="editMode" @click.stop="$emit('close', app.id)" class="close"><i class="el-icon-close"></i></div>
        <div v-show="editMode" class="mask">
            <div class="title">{{app.title}}</div>
        </div>
        <iframe ref="iframe" class="conponent-iframe" :src="app.url"></iframe>
    </div>
</template>

<script>
export default {
    props: {
        app: {
            type: Object,
            default: () => ({})
        },
        editMode: {
            type: Boolean,
            default: false
        },
        extra: {
            type: String,
            default: '{}'
        }
    },
    mounted() {
        this.$refs.iframe.addEventListener('load', () => {
            console.log('234234324')
            console.log(this.app)
            this.sendStore()
        })
    },
    methods: {
        sendStore() {
            if (this.src === '') return
            let data = null
            const { auth } = this.app
            if (auth === 'userId') data = { id: this.$store.getters.userId }
            if (auth === 'userInfo') data = { userInfo: this.$store.getters.userInfo }
            if (auth === 'token') data = { token: this.$store.getters.token }
            data.extra = this.extra
            this.$refs.iframe.contentWindow.postMessage({
                message: 'AUTH',
                type: this.auth,
                data
            }, '*')
            console.log('=========================================')
            console.log(this.$store.getters.userId, auth)
            console.log('[MircoApp]: Store数据已发送给子前端', data)
            console.log('[MircoApp]: 授权方式：', auth)
            console.log('[MircoApp]: 数据内容：', data)
            console.log('=========================================')
        }
    }
}
</script>

<style lang="less" scoped>
.mask {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(255,255,255,0.95);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: box-shadow 0.3s;
    &:hover {
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
    .title {
        text-align: center;
        font-size: 25px;
        color: #47494c;
    }
}
.conponent-iframe-container {
    height: 100%;
    // background-color: white;
}
.conponent-iframe {
    height: 100%;
    width: 100%;
    border: none;
    outline: none;
    border-radius: 3px;
}
.conponent-iframe-edit {
    box-sizing: border-box;
    padding: 20px;
}
.close {
    position: absolute;
    right: -10px;
    top: -10px;
    z-index: 999;
    font-size: 15px;
    cursor: pointer;
    background: white;
    border-radius: 50%;
    background-color: #f56c6c;
    color: white;
    padding: 5px;
    box-sizing: border-box;
    width: 25px;
    height: 25px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    > i {
        margin-left: 1px;
    }
}
</style>

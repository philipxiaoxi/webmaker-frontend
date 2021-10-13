<template>
    <div v-if="show" class="collDev-container" :class="{'collDev-container-close':open==false}">
        <div @click="open= !open" class="btn" :class="{'btn-close':open==true}"><i class="el-icon-arrow-up"></i></div>
        <div style="position: relative;height: 100%;">
            <div id="sayContainer">
                <div v-for="(item, i) in messages" v-bind:key="item.content + i">
                    <div v-if="item.name == '系统'">
                        <div style="font-size: 1em;text-align: center;color: grey;    margin: 5px;">{{item.content}}</div>
                    </div>
                    <div v-else-if="item.name != name" class="Othersay-con">
                        <div  class="Othersay">
                            <div class="tag">{{item.name}}:</div>
                            <div style="font-size: 1em;">{{item.content}}</div>
                            <div class="tra"></div>
                        </div>
                    </div>
                    <div v-else class="Mysay-con">
                        <div class="Mysay">
                            <div class="tag">{{name}}:</div>
                            <div style="font-size: 1em;">{{item.content}}</div>
                            <div class="tra2"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="input-container">
                <input class="xx-input" v-model="input" />
                <button @click="sendMessage(name,input)">发送</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            messages: [],
            input: '',
            open: false
        }
    },
    computed: {
        name() {
            return this.$store.state.userInfo.name == null ? '匿名' : this.$store.state.userInfo.name
        },
        token() {
            return this.$store.state.token.data
        }
    },
    mounted() {

    },
    methods: {
        initWebSocket(type = 'token', id) {
            if (type == 'token') {
                this.websocket = new WebSocket('wss://codeshare.xiaotao2333.top:344/ws?token=' + this.token)
            }
            if (type == 'id') {
                this.websocket = new WebSocket('wss://codeshare.xiaotao2333.top:344/ws?id=' + id)
            }
            this.websocket.onopen = () => {
                this.messages.push({
                    name: '系统',
                    content: '您的房间创建成功。您可以分享链接给其他伙伴进行协同开发。'
                })
                this.open = true
                this.sendMessage('firstSync', '')
            }
            // 接收到消息的回调方法
            this.websocket.onmessage = (event) => {
                const data = event.data.split('^&^')
                // 获取其他用户修改数据
                console.log(data)
                if (data[0] == 'sync') {
                    this.goSync(data[1])
                    return
                }
                if (data[0] == 'firstSyncReply') {
                    this.$emit('executefirstSync', JSON.parse(data[1]))
                    return
                }
                if (data[0] == 'firstSync') {
                    // 主人回复同步
                    if (this.$route.query.sync == null) {
                        this.$emit('firstSync')
                    }
                    return
                }
                this.messages.push({
                    name: data[0],
                    content: data[1]
                })
            }
            // 被关闭情况
            this.websocket.onclose = () => {
                this.messages.push({
                    name: '系统',
                    content: '您的连接已被关闭，可能是房间已解散。'
                })
            }
        },
        goSync(data) {
            data = JSON.parse(data)
            this.$emit('executeEdits', data)
        },
        closeWebSocket() {
            this.websocket.close()
            this.open = false
            this.messages = []
        },
        sendMessage(name, value) {
            this.websocket.send(name + '^&^' + value)
            if (name == 'sync' || name == 'firstSync' || name == 'firstSyncReply') {
                return
            }
            this.messages.push({
                name: name,
                content: value
            })
            this.input = ''
        }
    }
}
</script>

<style lang="less" scoped>
#sayContainer {
    height: calc(100% - 68px);
    overflow-y: scroll;
}
.Othersay-con {
    display: flex;
    flex-direction: row;
}
.collDev-container {
    text-align: left;
    position: absolute;
    height: 300px;
    width: 400px;
    bottom: 0px;
    right: 15px;
    background-color: antiquewhite;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    transition: all 0.3s;
    .btn {
        text-align: center;
        background-color: aliceblue;
        transition: all 0.3s;
    }
    .btn:hover {
        background-color: aquamarine;
    }
    .btn-close {
        transform: rotateX(180deg);
    }
}
.collDev-container-close {
    bottom: -280px;
}
.input-container {
    display: flex;
}
.input-container button{
    width:100px;
    height:50px;
    font-size: 20px;
}
.xx-input {
    width: 100%;
    font-size: 20px;
    outline: none;
}
.tag {
    font-size: 1.2em;
    margin: 5px 0px;
    color: green;
    font-weight: bolder;
}
.Othersay {
    background-color: whitesmoke;
    padding: 10px;
    margin: 10px;
    border-radius: 10px;
    position: relative;
}
.Mysay {
    background-color: #95ec69;
    padding: 10px;
    margin: 10px;
    border-radius: 10px;
    position: relative;
}

.Mysay-con {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
}
.tra {
    position: absolute;
    width: 0;
    height: 0;
    left: -10px;
    top: 50%;
    border-right: 10px solid whitesmoke;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
}
.tra2 {
    position: absolute;
    width: 0;
    height: 0;
    right: -10px;
    top: 50%;
    border-left: 10px solid #95ec69;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
}
</style>

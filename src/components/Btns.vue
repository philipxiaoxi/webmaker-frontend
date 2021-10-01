<template>
    <div>
        <div class="container">
            <div class="btns">
                <el-button type="primary" round size="mini" @click="dialogVisible = true">新建代码片段</el-button>
                <el-input size="mini" v-model="$parent.item.title" placeholder="请输入内容" style="width:200px;"></el-input>
                <div v-if="fileName!=''" class="status">您正在编辑:{{fileName}}</div>
                <el-tooltip id="code_pic" class="item" effect="dark" content="鼠标点击一下，Ctrl+V粘贴图片，自动获取代码首页大图" placement="top-start">
                    <i style="margin-left:10px;font-size: 20px;" class="el-icon-picture"></i>
                </el-tooltip>
                <el-button type="primary" round size="mini" @click="$parent.preview()">预览</el-button>
                <el-switch
                v-model="autoPreview"
                @change="autoPreviewChange"
                active-text="开启自动预览"
                inactive-text="关闭自动预览">
                </el-switch>
                <el-button type="primary" round size="mini"  @click="$parent.save()">保存</el-button>
                <el-button type="primary" round size="mini" @click="copyRealLink">复制直链</el-button>
                <el-button type="primary" round size="mini" @click="copyLink">复制链接</el-button>
                <el-popover
                    placement="top-start"
                    title="什么是协同开发"
                    width="200"
                    trigger="hover"
                    content="协同开发将会产生一个链接供您分享给其他用户进行开发，代码会互相同步显示。">
                    <el-switch
                    @change="synergyChange"
                    slot="reference"
                    style="display: block"
                    v-model="synergy"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-text="开启协同开发"
                    inactive-text="关闭协同开发">
                    </el-switch>
                </el-popover>
            </div>
            <!-- <div class="status">您正在编辑:{{fileName}}</div> -->
        </div>
        <!-- 新建项目弹窗 -->
        <new-project-dialog
        :dialogVisible.sync="dialogVisible"
        @handleClose='handleClose'
        @handleClick='handleClick'
        >
        </new-project-dialog>
        <!-- 虚拟容器配置页面 -->
        <el-dialog
        title="虚拟容器创建页面"
        :visible.sync="dockerDialogVisible"
        width="50%">
        <docker-manager></docker-manager>
        </el-dialog>
    </div>
</template>

<script>
import API from '../api/'
import common from '../util/common'
import DockerManager from '../views/DockerManager.vue'
import NewProjectDialog from './NewProjectDialog.vue'
export default {
    components: { NewProjectDialog, DockerManager },
    props: {
        fileName: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            synergy: false,
            dialogVisible: false,
            dockerDialogVisible: false,
            autoPreview: false
        }
    },
    mounted() {
        this.pasteEventListener()
    },
    methods: {
        /**
        * 监听图片按钮粘贴事件
        * @date 2021-06-12
        * @returns {any}
        */
        pasteEventListener() {
            // 粘贴获取截图
            const code_pic = document.getElementById('code_pic')
            code_pic.addEventListener('paste', (event) => {
                const items = event.clipboardData && event.clipboardData.items
                let file = null
                if (items && items.length) {
                    // 检索剪切板items
                    for (let i = 0; i < items.length; i++) {
                        if (items[i].type.indexOf('image') !== -1) {
                            file = items[i].getAsFile()
                            // 此时file就是剪切板中的图片文件
                            const code_pic_reader = new FileReader()
                            // 解析成base64格式
                            code_pic_reader.readAsDataURL(file)
                            code_pic_reader.onload = () => {
                                this.$parent.item.img = code_pic_reader.result
                                this.$message({
                                    message: '图片获取成功，请记得点击保存按钮。',
                                    type: 'success'
                                })
                            }
                            break
                        }
                    }
                }
            })
        },
        handleClose() {
            this.dialogVisible = false
        },
        copyLink() {
            const data = window.location.href
            if (common.copy(data)) {
                this.$message({
                    message: '复制成功。',
                    type: 'success'
                })
            }
        },
        copyRealLink() {
            const type = this.$parent.item.type
            let content = ''
            switch (type) {
            case 0:
                content = API.getServer() + 'common/SnippetHtml/' + this.$parent.item.id
                break
            case 1:
                content = API.getServer() + 'common/getSnippetProjectFile/' + this.$parent.item.id + '/index.html'
                break
            default:
                content = '┗|｀O′|┛ 嗷~~生成链接失败！帮你复制了主站链接：codeshare.diyxi.top'
            }
            if (common.copy(content)) {
                this.$message({
                    message: '复制成功。',
                    type: 'success'
                })
            }
        },
        handleClick(item, i) {
            console.log(item, i)
            switch (item.title) {
            case '单页应用':
                this.newCode('新建代码片段-' + new Date())
                break
            case '完整项目':
                this.newProjectCode('新建代码项目-' + new Date())
                break
            case '虚拟容器':
                this.dialogVisible = false
                this.dockerDialogVisible = true
                break
            default:
                this.$message.error('功能还在开发中')
                this.dialogVisible = false
                break
            }
        },
        newCode(title) {
            const content = this.$parent.getValue()
            this.axios(API.snippet.insertSnippet(title, content)).then(res => {
                this.$router.push({ path: '/editor', query: { id: res.data.data } })
                this.dialogVisible = false
                this.$parent.checkStatus()
            }).catch((e) => {
                this.$message.error(e)
            })
        },
        newProjectCode(title) {
            this.axios(API.snippetProject.insertSnippetProject(title)).then(res => {
                this.$router.push({ path: '/editor', query: { id: res.data.data } })
                this.dialogVisible = false
                this.$parent.checkStatus()
            }).catch((e) => {
                this.$message.error(e)
            })
        },
        synergyChange(value) {
            if (value) {
                this.$message({
                    message: '协同开发已开启，链接已复制。',
                    type: 'success'
                })
            } else {
                this.$message.error('协同开发已关闭。')
            }
        },
        autoPreviewChange(value) {
            if (value) {
                this.$emit('autoPreview', value)
                this.$message({
                    message: '自动预览已开启。',
                    type: 'success'
                })
            } else {
                this.$emit('autoPreview', value)
                this.$message.error('自动预览已关闭。')
            }
        }
    }
}
</script>

<style lang="less" scoped>
.container {
    display: flex;
    flex-direction: row;
    align-items: center;
    // justify-content: space-between;
    .status {
        margin-right: 20px;
        font-size: 14px;
        color: #909399;
    }
}
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

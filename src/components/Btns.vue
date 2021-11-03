<template>
    <div>
        <div ref="container" class="container">
            <div ref="btns" v-show="btnMode==1" class="btns">
                <el-button type="primary" round size="mini" @click="dialogVisible = true">新建代码片段</el-button>
                <el-input size="mini" v-model="$parent.item.title" placeholder="请输入内容" style="width:200px;"></el-input>
                <div v-if="fileName!=''" class="status">您正在编辑:{{fileName}}</div>
                <el-tooltip id="code_pic1" class="item" effect="dark" content="鼠标点击一下，Ctrl+V粘贴图片，自动获取代码首页大图" placement="top-start">
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
                <el-switch
                @change="synergyChange"
                style="display: block"
                v-model="synergy"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="开启协同开发"
                inactive-text="关闭协同开发">
                </el-switch>
            </div>

            <el-popover
            v-show="this.widths.length  != 0"
            placement="bottom-start"
            width="250"
            trigger="hover">
                <div class="status" slot="reference"><i class="el-icon-arrow-right"></i></div>
                <div ref="btnsPopover" class="btnsPopover">
                </div>
            </el-popover>
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
        },
        fileInfo: {
            type: Object,
            default: () => ({})
        },
        show: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            synergy: false,
            dialogVisible: false,
            dockerDialogVisible: false,
            autoPreview: false,
            btnMode: 1,
            widths: []
        }
    },
    mounted() {
        this.pasteEventListener()
        // this.initAutoBtnMode()
        window.addEventListener('resize', this.calcBtnWidth)
        this.calcBtnWidth()
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.calcBtnWidth)
    },
    methods: {
        initAutoBtnMode() {
            const UpdateBtnMode = () => {
                if (window.innerWidth < 1300) {
                    this.btnMode = 0
                } else {
                    this.btnMode = 1
                }
            }
            UpdateBtnMode()
            window.addEventListener('resize', () => {
                UpdateBtnMode()
            })
        },
        calcBtnWidth() {
            // 获取容器宽度
            let containerWidth = this.$refs.container.offsetWidth - 50
            // 获取按钮组宽度
            let btnsWidth = this.$refs.btns.offsetWidth
            // 获取按钮组子元素数量
            let btnsCount = this.$refs.btns.childElementCount
            // 剩余空间
            let rest = containerWidth - btnsWidth
            // 即将移除元素
            let willBeRemovedEle
            // 剩余空间小于0时
            while (rest < 0) {
                // 获取btns容器尾部一个元素
                willBeRemovedEle = this.$refs.btns.children[btnsCount - 1]
                // 记录宽度
                this.widths.push(willBeRemovedEle.offsetWidth)
                // 移除元素
                willBeRemovedEle.remove()
                // 添加到btns弹出层容器
                this.$refs.btnsPopover.appendChild(willBeRemovedEle)
                // 获取容器宽度
                containerWidth = this.$refs.container.offsetWidth - 50
                // 获取按钮组宽度
                btnsWidth = this.$refs.btns.offsetWidth
                // 获取按钮组子元素数量
                btnsCount = this.$refs.btns.childElementCount
                // 剩余空间
                rest = containerWidth - btnsWidth
            }
            // 剩余空间大于0时
            willBeRemovedEle = this.$refs.btnsPopover.children[this.$refs.btnsPopover.childElementCount - 1]
            if (!willBeRemovedEle) return
            // 当剩余空间大于元素宽度时
            while (rest > this.widths[this.widths.length - 1] + 20) {
                // 移除元素
                willBeRemovedEle.remove()
                // 加入到btns容器
                this.$refs.btns.appendChild(willBeRemovedEle)
                // 宽度出栈
                this.widths.pop()
                // 下一元素判断
                willBeRemovedEle = this.$refs.btnsPopover.children[this.$refs.btnsPopover.childElementCount - 1]
                // 获取容器宽度
                containerWidth = this.$refs.container.offsetWidth - 50
                // 获取按钮组宽度
                btnsWidth = this.$refs.btns.offsetWidth
                // 获取按钮组子元素数量
                btnsCount = this.$refs.btns.childElementCount
                // 剩余空间
                rest = containerWidth - btnsWidth
                // 元素为空时跳出循环
                if (!willBeRemovedEle) break
            }
        },
        /**
        * 监听图片按钮粘贴事件
        * @date 2021-06-12
        * @returns {any}
        */
        pasteEventListener() {
            // 粘贴获取截图
            const code_pic0 = document.getElementById('code_pic1')
            const code_pic = [code_pic0]
            for (const iterator of code_pic) {
                iterator.addEventListener('paste', (event) => {
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
            }
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
            this.$emit('synergyChange', value)
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
.btnsPopover {
    &>* {
        margin: 5px !important;
    }
    display: flex;
    flex-direction: column-reverse;
}
.container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
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
    flex-shrink: 0;
}
.btns-popover {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    &>* {
        margin: 5px;
    }
}
#code_pic0:focus{
    color: #409EFF;
}
#code_pic1:focus{
    color: #409EFF;
}
</style>

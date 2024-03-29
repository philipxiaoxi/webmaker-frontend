<template>
    <div class="container">
        <!-- 工具条按钮组 -->
        <btns ref="btns" :fileName="selectNode.label" @autoPreview="autoPreview" @synergyChange="synergyChange" :fileInfo="item" v-show="syncBtnShow" :synergy="synergyChangeValue"></btns>
        <div class="con">
            <!-- 代码编辑器 -->
            <vs-code ref="vscode" :class="{ 'xx-vscode': syncBtnShow, 'xx-vscode-sync': !syncBtnShow }"></vs-code>
            <!-- 收缩侧边栏 -->
            <div id="middle" class="xx-middle">⋮</div>
            <!-- 代码预览 -->
            <div :class="{ 'xx-preview': syncBtnShow, 'xx-preview-sync': !syncBtnShow }" style="position: relative;">
                <!--遮罩层 遮住iframe-->
                <div class="iframeDiv"></div>
                <preview ref="preview" style="height:100%;"></preview>
            </div>
        </div>
        <!-- 左边工具箱按钮 -->
        <div class="leftBtn" @click="drawer = !drawer"><i class="el-icon-caret-right"></i></div>
        <!-- 工具箱抽屉内容 -->
        <el-drawer
            title="文件管理器"
            :visible.sync="drawer"
            @opened='drawerOpen'
            direction="ltr"
            size='300px'
            :modal='false'>
            <files-manager :id="item.id" @click="setValue" ref="filesManager"></files-manager>
        </el-drawer>
        <!-- 右边工具箱按钮 -->
        <div class="rightBtn" @click="rightDrawer = !rightDrawer"><i class="el-icon-caret-left"></i></div>
        <!-- 工具箱抽屉内容 -->
        <el-drawer
            title="片段笔记"
            :visible.sync="rightDrawer"
            direction="rtl"
            size='50%'
            :modal='false'>
            <note v-model="item.note" height="99%" editType="wysiwyg"></note>
        </el-drawer>
        <coll-dev ref="colldev" @executeEdits="executeEdits" @executefirstSync='executefirstSync' :show="synergyChangeValue" @firstSync='firstSync'></coll-dev>
    </div>
</template>

<script>
import Preview from '../components/Preview.vue'
import VsCode from '../components/VsCode.vue'
import API from '../api/'
import Btns from '../components/Btns.vue'
import FilesManager from '../components/filesManager.vue'
import Note from '../components/Note.vue'
import common from '../util/common'
import CollDev from '../components/CollDev/CollDev.vue'
import MarkdownIt from 'markdown-it'

export default {
    components: { VsCode, Preview, Btns, FilesManager, Note, CollDev },
    data() {
        return {
            id: -1,
            drawer: false,
            rightDrawer: false,
            item: {},
            drawerOpenStatus: false,
            selectNode: { label: '' },
            synergyChangeValue: false,
            syncBtnShow: true
        }
    },
    deactivated() {
        document.title = 'WebMaker'
    },
    activated() {
        this.checkStatus()
        if (this.item.title) document.title = this.item.title + ' - WebMaker'
    },
    mounted() {
        this.init()
    },
    methods: {

        /**
         * 执行一次的初始化
         * 按键绑定
         * 开启自由调整鼠标拖拽事件监听
         * @Ahthor: xiaoxi
         */
        init() {
            // ctrl+s保存
            document.onkeydown = (event) => {
                const key = window.event.keyCode
                if (key == 83 && event.ctrlKey) { //= = 83 && event.ctrlKey
                    window.event.preventDefault() // 关闭浏览器快捷键
                    this.save()
                }
            }
            // 接收预览框反馈消息
            window.addEventListener('message', (e) => {
                const obj = e.data
                if (obj.line) {
                    this.$refs.vscode.monacoEditor.revealPositionInCenter({ lineNumber: obj.line, column: 0 })
                    const range = { startLineNumber: obj.line, startColumn: 0, endLineNumber: obj.line, endColumn: 10000 }
                    this.$refs.vscode.monacoEditor.setSelection(range)
                }
                if (obj.message) {
                    this.$message({
                        message: obj.message,
                        type: obj.type
                    })
                }
            }, false)
            const previewDebounce = common.debounce(this.preview, 500)
            this.$nextTick(() => {
            // 编辑器改变时监听事件
                this.$refs.vscode.monacoEditor.onDidChangeModelContent((event) => {
                    if (this.autoPreviewValue) {
                        previewDebounce()
                    }
                    if (this.synergyChangeValue && this.flag == false) {
                        // 构建同步数据 包含修改者姓名 修改数据 文件类型
                        const data = { name: this.$store.state.userInfo.name, data: event.changes, type: this.fileInfo != null ? this.fileInfo.type : 'html' }
                        // 发送同步数据
                        this.$refs.colldev.sendMessage('sync', JSON.stringify(data))
                    }
                    this.item.content = this.getValue()
                    this.flag = false
                })
            })
            this.dragControllerMiddle()
        },
        firstSync() {
            // 构建同步数据 包含修改者姓名 修改数据 文件类型
            const data = { name: this.$store.state.userInfo.name, data: this.getValue(), type: this.fileInfo != null ? this.fileInfo.type : 'html' }
            // 发送同步数据
            this.$refs.colldev.sendMessage('firstSyncReply', JSON.stringify(data))
        },
        /**
         * 检测当前编辑器打开状态
         * 如果是第一次打开则加载片段
         * 否则直接预览
         * @Ahthor: xiaoxi
         */
        async checkStatus() {
            // 启用同步
            if (this.$route.query.sync != null) {
                this.$message({
                    message: '您进入了协同开发模式。',
                    type: 'success'
                })
                this.$refs.colldev.initWebSocket('id', this.$route.query.sync)
                // this.fileInfo = { type: 'javascript' }
                this.syncBtnShow = false
                this.synergyChangeValue = true
                this.autoPreview(true)
            } else {
                this.syncBtnShow = true
                if (this.synergyChangeValue) {
                    this.$refs.colldev.closeWebSocket()
                    this.synergyChangeValue = false
                    this.autoPreview(false)
                }
            }
            // url模式
            if (this.$route.query.url != null) {
                console.log(this.$route.query.url)
                const data = (await this.axios(this.$route.query.url)).data
                this.selectNode = { label: '由url传入的代码片段无法保存，请新建代码片段。' }
                this.initPreview({ title: 'url片段加载' }, data)
                return
            }
            // 自家片段模式
            if (this.$route.query.id != null && this.$route.query.id != this.id) {
                this.id = this.$route.query.id
                this.axios(API.snippet.getSnippet(this.id)).then(res => {
                    if (res.data.data == null) {
                        this.$message.error('该代码片段已下架或者被删除！')
                    }
                    this.initPreview(res.data.data, res.data.data.content)
                }).catch((e) => {
                    console.log(e)
                })
            } else {
                this.preview()
            }
        },
        /**
         * 第一次片段加载
         * @Ahthor: xiaoxi
         * @param {*} item 片段详细信息
         * @param {*} content 片段代码内容
         */
        initPreview(item, content) {
            // 赋值片段信息
            this.item = item
            // 赋值到标题
            document.title = this.item.title + ' - WebMaker'
            console.log(this.item)
            // 赋值到编辑器
            this.$refs.vscode.monacoEditor.getModel().setValue(content)
            // 预览
            this.$refs.preview.goPreview(content)
            // 告知抽屉需要重新渲染
            this.drawerOpenStatus = false
            // 抽屉自动打开
            if (this.item.type == 1) {
                this.drawer = true
            } else {
                this.$refs.vscode.setModelLanguage('html')
                if (this.$refs.filesManager) {
                    this.$refs.filesManager.data = []
                    this.fileInfo = {}
                    this.selectNode = { label: '' }
                }
            }
        },
        /**
         * 设置编辑器内容并自动渲染
         * @Ahthor: xiaoxi
         * @param {*} data
         */
        setValue(data, selectNode) {
            this.selectNode = selectNode
            // 保存分析结果
            this.fileInfo = data
            // 赋值到编辑器
            this.$refs.vscode.monacoEditor.getModel().setValue(data.data)
            // 设置语言
            this.$refs.vscode.setModelLanguage(data.type)
            // 预览
            setTimeout(() => {
                this.preview()
            }, 100)
        },
        getValue() {
            return this.$refs.vscode.monacoEditor.getValue()
        },
        /**
         * 抽屉打开获取目录
         * @Ahthor: xiaoxi
         */
        drawerOpen() {
            // 获取片段结构
            if (!this.drawerOpenStatus && this.item.type == 1) {
                this.$refs.filesManager.getSnippetProject(this.item.id)
            }
            this.drawerOpenStatus = true
        },
        /**
         * 拖拽调整宽度
         * @Ahthor: xiaoxi
         */
        dragControllerMiddle() {
            // 总盒子
            const box = document.getElementsByClassName('con')[0]
            // 编辑器
            const editor = this.$refs.vscode.$el
            // 收缩侧边栏
            const resize = document.getElementById('middle')
            // 预览器
            const preview = document.getElementsByClassName('xx-preview')[0]
            // 收缩侧边栏1被鼠标按下
            resize.onmousedown = (e) => {
                this.changeIframeDivStyle('block')
                // 获取鼠标X坐标
                var startX = e.clientX
                // 获取收缩栏侧边距离 减去main下的padding宽度
                resize.left = resize.offsetLeft
                // 鼠标拖动事件
                document.onmousemove = function(e) {
                    // 结束时鼠标坐标
                    var endX = e.clientX
                    // 侧边栏位置+鼠标移动距离
                    var moveLen = resize.left + (endX - startX)
                    // 设置resize位置
                    resize.style.left = moveLen
                    // 设置div1的宽度
                    editor.style.width = moveLen + 'px'
                    // 设置div2的宽度
                    preview.style.width = (box.clientWidth - moveLen - 40) + 'px'
                }
                // 鼠标松开事件
                document.onmouseup = () => {
                    this.changeIframeDivStyle('none')
                    document.onmousemove = null
                    document.onmouseup = null
                    resize.releaseCapture && resize.releaseCapture() // 当你不在需要继续获得鼠标消息就要应该调用ReleaseCapture()释放掉
                }
                resize.setCapture && resize.setCapture() // 该函数在属于当前线程的指定窗口里设置鼠标捕获
                return false
            }
        },
        /**
         * 代码预览
         * @Ahthor: xiaoxi
         */
        async preview() {
            let content = this.$refs.vscode.value
            const type = this.fileInfo != null ? this.fileInfo.type : ''
            // typescript 编译为 JavaScript
            if (type === 'typescript') {
                this.$refs.preview.goPreview('<h1 style="text-align: center;line-height: 90vh;">正在编译typescript中……</h1>')
                content = await this.$refs.vscode.compileTypescript()
            }
            if (type === 'markdown') {
                content = new MarkdownIt().render(content)
            }
            this.$refs.preview.goPreview(content, type)
        },
        /**
         * 改变iframe遮罩显示
         * @Ahthor: xiaoxi
         * @param {*} display
         */
        changeIframeDivStyle(display) {
            var iframeDiv = document.getElementsByClassName('iframeDiv')
            iframeDiv[0].style.display = display
        },
        /**
         * 更新单页面代码片段
         * @Ahthor: xiaoxi
         * @param {*} value
         * @param {*} img
         */
        updateSnippet(value, img) {
            this.item.content = value
            this.item.img = img
            this.axios(API.snippet.updateSnippet(this.item)).then(() => {
                this.$message({
                    message: '保存成功！',
                    type: 'success'
                })
            }).catch((e) => {
                this.$message.error(e)
            })
        },
        /**
         * 更新项目里面的文件
         * @Ahthor: xiaoxi
         * @param {*} code
         * @param {*} img
         */
        projectFileSave(code, img) {
            if (this.$refs.filesManager.selectNode == null) {
                this.$message({
                    message: '没有任何文件被打开。',
                    type: 'info'
                })
                return
            }
            const pic_types = ['jpg', 'jpeg', 'png', 'gif']
            if (pic_types.indexOf(this.$refs.filesManager.fileType) > -1) {
                this.$message.error('图片只能预览，无法修改。')
                return
            }
            this.axios(API.snippetProject.updateSnippetProjectFile(this.$refs.filesManager.selectNode.path, code)).then(() => {
                if (this.$refs.filesManager.fileType == 'html') {
                    this.updateSnippet('', img)
                } else {
                    this.$message({
                        message: '文件保存成功！',
                        type: 'success'
                    })
                }
            }).catch((e) => {
                this.$message.error(e)
            })
        },
        /**
         * 保存修改函数
         * 判断当前片段类型执行对应的更新方法
         * @Ahthor: xiaoxi
         */
        save() {
            if (this.item.id == undefined) {
                this.$message.error('当前没有项目或单页应用被打开。')
                return
            }
            switch (this.item.type) {
            case 0:
                // 单页应用保存
                this.updateSnippet(this.$refs.vscode.monacoEditor.getModel().getValue(), this.item.img)
                break
            case 1:
                // 项目文件保存
                this.projectFileSave(this.$refs.vscode.monacoEditor.getModel().getValue(), this.item.img)
                break
            default:
                break
            }
        },
        autoPreview(value) {
            this.autoPreviewValue = value
        },
        synergyChange(value) {
            if (value) {
                this.$message({
                    message: '协同开发已开启，链接已复制。',
                    type: 'success'
                })
                const id = this.$store.state.userInfo.id
                common.copy(window.location.origin + '/#/editor?sync=' + id)
                this.$refs.colldev.initWebSocket()
                this.synergyChangeValue = true
            } else {
                this.$message.error('协同开发已关闭。')
                this.$refs.colldev.closeWebSocket()
                this.synergyChangeValue = false
            }
        },
        executeEdits(ops) {
            this.flag = true
            this.$refs.vscode.monacoEditor.executeEdits('insert-code', ops.data)
            this.$refs.vscode.setModelLanguage(ops.type)
            this.fileInfo == null ? this.fileInfo = { type: ops.type } : this.fileInfo.type = ops.type
        },
        executefirstSync(ops) {
            this.flag = true
            this.$refs.vscode.monacoEditor.setValue(ops.data)
            this.$refs.vscode.setModelLanguage(ops.type)
            this.fileInfo == null ? this.fileInfo = { type: ops.type } : this.fileInfo.type = ops.type
        }
    }
}
</script>

<style lang="less" scoped>
.xx-middle {
    cursor: col-resize;
    height: 100%;
    width: 20px;
}
.leftBtn {
    position: fixed;
    left: 0;
    top: 50%;
    width: 30px;
    height: 40px;
    background-color: #DCDFE6;
    line-height: 40px;
    border-top-right-radius: 25%;
    border-bottom-right-radius: 25%;
}
.rightBtn {
    position: fixed;
    right: 0;
    top: 50%;
    width: 30px;
    height: 40px;
    background-color: #DCDFE6;
    line-height: 40px;
    border-top-left-radius: 25%;
    border-bottom-left-radius: 25%;
}
.container {
    margin-top: 63px;
    position: relative;
    height: calc(100vh - 65px);
    overflow: hidden;
}
.con {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.xx-vscode {
    height:calc(100vh - 135px) !important;
    width:calc(50% - 25px);
    overflow: hidden;
}
.xx-vscode-sync {
    height:calc(100vh - 5px) !important;
    width:calc(50% - 25px);
    overflow: hidden;
}
.xx-preview {
    height:calc(100vh - 135px);
    width:calc(50% - 25px);
    overflow: hidden;
}
.xx-preview-sync {
    height:calc(100vh - 5px);
    width:calc(50% - 25px);
    overflow: hidden;
}
.iframeDiv {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 10;
    filter: alpha(opacity=0);
    opacity: 0;
    background: transparent;
    margin-top: 10px;
    display: none;
}
</style>

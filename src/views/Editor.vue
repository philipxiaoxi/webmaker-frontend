<template>
    <div class="container">
        <!-- 工具条按钮组 -->
        <btns></btns>
        <div class="con">
            <!-- 代码编辑器 -->
            <vs-code ref="vscode" class="xx-vscode"></vs-code>
            <!-- 收缩侧边栏 -->
            <div id="middle" class="xx-middle">⋮</div>
            <!-- 代码预览 -->
            <div  class="xx-preview" style="position: relative;">
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
            direction="ltr">
            <files-manager @click="setValue" ref="filesManager"></files-manager>
        </el-drawer>
    </div>
</template>

<script>
import Preview from '../components/Preview.vue'
import VsCode from '../components/VsCode.vue'
import API from '../api/'
import Btns from '../components/Btns.vue'
import FilesManager from '../components/filesManager.vue'
export default {
    components: { VsCode, Preview, Btns, FilesManager },
    data() {
        return {
            id: -1,
            drawer: false,
            item: {},
            drawerOpenStatus: false
        }
    },
    activated() {
        if (this.$route.query.id != null && this.$route.query.id != this.id) {
            this.id = this.$route.query.id
            this.axios(API.snippet.getSnippet(this.id)).then(res => {
                if (res.data.data == null) {
                    this.$message.error('该代码片段已下架或者被删除！')
                }
                // 赋值片段信息
                this.item = res.data.data
                // 赋值到编辑器
                this.$refs.vscode.monacoEditor.getModel().setValue(res.data.data.content)
                // 预览
                this.$refs.preview.goPreview(res.data.data.content)
                // 告知抽屉需要重新渲染
                this.drawerOpenStatus = false
            }).catch((e) => {
                console.log(e)
            })
        } else {
            this.preview()
        }
    },
    mounted() {
        this.dragControllerMiddle()
    },
    methods: {
        setValue(data) {
            // 赋值到编辑器
            this.$refs.vscode.monacoEditor.getModel().setValue(data.data)
            // 设置语言
            this.$refs.vscode.setModelLanguage(data.type)
            // 预览
            setTimeout(() => {
                this.preview()
            }, 100)
        },
        drawerOpen() {
            // 获取片段结构
            if (!this.drawerOpenStatus) {
                this.$refs.filesManager.getSnippetProject(this.item.id)
            }
            this.drawerOpenStatus = true
        },
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
        preview() {
            const base = `<base href="${API.getServer()}common/getSnippetProjectFile/${this.item.id}/" />`
            const content = this.$refs.vscode.value
            this.$refs.preview.goPreview(base + content)
        },
        changeIframeDivStyle(display) {
            var iframeDiv = document.getElementsByClassName('iframeDiv')
            iframeDiv[0].style.display = display
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
.container {
    margin-top: 70px;
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
}
.xx-preview {
    height:calc(100vh - 135px);
    width:calc(50% - 25px);
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

<template>
    <div @contextmenu.prevent='rightClick' style="height:100%">
        <el-tree :allow-drop="allowDrop" @node-drop="nodeDrop" draggable @node-contextmenu='rightClick' @node-click="handleTreeNodeClick"  :data="data" empty-text="单页网页没有目录内容">
            <span class="custom-tree-node" slot-scope="{ node,data }">
                <i v-if="data.type=='folder'" class="el-icon-folder"></i>
                <i v-if="data.type=='file'" class="el-icon-document"></i>
                <span>{{ node.label }}</span>
            </span>
        </el-tree>
        <!-- 通用右键菜单 -->
        <right-menu
        :menuShow='menuShow'
        :menuData="menuData"
        :x='menuX'
        :y='menuY'
        @rightMenuClick='rightMenuClick'
        ></right-menu>
        <!-- 通用对话框 -->
        <xx-dialog
        :title="dialogData.title"
        :dialogVisible="dialogData.dialogVisible"
        @click="dialogClick"
        @dialogCancel="dialogCancel"
        :fromData="dialogData.fromData"
        ></xx-dialog>
    </div>
</template>

<script>
import API from '../api/'
import common from '../util/common'
import RightMenu from './RightMenu.vue'
import XxDialog from './XxDialog.vue'
export default {
    components: { XxDialog, RightMenu },
    props: {
        id: {
            type: Number,
            default: -1
        }
    },
    data() {
        return {
            data: [],
            menuShow: false,
            menuData: [],
            menuX: 0,
            menuY: 0,
            dialogData: {
            },
            // 项目右键菜单
            menuData_project: [
                { title: '上传文件', click: '' },
                { title: '上传项目[?]', click: '' },
                { title: '新建文件', click: '' },
                { title: '新建文件夹', click: '' }
            ],
            // 目录右键菜单
            menuData_folder: [
                { title: '上传文件', click: '', icon: 'el-icon-upload2' },
                { title: '上传项目[?]', click: '', icon: 'el-icon-upload2' },
                { title: '新建文件', click: '', icon: 'el-icon-document' },
                { title: '新建文件夹', click: '', icon: 'el-icon-folder-add' },
                { title: '重命名', click: '', icon: 'el-icon-edit' },
                { title: '删除', click: '', icon: 'el-icon-document-delete' }
            ],
            // 文件右键菜单
            menuData_file: [
                { title: '重命名', click: '', icon: 'el-icon-edit' },
                { title: '复制直链', click: '', icon: 'el-icon-paperclip' },
                { title: '复制相对路径', click: '', icon: 'el-icon-paperclip' },
                { title: '生成标签代码', click: '', icon: 'el-icon-document' },
                { title: '删除', click: '', icon: 'el-icon-document-delete' }

            ]
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        /**
         * @Ahthor: xiaoxi
         * 初始化组件
         */
        init() {
            document.addEventListener('click', () => {
                this.menuShow = false
            })
        },
        /**
         * @Ahthor: xiaoxi
         * 获取代码片段结构
         * @param {*} id
         */
        getSnippetProject(id) {
            this.axios(API.snippetProject.getSnippetProject(id)).then(res => {
                if (res.data.data == null) {
                    this.data = []
                } else {
                    this.data = res.data.data.children
                }
            }).catch((e) => {
                this.$message.error(e)
            })
        },
        /**
         * @Ahthor: xiaoxi
         * 点击节点获取节点文件
         * @param {*} data
         */
        handleTreeNodeClick(data) {
            console.log(data)
            this.selectNode = data
            // 定义代码类型文档
            const code_types = ['css', 'javascript', 'html']
            // 定义图片类型文档
            const pic_types = ['jpg', 'jpeg', 'png', 'gif']
            const type = this.getFileType(data.label)
            this.fileType = type
            if (data.type == 'file') {
                // 判断是否为图片类文件
                if (pic_types.indexOf(type) > -1) {
                    const res = { data: `<img src="${data.path.substring(data.path.indexOf('/') + 1)}" />`, type: 'html' }
                    this.$emit('click', res, this.selectNode)
                    return
                }
                // 判断是否为代码类文件
                if (code_types.indexOf(type) < 0) {
                    this.$message({
                        message: data.label + '，该文件暂时不支持预览和加载。',
                        type: 'info'
                    })
                    return
                }
                this.axios(API.snippetProject.getSnippetProjectFile(data.path)).then(res => {
                    const data = { data: res.data, type: type }
                    this.$emit('click', data, this.selectNode)
                }).catch((e) => {
                    console.log(e)
                })
            }
        },
        /**
         * @Ahthor: xiaoxi
         * @param {*} fileName 文件名称
         * 传入文件名称，获取后缀
         */
        getFileType(fileName) {
            var type = fileName.split('.').pop()
            switch (type) {
            case 'js':
                return 'javascript'
            default:
                return type
            }
        },
        /**
         * @Ahthor: xiaoxi
         * 右键点击弹出菜单
         * @param {*} event 鼠标事件
         * @param {*} node 点击节点
         */
        rightClick(event, node) {
            this.menuX = event.clientX
            this.menuY = event.clientY
            this.menuShow = false
            if (node == null) {
                this.menuData = this.menuData_project
            } else {
                // 判断弹出菜单类型
                if (node.type == 'file') {
                    this.menuData = this.menuData_file
                } else {
                    this.menuData = this.menuData_folder
                }
            }

            this.menuShow = true
            // 保存右键选中节点
            this.rightClickSelectNode = node
        },
        /**
         * @Ahthor: xiaoxi
         * 菜单点击事件
         * @param {*} item 点击项目
         * @param {MouseEvent} event 鼠标事件
         */
        rightMenuClick(item, event) {
            console.log(item)
            switch (item.title) {
            case '新建文件':
                this.dialogData = {
                    type: '新建文件',
                    title: `在[${this.rightClickSelectNode ? this.rightClickSelectNode.label : '项目'}]下新建文件`,
                    dialogVisible: true,
                    fromData: [
                        {
                            placeholder: '新建文件名称',
                            value: '',
                            model: 'title'
                        }
                    ]
                }
                break
            case '新建文件夹':
                this.dialogData = {
                    type: '新建文件夹',
                    title: `在[${this.rightClickSelectNode ? this.rightClickSelectNode.label : '项目'}]下新建文件夹`,
                    dialogVisible: true,
                    fromData: [
                        {
                            placeholder: '新建文件夹名称',
                            value: '',
                            model: 'title'
                        }
                    ]
                }
                break
            case '重命名':
                this.dialogData = {
                    type: '重命名',
                    title: '重命名-' + this.rightClickSelectNode.label,
                    dialogVisible: true,
                    fromData: [
                        {
                            placeholder: '新文件名称',
                            value: this.rightClickSelectNode.label,
                            model: 'title'
                        }
                    ]
                }
                break
            case '删除':
                this.dialogData = {
                    type: '删除',
                    title: '真的要删除' + this.rightClickSelectNode.label + '吗？',
                    dialogVisible: true,
                    fromData: [
                    ]
                }
                break
            case '复制直链':
                this.doCopy(API.getServer() + 'common/getSnippetProjectFile/' + this.rightClickSelectNode.path)
                break
            case '复制相对路径':
                this.doCopy(this.getRelativePath(this.rightClickSelectNode.path))
                break
            case '生成标签代码':
                this.makeTag(this.rightClickSelectNode)
                break
            default:
                break
            }
        },
        /**
         * @Ahthor: xiaoxi
         * 生成标签代码
         * @param {*} node 节点
         */
        makeTag(node) {
            var type = node.label.split('.').pop()
            switch (type) {
            case 'jpg':
            case 'gif':
            case 'bmp':
            case 'png':
                this.doCopy(`<img src="${this.getRelativePath(this.rightClickSelectNode.path)}" />`)
                break
            case 'js':
                /* eslint-disable-next-line */
                        this.doCopy(`<script src="${this.getRelativePath(this.rightClickSelectNode.path)}"><\/script>`)
                break
            case 'css':
                this.doCopy(`<link href="${this.getRelativePath(this.rightClickSelectNode.path)}" rel="stylesheet" >`)
                break
            case 'html':
                /* eslint-disable-next-line */
                        this.doCopy(`<a href="${this.getRelativePath(this.rightClickSelectNode.path)}" >${node.label}<\/a>`)
                break
            default:
                break
            }
        },
        /**
         * @Ahthor: xiaoxi
         * 获取相对路径
         * @param {String} path 绝对路径
         */
        getRelativePath(path) {
            // 去除代码片段id
            var index = path.indexOf('/')
            var path2 = path.substring(index + 1)
            return path2
        },
        /**
         * @Ahthor: xiaoxi
         * 封装复制方法
         * @param {String} val 待复制数据
         */
        doCopy(val) {
            common.copy(val)
            this.$message({
                message: '复制成功',
                type: 'success'
            })
        },
        /**
         * 对话框取消事件
         * @Ahthor: xiaoxi
         */
        dialogCancel() {
            this.dialogData.dialogVisible = false
        },
        /**
         * 对话框点击事件
         * @Ahthor: xiaoxi
         * @param {*} form 表单数据
         */
        dialogClick(form) {
            let new_path
            switch (this.dialogData.type) {
            case '重命名':
                this.dialogData.dialogVisible = false
                new_path = this.rightClickSelectNode.path.substring(0, this.rightClickSelectNode.path.lastIndexOf('/') + 1) + form.title
                this.axios(API.snippetProject.SnippetProjectReName(this.rightClickSelectNode.path, new_path)).then(() => {
                    this.$message({
                        message: '重命名成功。',
                        type: 'success'
                    })
                    this.getSnippetProject(this.id)
                }).catch((e) => {
                    this.$message.error(e)
                })
                break
            case '删除':
                this.dialogData.dialogVisible = false
                new_path = this.rightClickSelectNode.path
                this.axios(API.snippetProject.SnippetProjectDelFile(new_path)).then(() => {
                    this.$message({
                        message: '删除成功。',
                        type: 'success'
                    })
                    // 更新树形框
                    this.getSnippetProject(this.id)
                }).catch((e) => {
                    this.$message.error(e)
                })
                break
            case '新建文件':
                this.dialogData.dialogVisible = false
                new_path = this.id
                if (this.rightClickSelectNode != null) {
                    new_path = this.rightClickSelectNode.path
                }
                this.axios(API.snippetProject.SnippetProjectNewFile(new_path, form.title)).then(() => {
                    this.$message({
                        message: '新建成功。',
                        type: 'success'
                    })
                    // 更新树形框
                    this.getSnippetProject(this.id)
                }).catch((e) => {
                    this.$message.error(e)
                })
                break
            case '新建文件夹':
                this.dialogData.dialogVisible = false
                new_path = this.id + '/' + form.title
                if (this.rightClickSelectNode != null) {
                    new_path = this.rightClickSelectNode.path + '/' + form.title
                }
                this.axios(API.snippetProject.SnippetProjectNewDirectory(new_path)).then(() => {
                    this.$message({
                        message: '新建成功。',
                        type: 'success'
                    })
                    // 更新树形框
                    this.getSnippetProject(this.id)
                }).catch((e) => {
                    this.$message.error(e)
                })
                break
            default:
                break
            }
        },
        /**
         * 判断是否允许拖拽放入
         * @Ahthor: xiaoxi
         * @param {*} darggingNode
         * @param {*} dropNode
         * @param {*} type
         */
        allowDrop(darggingNode, dropNode, type) {
            if (dropNode.data.type == 'file') {
                return type == 'next'
            } else {
                return type
            }
        },
        nodeDrop(darggingNode, dropNode, type) {
            let path = ''
            let new_path = ''
            if (type == 'inner') {
                console.log(darggingNode.data.path, dropNode.data.path + darggingNode.data.path.substring(darggingNode.data.path.lastIndexOf('/')), type)
                path = darggingNode.data.path
                new_path = dropNode.data.path + darggingNode.data.path.substring(darggingNode.data.path.lastIndexOf('/'))
            } else {
                console.log(darggingNode.data.path, dropNode.data.path.substring(0, dropNode.data.path.lastIndexOf('/')) + darggingNode.data.path.substring(darggingNode.data.path.lastIndexOf('/')), type)
                path = darggingNode.data.path
                new_path = dropNode.data.path.substring(0, dropNode.data.path.lastIndexOf('/')) + darggingNode.data.path.substring(darggingNode.data.path.lastIndexOf('/'))
            }
            this.axios(API.snippetProject.SnippetProjectMoveFile(path, new_path)).then(() => {
                this.$message({
                    message: '移动成功。',
                    type: 'success'
                })
                // 更新树形框
                this.getSnippetProject(this.id)
            }).catch((e) => {
                this.$message.error(e)
            })
        }
    }
}
</script>

<style>

</style>

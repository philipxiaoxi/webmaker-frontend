<template>
    <div>
        <el-tree @node-contextmenu='rightClick' @node-click="handleTreeNodeClick"  :data="data" empty-text="单页网页没有目录内容">
            <span class="custom-tree-node" slot-scope="{ node,data }">
                <i v-if="data.type=='folder'" class="el-icon-folder"></i>
                <i v-if="data.type=='file'" class="el-icon-document"></i>
                <span>{{ node.label }}</span>
            </span>
        </el-tree>
        <el-menu
            v-show="menuShow"
            id="menu"
            text-color="#000"
            active-text-color="#000"
            style="background-color: #f2f3f5;text-align:left;"
        >
            <el-menu-item @click="rightMenuClick(item)" v-for="(item) in menuData" class="menuItem" v-bind:key="item.title">
                <span slot="title"><i :class="item.icon"></i>{{item.title}}</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
import API from '../api/'
import common from '../util/common'
export default {
    data() {
        return {
            data: [],
            menuShow: false,
            menuData: [],
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
                    this.$emit('click', res)
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
                    this.$emit('click', data)
                }).catch((e) => {
                    console.log(e)
                })
            }
        },
        /**
         * @Ahthor: xiaoxi
         * @param {*} fileName
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
         * @param {*} event
         * @param {*} data
         */
        rightClick(event, data) {
            // 判断弹出菜单类型
            if (data.type == 'file') {
                this.menuData = this.menuData_file
            } else {
                this.menuData = this.menuData_folder
            }
            this.openMenu()
            // 保存右键选中节点
            this.rightClickSelectNode = data
        },
        /**
         * @Ahthor: xiaoxi
         * 打开菜单显示
         */
        openMenu() {
            this.menuShow = true// 让菜单显示
            const menu = document.querySelector('#menu')
            /* 菜单定位基于鼠标点击位置 */
            menu.style.position = 'fixed'
            menu.style.left = event.clientX + 'px'
            menu.style.top = event.clientY + 'px'
            menu.style.width = '150px'
        },
        /**
         * @Ahthor: xiaoxi
         * 菜单点击事件
         * @param {*} item
         */
        rightMenuClick(item) {
            console.log(item)
            switch (item.title) {
            case '新建文件':
                break
            case '新建文件夹':
                break
            case '重命名':
                break
            case '删除':
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
         * @param {*} node
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
         * @param {*} path
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
         * @param {*} val
         */
        doCopy(val) {
            common.copy(val)
            this.$message({
                message: '复制成功',
                type: 'success'
            })
        }
    }
}
</script>

<style>

</style>

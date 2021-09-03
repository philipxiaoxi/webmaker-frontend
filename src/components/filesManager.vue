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
        init() {
            document.addEventListener('click', () => {
                this.menuShow = false
            })
        },
        // 获取代码片段结构
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
        // 传入文件名称，获取后缀
        getFileType(fileName) {
            var type = fileName.split('.').pop()
            switch (type) {
            case 'js':
                return 'javascript'
            default:
                return type
            }
        },
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
        openMenu() {
            this.menuShow = true// 让菜单显示
            const menu = document.querySelector('#menu')
            /* 菜单定位基于鼠标点击位置 */
            menu.style.position = 'fixed'
            menu.style.left = event.clientX + 'px'
            menu.style.top = event.clientY + 'px'
            menu.style.width = '150px'
        },
        rightMenuClick(item) {
            console.log(item)
        }
    }
}
</script>

<style>

</style>

<template>
    <div>
        <el-tree @node-click="handleTreeNodeClick"  :data="data" empty-text="单页网页没有目录内容">
            <span class="custom-tree-node" slot-scope="{ node,data }">
                <i v-if="data.type=='folder'" class="el-icon-folder"></i>
                <i v-if="data.type=='file'" class="el-icon-document"></i>
                <span>{{ node.label }}</span>
            </span>
        </el-tree>
    </div>
</template>

<script>
import API from '../api/'
export default {
    data() {
        return {
            data: []
        }
    },
    methods: {
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
        }
    }
}
</script>

<style>

</style>

<template>
    <div>
        <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        :width="width"
        :before-close="handleClose"
        :modal-append-to-body='false'
        >
        <div class="xx-snippet-select-container-flex">
            <div @click="selectClick(item,i)" v-for="(item, i) in list" :key="item.title" :style="{backgroundColor: index==i?'aliceblue':''}">
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
                <div class="tag">{{item.tag}}</div>
            </div>
        </div>
        <div class="py-10">
            <el-alert   title="虚拟容器开发现已升级，将不再此处新建。请在编辑页面工具栏进入。" type="info" :closable="false"></el-alert>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="handleClick()">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: '新建代码片段'
        },
        width: {
            type: String,
            default: '600px'
        },
        dialogVisible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            index: 0,
            item: {
                title: '单页应用',
                tag: '单页应用是只有一个html文件供您编写，适合撰写片段代码和demo案例。',
                icon: 'el-icon-document'
            },
            list: [
                {
                    title: '单页应用',
                    tag: '单页应用是只有一个html文件供您编写，适合撰写片段代码和demo案例。',
                    icon: 'el-icon-document'
                },
                {
                    title: '完整项目',
                    tag: '完整项目具有目录管理器功能，您可以开发多文件的前端项目。',
                    icon: 'el-icon-folder'
                }
                // {
                //     title: '虚拟容器',
                //     tag: '由codeshare管控的虚拟容器可以让你在web上开发任何语言。',
                //     icon: 'el-icon-coin'
                // }
            ]
        }
    },
    methods: {
        handleClose() {
            this.$emit('handleClose')
        },
        handleClick() {
            this.$emit('handleClick', this.item, this.index)
        },
        selectClick(item, i) {
            this.index = i
            this.item = item
        }
    }
}
</script>

<style lang="less" scoped>
.xx-snippet-select-container-flex {
    display: flex;
    i {
        font-size: 50px;
    }
    span {
        display: block;
        margin: 10px 0px;
        font-size: 18px;
        font-weight:bolder;
        user-select:none;
    }
    .tag {
        text-align: justify;
        user-select:none;
    }
    &>div {
        padding: 20px;
        cursor: pointer;
        transition: all 0.3s;
    }
    &>div:active {
        transform: scale(0.9);
    }
}
</style>

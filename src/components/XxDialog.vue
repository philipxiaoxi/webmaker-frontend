<template>
    <div>
        <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        :width="width"
        :before-close="handleClose">
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClick">取 消</el-button>
            <el-button type="primary" @click="handleClick">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: '默认标题'
        },
        width: {
            type: String,
            default: '30%'
        },
        dialogVisible: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        handleClick() {
            this.$emit('click')
        },
        handleClose() {}
    }
}
</script>

<style>

</style>

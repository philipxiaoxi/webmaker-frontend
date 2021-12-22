<template>
    <div>
        <el-dialog
        title="预览"
        :visible.sync="visible"
        width="60%"
        @close='beforeClose'
        >
        <Preview :item='item' ref="preview" style="height:55vh;"></Preview>
        <span slot="footer" class="dialog-footer">
            <!-- <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="close">确 定</el-button> -->
        </span>
        </el-dialog>
    </div>
</template>

<script>
import Preview from './Preview.vue'
import API from '../api/'
export default {
    name: 'SquareTools',
    components: { Preview },
    props: {
        dialogVisible: {
            type: Boolean,
            default: false
        },
        item: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            visible: false
        }
    },
    computed: {
    },
    watch: {
        dialogVisible() {
            this.visible = this.dialogVisible
        },
        item() {
            this.goPreview(this.item)
        }
    },
    methods: {
        close() {
            this.$emit('update:dialogVisible', false)
        },
        beforeClose() {
            this.$emit('update:dialogVisible', false)
        },
        async goPreview(item) {
            let url = ''
            switch (item.type) {
            case 0:
                url = API.getServer() + 'common/SnippetHtml/' + this.$parent.item.id
                break
            case 1:
                url = API.getServer() + 'common/getSnippetProjectFile/' + this.$parent.item.id + '/index.html'
                break
            default:
                url = ''
            }
            const res = await this.axios({ url: url })
            console.log(res.data)
            this.$refs.preview.goPreview(res.data, 'html')
        }
    }
}
</script>

<style lang="less" scoped>

</style>

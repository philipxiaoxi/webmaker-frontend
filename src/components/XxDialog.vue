<template>
    <div>
        <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        :width="width"
        :before-close="handleClose"
        :modal-append-to-body='false'
        >
        <xx-input v-for="item in fromData" v-bind:key="item.placeholder"  :placeholder='item.placeholder' v-model="form[item.model]"></xx-input>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="handleClick">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
import XxInput from './XxInput.vue'
export default {
    components: { XxInput },
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
        },
        fromData: {
            type: Array,
            default: () => ([])
        }
    },
    watch: {
        /**
         * 初始化默认数据
         * @Ahthor: xiaoxi
         */
        fromData() {
            for (const item of this.fromData) {
                this.form[item.model] = item.value
            }
        }
    },
    data() {
        return {
            form: {}
        }
    },
    methods: {
        /**
         * 点击事件
         * @Ahthor: xiaoxi
         */
        handleClick() {
            this.$emit('click', this.form)
        },
        /**
         * 取消事件
         * @Ahthor: xiaoxi
         */
        handleClose() {
            this.$emit('dialogCancel')
        }
    }
}
</script>

<style>

</style>

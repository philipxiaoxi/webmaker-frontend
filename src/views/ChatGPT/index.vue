<template>
    <div :class="$style['review-container']">
    <el-dialog
        title="你想实现什么需求？"
        :visible.sync="dialogVisible"
        :modal-append-to-body='false'
        width="600px"
    >
        <el-form>
            <el-form-item label="askiweb token">
                <el-input
                    v-model="token"
                    placeholder="输入你的askiweb token"
                >
                </el-input>
            </el-form-item>
            <div>
                <el-button size="mini" @click="addText('html')">HTML网页</el-button>
                <el-button size="mini" @click="addText('markdown')">markdown文档</el-button>
                <el-button size="mini" @click="addText('javascript')">javascript代码</el-button>
            </div>
            <el-form-item label="需求">
                <el-input
                    type="textarea"
                    v-model="textareaContent"
                    :placeholder="textareaPlaceholder"
                    :rows="10"
                >
                </el-input>
            </el-form-item>
        </el-form>
        <div slot="footer">
            <el-button @click="$emit('update:dialogVisible', false)">取消</el-button>
            <el-button type="primary" @click="submit">确定</el-button>
        </div>
    </el-dialog>

    </div>
</template>

<script>
import { loadStorage } from '@/util/LocalStorage'

export default {
    name: 'ChatGPTDialog',
    props: {
        dialogVisible: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    data() {
        return {
            token: '',
            textareaContent: '',
            textareaPlaceholder: '输入你想要的网页页面结构以及功能'
        }
    },
    mounted() {
        loadStorage('otherSettingForm').then(otherSettingForm => {
            if (otherSettingForm) this.token = otherSettingForm.askiwebToken
        })
    },
    methods: {
        submit() {
            // 在这里处理提交逻辑
            // 获取用户输入的内容：this.textareaContent
            this.$emit('submit', this.textareaContent, this.token)
        },
        handleClose() {
            this.$emit('updateDialogReviewVisible')
        },
        addText(type) {
            if (type === 'html') this.textareaContent += '请直接返回html网页代码，不要任何解释和其他说明。'
            if (type === 'markdown') this.textareaContent += '请直接返回markdown格式文本。'
            if (type === 'javascript') this.textareaContent += '请直接返回javascript代码，不要任何解释和其他说明。'
        }
    }
}
</script>
<style lang="less" module>
.review-container {
    text-align: left;
}
</style>

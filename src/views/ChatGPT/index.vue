<template>
    <div :class="$style['review-container']">
    <el-dialog
        title="你想实现什么需求？"
        :visible="visible"
        :before-close="handleClose"
        :modal-append-to-body='false'
        width="600px"
    >
        <el-form>
            <el-form-item label="服务提供商">
                <el-select style="    width: 100%;" v-model="server" placeholder="请选择服务提供商">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :disabled="item.disabled"
                        :value="item.value"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="key">
                <el-input
                    v-model="token"
                    type="password"
                    show-password
                    placeholder="输入你的key或者token"
                >
                </el-input>
            </el-form-item>
            <div  style="margin-bottom: 10px;">
                <span style="margin-right: 10px;">带上当前代码编辑器内容</span>
                <el-switch v-model="withCode"></el-switch>
            </div>
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
            <el-button @click="$emit('update:visible', false)">取消</el-button>
            <el-button type="primary" @click="submit">确定</el-button>
        </div>
    </el-dialog>

    </div>
</template>

<script>
import { loadStorage, saveStorage } from '@/util/LocalStorage'

export default {
    name: 'ChatGPTDialog',
    props: {
        visible: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    data() {
        return {
            token: '',
            textareaContent: '',
            textareaPlaceholder: '输入你想要的网页页面结构以及功能',
            server: 'aigptx',
            withCode: true,
            options: [
                {
                    value: 'aigptx',
                    label: 'aigptx',
                    disabled: false
                },
                {
                    value: 'aski',
                    label: 'aski',
                    disabled: false
                },
                {
                    value: 'webmaker',
                    label: 'webmaker官方（正在开发）',
                    disabled: true
                }
            ]
        }
    },
    mounted() {
        loadStorage('otherSettingForm').then(otherSettingForm => {
            if (otherSettingForm) {
                this.token = otherSettingForm.token
                this.server = otherSettingForm.server || 'aigptx'
            }
        })
    },
    methods: {
        submit() {
            // 在这里处理提交逻辑
            // 获取用户输入的内容：this.textareaContent
            const { token, server, textareaContent, withCode } = this
            saveStorage({ token, server }, 'otherSettingForm')
            this.$emit('submit', {
                token, server, textareaContent, withCode
            })
        },
        addText(type) {
            if (type === 'html') this.textareaContent += '请直接返回html网页代码，不要任何解释和其他说明。'
            if (type === 'markdown') this.textareaContent += '请直接返回markdown格式文本。'
            if (type === 'javascript') this.textareaContent += '请直接返回javascript代码，不要任何解释和其他说明。'
        },
        handleClose() {
            this.$emit('update:visible', false)
        }
    }
}
</script>
<style lang="less" module>
.review-container {
    text-align: left;
}
</style>

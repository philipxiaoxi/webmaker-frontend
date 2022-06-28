<template>
    <div style="height:100%;width: 100%;">
        <div :class="$style.editor"></div>
    </div>
</template>

<script>
import Editor from '@toast-ui/editor'
import ToastUIEditorViewer from '@toast-ui/editor/dist/toastui-editor-viewer'
import '@toast-ui/editor/dist/toastui-editor.css' // Editor's Style

export default {
    name: 'Note',
    components: {},
    props: {
        value: {
            type: String,
            default: ''
        },
        preview: {
            type: Boolean,
            default: false
        },
        height: {
            type: String,
            default: 'auto'
        },
        mode: {
            type: String,
            default: 'vertical'
        },
        editType: {
            type: String,
            default: 'markdown'
        }
    },
    data() {
        return {
            content: '',
            editorOption: {},
            editor: null
        }
    },
    computed: {
    },
    watch: {
        value: {
            handler: function(newVal, oldVal) {
                const content = this.editor.getMarkdown ? this.editor.getMarkdown() : ''
                if (newVal != content) {
                    this.editor.setMarkdown(this.value)
                }
            }
        }
    },
    mounted() {
        this.init()
    },
    beforeDestroy() {
        this.editor.destroy()
    },
    methods: {
        init() {
            this.editor = this.preview ? this.initPreview() : this.initEditor()
            this.editor.setMarkdown(this.value)
        },
        initEditor() {
            return new Editor({
                el: this.$el.querySelector(`.${this.$style.editor}`),
                height: this.height,
                initialEditType: this.editType,
                previewStyle: this.mode,
                minHeight: '200px',
                placeholder: '点击此处输入内容',
                events: {
                    change: () => {
                        this.$emit('input', this.editor.getMarkdown())
                    }
                }
            })
        },
        initPreview() {
            return new ToastUIEditorViewer({
                el: this.$el.querySelector(`.${this.$style.editor}`),
                height: this.height,
                initialEditType: 'markdown'
            })
        }
    }
}
</script>

<style lang="less" module>
.editor {
    text-align: left;
}
</style>

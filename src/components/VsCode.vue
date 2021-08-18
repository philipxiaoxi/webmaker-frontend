<template>
    <div >
        <div style="width:100%;height:100%;" ref="container" class="xx-editor" ></div>
    </div>
</template>

<script>
import * as monaco from 'monaco-editor'
export default {
    data() {
        return {
            monacoEditor: null,
            value: ''
        }
    },
    mounted() {
        this.initEditor()
    },
    methods: {
        initEditor() {
            // DOM进行操作的nextTick
            this.$nextTick(function() {
                this.monacoEditor = monaco.editor.create(this.$refs.container, {
                    language: 'html',
                    value: this.value,
                    theme: 'vs',
                    automaticLayout: true
                })
                this.monacoEditor.onDidChangeModelContent(() => {
                    this.throttle(() => {
                        this.value = this.monacoEditor.getModel().getValue()
                    }, 100)
                })
            })
        },
        throttle(method, time) {
            clearTimeout(this.timer)
            this.timer = setTimeout(method, time)
        },
        setModelLanguage(type) {
            monaco.editor.setModelLanguage(this.monacoEditor.getModel(), type)
        }
    }
}
</script>

<style lang="less" scoped>
.xx-editor {
    text-align: left;
}
</style>

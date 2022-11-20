<template>
    <div >
        <div style="width:100%;height:100%;" ref="container" class="xx-editor" ></div>
    </div>
</template>

<script>
import * as monaco from 'monaco-editor'
import jsProposals from '../config/jsProposals'
import htmlProposals from '../config/htmlProposals'
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
                // 设置严格模式 但好像是失效的 正在测试中
                monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
                    allowNonTsExtensions: true,
                    strictNullChecks: true
                })
                monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
                    allowNonTsExtensions: true,
                    strictNullChecks: true
                })
                monaco.languages.registerCompletionItemProvider('javascript', {
                    provideCompletionItems: function(model, position) {
                        return {
                            suggestions: jsProposals.getProposals(monaco)
                        }
                    }
                })
                monaco.languages.registerCompletionItemProvider('html', {
                    provideCompletionItems: function(model, position) {
                        return {
                            suggestions: htmlProposals.getProposals(monaco)
                        }
                    }
                })
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
        },
        async compileTypescript() {
            const uri = this.monacoEditor.getModel().uri
            return monaco.languages.typescript.getTypeScriptWorker()
                .then(
                    worker => worker(uri)
                        .then(client => client.getEmitOutput(uri.toString()))
                        .then(res => res.outputFiles[0].text)
                )
        }
    }
}
</script>

<style lang="less" scoped>
.xx-editor {
    text-align: left;
}
</style>

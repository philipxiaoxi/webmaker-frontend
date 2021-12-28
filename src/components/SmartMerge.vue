<template>
    <div>
        <p class="p-10 my-20" v-text="intro">

        </p>
        <div>
            <el-button @click="merge">智慧合并片段</el-button>
        </div>
        <div class="flex-row my-20">
            <vs-code class="vscode" ref="vscode"></vs-code>
            <vs-code class="vscode" ref="vscode2"></vs-code>
        </div>
    </div>
</template>

<script>
import VsCode from './VsCode.vue'
import SmartMerge from '../util/SmartMerge'
export default {
    name: 'SmartMerge',
    components: { VsCode },
    props: {
        top: {
            type: Number,
            default: 0
        },
        left: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            visible: false,
            intro: '实验性新特性在此你可以提前感受到，下面是新功能片段合并的测试区域。使用<wm:include file="被引入片段绝对地址"></wm:include>'
        }
    },
    computed: {
    },
    watch: {

    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            this.$nextTick(() => {
                this.$refs.vscode.monacoEditor.getModel().setValue(
                    `<!-- 代码片段合并实验性 -->
<!-- 引入轮播图 -->
<wm:include file="https://www.xiaotao2333.top:5885/common/getSnippetProjectFile/131/轮播类/carousel2.html"></wm:include>
<!-- 引入卡片 -->
<wm:include file="https://www.xiaotao2333.top:5885/common/getSnippetProjectFile/131/卡片类/card.html"></wm:include>
`)
            })
        },
        merge() {
            const sm = new SmartMerge(this.$refs.vscode.monacoEditor.getModel().getValue(), this.showResult)
            console.log(sm.labels)
        },
        showResult(res) {
            this.$refs.vscode2.monacoEditor.getModel().setValue(res)
        }
    }
}
</script>

<style lang="less" scoped>
.vscode {
    width: 50%;
    height: 600px;
}
</style>

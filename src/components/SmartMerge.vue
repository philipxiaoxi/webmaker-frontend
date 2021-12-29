<template>
    <div>
        <p class="p-10 my-20" v-text="intro"></p>
        <div>
            <el-button @click="merge">智慧合并片段</el-button>
        </div>
        <div class="flex-row my-20" >
            <el-tabs type="border-card" style="width:100%;">
                <el-tab-pane label="编辑低代码" >
                    <vs-code
                        ref="vscode"
                        style="width:100%;height:500px;"
                    ></vs-code>
                </el-tab-pane>
                <el-tab-pane label="生成预览">
                    <div class="flex-row my-20">
                        <vs-code class="vscode" ref="vscode2"></vs-code>
                        <preview
                            :item="{ id: 0 }"
                            style="width:50%;"
                            ref="preview"
                        ></preview>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="可视化拖拽">
                    <div class="flex-row">
                        <div style="width:50%;">
                            <ul class="sections">
                                <li draggable @dragstart="drag($event, 'flex-1-1')">布局(元素垂直放置)</li>
                                <li draggable @dragstart="drag($event, 'flex-1-2')">布局(元素横向放置)</li>
                                <li draggable @dragstart="drag($event, 'img')">图片(宽高100%)</li>
                                <li draggable @dragstart="drag($event, 'btn')">按钮</li>
                            </ul>
                        </div>
                        <div container='stage' class="stage" @drop="drop($event)" @dragover="allowDrop($event)">

                        </div>
                    </div>

                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import VsCode from './VsCode.vue'
import SmartMerge from '../util/SmartMerge'
import Preview from './Preview.vue'
export default {
    name: 'SmartMerge',
    components: { VsCode, Preview },
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
            intro:
                '实验性新特性在此你可以提前感受到，下面是新功能片段合并的测试区域。使用<wm:include file="被引入片段绝对地址"></wm:include>'
        }
    },
    computed: {},
    watch: {},
    mounted() {
        this.init()
    },
    methods: {
        init() {
            this.$nextTick(() => {
                /* eslint-disable */
                this.$refs.vscode.monacoEditor.getModel().setValue(
                    `<!-- 代码片段合并实验性 -->
<link rel="stylesheet" href="https://www.xiaotao2333.top:5885/common/getSnippetProjectFile/131/基础样式/base.css">
<!-- 引入轮播图 -->
<wm:include file="https://www.xiaotao2333.top:5885/common/getSnippetProjectFile/131/轮播类/carousel2.html"></wm:include>
<!-- 引入卡片 -->
<wm:include file="https://www.xiaotao2333.top:5885/common/getSnippetProjectFile/131/卡片类/card.html"></wm:include>

<style></style>
<script><\/script> 
`
                ); /* eslint-enable */
            })
        },
        merge() {
            const sm = new SmartMerge(
                this.$refs.vscode.monacoEditor.getModel().getValue(),
                this.showResult
            )
            console.log(sm.labels)
        },
        showResult(res) {
            this.$refs.vscode2.monacoEditor.getModel().setValue(res)
            this.$refs.preview.goPreview(res)
        },
        drag(event, type) {
            event.dataTransfer.setData('type', type)
        },
        allowDrop(event) {
            event.preventDefault()
        },
        drop(event) {
            event.preventDefault()
            const div = document.createElement('div')
            div.draggable = 'true'
            div.style.position = 'relative'
            const type = event.dataTransfer.getData('type')
            if (type == 'flex-1-1') {
                div.classList.add('flex-column')
                div.classList.add('ai-center')
                div.classList.add('jc-center')
                div.style.margin = '20px'
                div.style.border = 'dashed 1px grey'
                div.style.padding = '20px'
            }
            if (type == 'flex-1-2') {
                div.classList.add('flex-row')
                div.classList.add('ai-center')
                div.classList.add('jc-center')
                div.style.margin = '20px'
                div.style.border = 'dashed 1px grey'
                div.style.padding = '20px'
            }
            if (type == 'img') {
                const img = document.createElement('img')
                img.style.width = '100%'
                img.style.height = '100%'
                img.src = 'https://sdfsdf.dev/300x300.png'
                div.appendChild(img)
            }
            if (type == 'btn') {
                const btn = document.createElement('button')
                btn.innerText = '默认按钮'
                div.appendChild(btn)
            }
            div.onmouseenter = (event) => {
                div.style.border = 'dotted 4px red'
                div.parentNode.style.border = 'dashed 1px grey'
            }
            div.onmouseleave = (event) => {
                div.style.border = 'dashed 1px grey'
                if (div.parentNode.getAttribute('container') != 'stage') {
                    div.parentNode.style.border = 'dotted 4px red'
                }
            }
            const childs = event.target.children
            const mouseXY = { offsetX: event.offsetX, offsetY: event.offsetY }
            let minXY = 9999
            let dom = null
            for (const child of childs) {
                const chlidXY = { offsetX: child.offsetLeft, offsetY: child.offsetTop }
                console.log(chlidXY, mouseXY)
                const XY = Math.abs(mouseXY.offsetX - chlidXY.offsetX) + Math.abs(mouseXY.offsetY - chlidXY.offsetY)
                console.log(Math.abs(mouseXY.offsetX - chlidXY.offsetX), Math.abs(mouseXY.offsetY - chlidXY.offsetY))
                if (XY < minXY) {
                    minXY = XY
                    dom = child
                }
            }
            // 此处得出最靠近鼠标的DOM
            if (dom != null) {
                // 如果是比最靠近的DOMY轴小，则在上面插入
                if (dom.offsetTop - event.offsetY > 0 || dom.offsetLeft - event.offsetX > 0) {
                    event.target.insertBefore(div, dom)
                } else {
                    this.insertAfter(div, dom)
                }
            } else {
                event.target.appendChild(div)
            }
        },
        insertAfter(newelement, targetelement) {
            var parentelement = targetelement.parentNode
            if (parentelement.lastChild == targetelement) {
                parentelement.appendChild(newelement)
            } else {
                parentelement.insertBefore(newelement, targetelement.nextSilbing)
            }
        }

    }
}
</script>

<style lang="less" scoped>
.vscode {
    width: 50%;
    height: 600px;
}
.sections>li{
    list-style: none;
    padding: 10px;
    background-color: rgba(64, 131, 255, 0.623);
    margin: 10px;
    color: white;
    cursor: pointer;
}
.stage {
    background-color: aliceblue;
    width: 50%;
    overflow-y: scroll;
    height: 500px;
}

</style>

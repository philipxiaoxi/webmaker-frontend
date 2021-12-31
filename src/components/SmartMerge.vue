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
                            <ul class="sections" @mousedown="itemsClick" @mouseup="dragend">
                                <li draggable @dragend="dragend" @dragstart="drag($event, 'flex-1-1')">布局(元素垂直放置)</li>
                                <li draggable @dragend="dragend" @dragstart="drag($event, 'flex-1-2')">布局(元素横向放置)</li>
                                <li draggable @dragend="dragend" @dragstart="drag($event, 'img')">图片(宽高100%)</li>
                                <li draggable @dragend="dragend" @dragstart="drag($event, 'btn')">按钮</li>
                                <li draggable @dragend="dragend" @dragstart="drag($event, 'title')">默认标题</li>
                                <li draggable @dragend="dragend" @dragstart="drag($event, 'component2')">测试占位组件（标题）</li>
                                <li draggable @dragend="dragend" @dragstart="drag($event, 'component')">测试占位组件（滚动图）</li>
                            </ul>
                            <el-button @click="gen">生成低代码</el-button>
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
                this.$refs.vscode.monacoEditor.getModel().setValue(''); /* eslint-enable */
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
        itemsClick() {
            document.documentElement.style.setProperty('--p', '20px')
            document.documentElement.style.setProperty('--m', '20px')
            document.documentElement.style.setProperty('--b', 'dashed 2px gray')
        },
        gen() {
            const stage = document.getElementsByClassName('stage')[0]
            /* eslint-disable */
            this.$refs.vscode.monacoEditor.getModel().setValue(
                '<link rel="stylesheet" href="https://www.xiaotao2333.top:5885/common/getSnippetProjectFile/131/基础样式/base.css">' +
                stage.innerHTML +
                '<style><\/style>' +
                '<script><\/script>'
            )
             /* eslint-enable */
        },
        drag(event, type) {
            event.dataTransfer.setData('type', type)
        },
        dragend() {
            console.log('拖拽结束')
            document.documentElement.style.setProperty('--p', '0px')
            document.documentElement.style.setProperty('--m', '0px')
            document.documentElement.style.setProperty('--b', 'none')
        },
        allowDrop(event) {
            event.preventDefault()
        },
        drop(event) {
            event.preventDefault()
            const div = document.createElement('div')
            const type = event.dataTransfer.getData('type')
            if (type == 'flex-1-1') {
                div.classList.add('flex-column')
                div.classList.add('ai-center')
                div.classList.add('jc-center')
                div.classList.add('item-defalut')
            }
            if (type == 'flex-1-2') {
                div.classList.add('flex-row')
                div.classList.add('ai-center')
                div.classList.add('jc-center')
                div.classList.add('item-defalut')
            }
            if (type == 'img') {
                div.classList.add('item-defalut')
                const img = document.createElement('img')
                img.style.width = '100%'
                img.style.height = '100%'
                img.src = 'https://sdfsdf.dev/300x300.png'
                div.appendChild(img)
            }
            if (type == 'btn') {
                const btn = document.createElement('button')
                btn.innerText = '默认按钮'
                btn.classList.add('btn')
                div.appendChild(btn)
            }
            if (type == 'title') {
                const btn = document.createElement('h1')
                btn.innerText = '默认标题'
                div.appendChild(btn)
            }
            if (type == 'component') {
                div.classList.add('item-defalut')
                div.classList.add('felx-column')
                const wm = document.createElement('wm:include')
                wm.setAttribute('file', 'https://www.xiaotao2333.top:5885/common/getSnippetProjectFile/131/轮播类/carousel2.html')
                div.appendChild(wm)
                wm.innerText = '占位滚动图组件-(宽高自动)'
                wm.classList.add('wm-style')
            }
            if (type == 'component2') {
                div.classList.add('item-defalut')
                div.classList.add('felx-column')
                const wm = document.createElement('wm:include')
                wm.setAttribute('file', 'https://www.xiaotao2333.top:5885/common/getSnippetProjectFile/131/标题/title.html')
                div.appendChild(wm)
                wm.innerText = '占位标题组件-(宽高自动)'
                wm.classList.add('wm-style')
            }
            div.onmouseenter = (event) => {
                div.classList.add('item-select')
                div.parentNode.classList.remove('item-select')
            }
            div.onmouseleave = (event) => {
                div.classList.remove('item-select')
                div.parentNode.classList.add('item-select')
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
    position: relative;
}

</style>
<style>
:root{
    --p:0px;
    --m:0px;
    --b:none;
}
.item-defalut {
    position: relative;
    box-sizing: border-box;
    margin: var(--m);
    padding: var(--p);
    border: var(--b);
}
.item-select {
    border: dashed 2px gray;
}
.btn {
    border: none;outline: none;
    padding: 5px 20px;
    margin: 20px;
    background-color: #008EEC;
    color: white;
}
.wm-style {
    border: #008EEC 3px solid;
    display: flex;
    line-height: 50px;
    flex-direction: column;
}
</style>

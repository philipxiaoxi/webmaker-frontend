<template>
    <div class="container">
        <el-tabs type="border-card" style="width:100%;">
            <el-tab-pane label="可视化工作区">
                <div class="flex-row ai-center justify-center con">
                    <div class="components">
                        <ul class="sections">
                            <li :key="item.name" v-for="(item) in components" draggable @dragend="dragend" @dragstart="drag($event, item)">{{item.name}}</li>
                        </ul>
                        <div>
                            <el-button @click="dialogVisible = true"  size="small">引入组件</el-button>
                            <el-button  @click="cleanStage" size="small">清空画布</el-button>
                            <el-button type="primary" @click="gen" size="small">生成低代码</el-button>
                        </div>
                    </div>
                    <div container='stage' class="stage" @drop="drop($event)" @dragover="allowDrop($event)">
                    </div>
                    <div class="settings">
                        <div>
                            <el-form label-position="top" label-width="80px">
                                <el-form-item label="class样式名称">
                                    <el-input></el-input>
                                </el-form-item>
                                <el-form-item label="绑定的class样式">
                                    <el-select v-model="itemClassList"  filterable multiple  placeholder="请选择">
                                        <el-option-group
                                        v-for="group in classNameOptions"
                                        :key="group.label"
                                        :label="group.label">
                                        <el-option
                                            v-for="item in group.options"
                                            :key="item.label"
                                            :label="item.label"
                                            :value="item.label">
                                        </el-option>
                                        </el-option-group>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="活动形式">
                                    <el-input></el-input>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="编辑低代码" >
                <vs-code
                    ref="vscode"
                    class="pane-height-full"
                ></vs-code>
            </el-tab-pane>
            <el-tab-pane label="生成代码预览区">
                <div class="flex-row">
                    <vs-code style="width:50%;" class="pane-height-full" ref="vscode2"></vs-code>
                    <preview
                        :item="{ id: 0 }"
                        style="width:50%;"
                        ref="preview"
                    ></preview>
                </div>
            </el-tab-pane>
        </el-tabs>
        <xx-dialog @dialogCancel='dialogVisible = false' @click="addComponent" title="引入组件" :dialogVisible="dialogVisible" :fromData="fromData"></xx-dialog>
    </div>
</template>

<script>
import Preview from '../components/Preview.vue'
import VsCode from '../components/VsCode.vue'
import XxDialog from '../components/XxDialog.vue'
import SmartMerge from '../util/SmartMerge'
import classNameOptions from '../util/classNameOptions'
export default {
    components: { VsCode, Preview, XxDialog },
    data() {
        return {
            dialogVisible: false,
            itemClassList: [],
            classNameOptions: classNameOptions,
            fromData: [
                {
                    placeholder: '组件名称',
                    model: 'name'
                },
                {
                    placeholder: '组件地址',
                    model: 'url'
                }
            ],
            components: [
                {
                    name: '布局(元素垂直放置)',
                    type: 'flex-1-1'
                },
                {
                    name: '布局(元素横向放置)',
                    type: 'flex-1-2'
                },
                {
                    name: '图片(宽高100%)',
                    type: 'img'
                },
                {
                    name: '按钮',
                    type: 'btn'
                },
                {
                    name: '默认标题',
                    type: 'title'
                },
                {
                    name: '测试占位组件（标题）',
                    type: 'component',
                    url: 'https://www.xiaotao2333.top:5885/common/getSnippetProjectFile/131/标题/title.html'
                },
                {
                    name: '测试占位组件（滚动图）',
                    type: 'component',
                    url: 'https://www.xiaotao2333.top:5885/common/getSnippetProjectFile/131/轮播类/carousel2.html'
                }
            ]
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        addComponent(data) {
            this.components.push(
                {
                    name: data.name,
                    type: 'component',
                    url: data.url
                })
        },
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
        itemsShow() {
            document.documentElement.style.setProperty('--p', '20px')
            document.documentElement.style.setProperty('--m', '20px')
            document.documentElement.style.setProperty('--b', 'dashed 2px gray')
        },
        cleanStage() {
            document.querySelector('.stage').innerHTML = ''
        },
        gen() {
            const stage = document.getElementsByClassName('stage')[0]
            /* eslint-disable */
            this.$refs.vscode.monacoEditor.getModel().setValue(
                '<link href="https://www.xiaotao2333.top:5885/common/getSnippetProjectFile/139/base.css" rel="stylesheet" >'+
                '<link rel="stylesheet" href="https://www.xiaotao2333.top:5885/common/getSnippetProjectFile/131/基础样式/base.css">' +
                stage.innerHTML +
                '<style><\/style>' +
                '<script><\/script>'
            )
             /* eslint-enable */
            this.merge()
        },
        drag(event, item) {
            this.dragItem = item
            this.itemsShow()
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
            let div = document.createElement('div')
            const type = this.dragItem.type
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
                // 点击时候为里面的元素标记
                div.setAttribute('insert', true)
                div.appendChild(img)
            }
            if (type == 'btn') {
                div = document.createElement('button')
                div.innerText = '默认按钮'
            }
            if (type == 'title') {
                div = document.createElement('h1')
                div.innerText = '默认标题'
            }
            if (type == 'component') {
                div.classList.add('item-defalut')
                div.classList.add('felx-column')
                const wm = document.createElement('wm:include')
                wm.setAttribute('file', this.dragItem.url)
                div.appendChild(wm)
                wm.innerText = this.dragItem.name
                wm.classList.add('wm-style')
            }
            div.onmouseenter = (event) => {
                div.classList.add('item-select')
                div.parentNode.classList.remove('item-select')
                div.onclick = (e) => {
                    if (div.getAttribute('insert')) {
                        console.log(div.childNodes[0])
                    } else {
                        console.log(div)
                    }

                    e.stopPropagation() // 阻止事件冒泡
                }
            }
            div.onmouseleave = (event) => {
                div.classList.remove('item-select')
                div.parentNode.classList.add('item-select')
                div.onclick = () => {}
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
.container {
    margin-top: 63px;
    position: relative;
    overflow: hidden;
}
.con {
    height: 100%;
}

.components {
    align-self: start;
    margin: 0px 10px;
    padding: 0px 10px;
}
.sections>li{
    list-style: none;
    padding: 10px;
    background-color: rgba(64, 131, 255, 0.623);
    margin-bottom: 10px;
    color: white;
    cursor: pointer;
}
.pane-height-full {
    height: calc(100vh - 140px);
    width: 100%;
}
.stage {
    overflow-y: scroll;
    flex:1;
    background-color: #DCDFE6;
    height: calc(100vh - 140px);
}
.settings {
    align-self: start;
    margin: 0px 10px;
    padding: 0px 10px;
    text-align:left;
}
</style>

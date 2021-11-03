import Vue from 'vue'

// v-dialogDrag: 弹窗拖拽+水平方向伸缩
/*

*  使用方法

*  将以下代码复制到一个js文件中，然后在入口文件main.js中import引入即可；

*  给elementUI的dialog上加上 v-dialogDrag 指令就可以实现弹窗的全屏和拉伸了。

*  给dialog设置 :close-on-click-modal="false" , 禁止点击遮罩层关闭弹出层

*  如果是form表单，不要将提交等按钮放置el-form-item，以免在上下拉伸时被隐藏

*/
Vue.directive('dialogDrag', {
    bind(el, binding, vnode, oldVnode) {
    // 弹框可拉伸最小宽高
        // 初始非全屏
        let isFullScreen = false
        // 当前宽高
        let nowWidth = 0

        // 当前顶部高度
        let nowMarginTop = 0
        // 获取弹框头部（这部分可双击全屏）
        const dialogHeaderEl = el.querySelector('.el-dialog__header')
        // 弹窗
        const dragDom = el.querySelector('.el-dialog')
        // 给弹窗加上overflow auto；不然缩小时框内的标签可能超出dialog；
        dragDom.style.overflow = 'auto'
        // 清除选择头部文字效果
        // dialogHeaderEl.onselectstart = new Function("return false");
        // 头部加上可拖动cursor
        dialogHeaderEl.style.cursor = 'move'
        // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
        const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null)
        const moveDown = (e) => {
            // 鼠标按下，计算当前元素距离可视区的距离
            const disX = e.clientX - dialogHeaderEl.offsetLeft
            const disY = e.clientY - dialogHeaderEl.offsetTop
            // 获取到的值带px 正则匹配替换
            let styL, styT
            // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
            if (sty.left.includes('%')) {
                styL = +document.body.clientWidth * (+sty.left.replace(/%/g, '') / 100)
                styT = +document.body.clientHeight * (+sty.top.replace(/%/g, '') / 100)
            } else {
                styL = +sty.left.replace(/\px/g, '')
                styT = +sty.top.replace(/\px/g, '')
            };
            document.onmousemove = function(e) {
                // 通过事件委托，计算移动的距离
                const l = e.clientX - disX
                const t = e.clientY - disY
                // 移动当前元素
                dragDom.style.left = `${l + styL}px`
                dragDom.style.top = `${t + styT}px`
                // 将此时的位置传出去
                // binding.value({x:e.pageX,y:e.pageY})
            }
            document.onmouseup = function(e) {
                document.onmousemove = null
                document.onmouseup = null
            }
        }
        dialogHeaderEl.onmousedown = moveDown
        // 双击头部全屏效果
        dialogHeaderEl.ondblclick = (e) => {
            if (isFullScreen == false) {
                nowWidth = dragDom.clientWidth
                nowMarginTop = dragDom.style.marginTop
                dragDom.style.left = 0
                dragDom.style.top = 0
                dragDom.style.height = '100VH'
                dragDom.style.width = '100VW'
                dragDom.style.marginTop = 0
                isFullScreen = true
                dialogHeaderEl.style.cursor = 'initial'
                dialogHeaderEl.onmousedown = null
            } else {
                dragDom.style.height = 'auto'
                dragDom.style.width = nowWidth + 'px'
                dragDom.style.marginTop = nowMarginTop
                isFullScreen = false
                dialogHeaderEl.style.cursor = 'move'
                dialogHeaderEl.onmousedown = moveDown
            }
        }
        dragDom.onmousemove = function(e) {
            if (e.clientX > dragDom.offsetLeft + dragDom.clientWidth - 10 || dragDom.offsetLeft + 10 > e.clientX) {
                dragDom.style.cursor = 'w-resize'
            } else if (el.scrollTop + e.clientY > dragDom.offsetTop + dragDom.clientHeight - 10) {
                dragDom.style.cursor = 's-resize'
            } else {
                dragDom.style.cursor = 'default'
                dragDom.onmousedown = null
            }
        }
    }
})
// 注意引入在 Vue的下面

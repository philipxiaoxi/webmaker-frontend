<template>
    <div :class="$style['review-container']">
        <el-dialog
        title="代码审查"
        :visible.sync="dialogReviewVisible"
        :before-close="handleClose"
        :modal-append-to-body='false'>
            <el-alert
                title="感谢您开源，WebMaker向你表示崇高敬意！"
                type="info"
                description="为了能够确保代码质量符合开源要求，开源作品需要进行代码审查，审查通过后方可公开，希望您能理解并支持。"
                show-icon
                :closable="false">
            </el-alert>
            <el-progress class="my-20" :percentage="currentProgress"></el-progress>
            <el-steps
            direction="vertical"
            :active="currentStep"
            :space="70"
            process-status="process"
            finish-status="success">
                <el-step
                v-for="step in steps"
                :title="step.title"
                :status="step.status"
                :description="step.desc + (step.result || '')"
                :key="step.id"
                ></el-step>
            </el-steps>
            <div class="flex-col jc-center ai-center">
                <el-button v-show="showOpenSourceBtn" type="primary" @click="openSource">开源</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

export default {
    name: 'CodeReview',
    props: {
        item: {
            type: Object,
            default: () => ({})
        },
        dialogReviewVisible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            steps: [
                {
                    id: 1,
                    title: '代码注释要求占比 10%',
                    desc: '良好的注释能够使得后面阅读您的代码的人能够快速读懂。',
                    function: this.commentsLen
                },
                {
                    id: 2,
                    title: '至少填写100字笔记介绍代码情况',
                    desc: '开源项目都有一个README.md文档，用于简单介绍项目的功能和意义，代码片段也是如此。',
                    function: this.noteCharLen
                },
                {
                    id: 3,
                    title: '代码运行时的截图',
                    desc: '图片是吸引人眼球的最好方式，也是直接展示代码运行结果的视窗。',
                    function: this.snipptImgCheck
                },
                {
                    id: 4,
                    title: '代码运行时不能产生任何错误',
                    desc: '基本要求，至少要保证代码运行不能产生任何错误。',
                    function: this.snippetErrorCheck
                }
            ],
            currentStep: 0,
            showOpenSourceBtn: false
        }
    },
    computed: {
        currentProgress() {
            return (this.currentStep / this.steps.length) * 100
        }
    },
    watch: {
        dialogReviewVisible: {
            immediate: true,
            handler: function() {
                if (this.dialogReviewVisible) this.check()
            }
        }
    },
    methods: {
        // 检测入口
        async check() {
            this.cleanHistory()
            for (const step of this.steps) {
                step.function && await step.function.call(this, this.item, step)
                this.currentStep++
            }
            this.checkResult()
        },
        cleanHistory() {
            this.currentStep = 0
            this.showOpenSourceBtn = false
            for (const step of this.steps) {
                step.status = ''
                step.result = ''
            }
        },
        openSource() {
            this.$notify.success({
                title: '代码自动审查',
                message: '您的项目已经通过审查，并设置开源，记得点击保存按钮哟。',
                showClose: false,
                position: 'bottom-right'
            })
            this.$parent.$parent.item.openSource = 1
            this.handleClose()
        },
        checkResult() {
            let flag = true
            for (const step of this.steps) {
                if (step.status === 'error') {
                    flag = false
                    break
                }
            }
            this.showOpenSourceBtn = flag
            if (flag) this.openSource()
        },
        // 代码注释质量检查
        commentsLen(item, step) {
            const { content } = item
            // 每行信息
            const lines = content.split('\n')
            // 匹配出注释的行数
            const commentNum = lines.filter(line => new RegExp('^(//|/\\*|\\*|\\*/|<!)', 'g').test(line.trimStart())).length
            const commentRatio = (Math.round(commentNum / lines.length * 10000) / 100)
            if (commentRatio < 10) {
                step.status = 'error'
                step.result = `您的注释占比率为：${commentRatio}%`
                return false
            }
            return true
        },
        noteCharLen(item, step) {
            const { note } = item
            const len = note?.length || 0
            if (len < 100) {
                step.status = 'error'
                step.result = `您的笔记长度为：${len}个字`
                return false
            }
            return true
        },
        async snipptImgCheck(item, step) {
            /**
             * 由于前期考虑不周，未作图片是否上传的标记，后端如果未上传会返回默认图片
             * 因此这里比较图片内容是否包含默认图片的关键词
            */
            const res = await this.axios.get(`/common/getImg/${item.id}`)
            if (res.data.includes('Ci}j!>')) {
                step.status = 'error'
                step.result = '您尚未上传图片，请点击工具栏图片图标按提示上传，然后点击保存按钮。'
                return false
            }
            return true
        },
        async snippetErrorCheck(item, step) {
            let flag = true
            // 接收预览框反馈消息
            const getErrorMessage = (e) => {
                const obj = e.data
                if (obj.message) {
                    flag = false
                }
            }
            window.addEventListener('message', getErrorMessage, false)
            // 执行预览
            this.$parent.$parent.preview()
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve()
                }, 2000)
            })
            window.removeEventListener('message', getErrorMessage)
            if (!flag) {
                step.status = 'error'
                step.result = '您的代码存在错误，请按提示来进行修改。'
                return false
            }
            return flag
        },
        handleClose() {
            this.$emit('updateDialogReviewVisible')
        }
    }
}
</script>

<style lang="less" module>
.review-container {
    text-align: left;
}
</style>

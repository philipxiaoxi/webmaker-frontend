<template>
    <Preview :style="{top: top + 'px',left: left + 'px'}"  ref="preview" class="preview"></Preview>
</template>

<script>
import API from '../api/'
import Preview from './Preview.vue'
export default {
    name: 'CodeQuickPreview',
    components: { Preview },
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
            visible: false
        }
    },
    computed: {
    },
    watch: {

    },
    methods: {
        async goPreview(item) {
            console.log(item)
            let url = ''
            switch (item.type) {
            case 0:
                url = API.getServer() + 'common/SnippetHtml/' + item.id
                break
            case 1:
                url = API.getServer() + 'common/getSnippetProjectFile/' + item.id + '/index.html'
                break
            default:
                url = ''
            }
            const res = await this.axios({ url: url })
            console.log(res.data)
            this.item = item
            this.$refs.preview.goPreview(res.data, 'html')
        }
    }
}
</script>

<style lang="less" scoped>
.preview {
    width: 700px;
    height: 400px;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 999;
    transform:scale(0.5) translate(-50%,-50%);
}
</style>

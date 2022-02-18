<template>
    <div>
        <p>暂无实验性功能体验噢~</p>
    </div>
</template>

<script>
export default {
    name: 'CreativeFactory',
    components: { },
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
    }
}
</script>

<style lang="less" scoped>
</style>

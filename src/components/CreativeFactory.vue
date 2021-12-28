<template>
    <div>
        <h1>创意工厂</h1>
        <smart-merge></smart-merge>
    </div>
</template>

<script>
import SmartMerge from './SmartMerge.vue'
export default {
    name: 'CreativeFactory',
    components: { SmartMerge },
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

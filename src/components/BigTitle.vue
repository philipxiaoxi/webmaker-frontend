<template>
    <div class="title-container flex-row ai-center">
        <div class="line"></div>
        <div class="title px-20">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BigTitle',
    components: {},
    props: {
    },
    data() {
        return {
            content: '',
            editorOption: {}
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

<style lang='less' scoped>
.title-container {
    text-align: left;
    &>.line {
        border-radius: 5px;
        height: 8px;
        width: 30px;
        background-color: darkblue;
    }
    &>.title {
        font-size: 18px;
        color: #191d21;
        font-weight: bold;
    }
}
</style>

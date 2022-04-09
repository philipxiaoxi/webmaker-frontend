<template>
    <div ref='mircoapp'></div>
</template>

<script>
export default {
    props: {
        src: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
        }
    },
    mounted() {
        this.getHtml()
    },
    computed: {

    },
    watch: {

    },
    methods: {
        getHtml() {
            this.axios.get(this.src).then(res => {
                console.log(res)
            })
        }
    }
}
</script>

<style lang='less' scoped>
</style>

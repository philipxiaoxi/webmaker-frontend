<template>
    <div class="container">
        <el-page-header @back="goBack" content="详情页面">
        </el-page-header>
        <div class="page">2333</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {},
            dataList: []
        }
    },
    mounted() {

    },
    methods: {
        goBack() {
            history.back()
        }
    }
}
</script>

<style lang='less' scoped>
.page {
    padding: 20px;
}
.container {
    max-width: 1144px;
    padding: 20px;
    margin: 0 auto;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
    margin-top: 80px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
}
</style>

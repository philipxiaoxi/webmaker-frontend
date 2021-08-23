<template>
    <div class="container">
        <div class="xx-search-tools">
            <xx-input class="input" placeholder="请输入搜索内容" v-model="form.word"></xx-input>
            <el-button type="primary" round @click="$refs.codesShow.getSearchSnippet(form.word)">搜索片段</el-button>
        </div>
        <codes-show ref="codesShow" type="search"></codes-show>
    </div>
</template>

<script>
import XxInput from '../components/XxInput.vue'
import CodesShow from '../components/CodesShow.vue'
export default {
    components: { CodesShow, XxInput },
    data() {
        return {
            form: {}
        }
    },
    mounted() {

    },
    methods: {

    }
}
</script>

<style lang='less' scoped>
.xx-search-tools {
    display: flex;
    flex-direction: column;
    max-width: 500px;
    align-items: center;
    width: 100%;
    margin: 10px auto;
    .input {
        width: 100%;
    }
    button {
        margin: 10px;
        max-width: 100px;
    }
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
.el-carousel {
    margin-bottom: 20px;
}
.codes {
    display: grid;
    grid-template-columns: repeat(auto-fill,minmax(350px,1fr));
    align-items: start;
    grid-gap: 1rem 1rem;
}
</style>

<template>
    <div class="container">
        <codes-show ref="codesShow" type="mycodes"></codes-show>
    </div>
</template>

<script>
import CodesShow from '../components/CodesShow.vue'
export default {
    components: { CodesShow },
    data() {
        return {
        }
    },
    mounted() {

    },
    methods: {

    }
}
</script>

<style lang='less' scoped>
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
.codes {
    display: grid;
    grid-template-columns: repeat(auto-fill,minmax(350px,1fr));
    align-items: start;
    grid-gap: 1rem 1rem;
}
</style>

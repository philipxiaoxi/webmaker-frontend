<!--
 * @Ahthor: xiaoxi
-->
<template>
    <div >
        <Header ></Header>
        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import Header from '../layout/Header.vue'
export default {
    components: { Header }

}
</script>

<style>

.container {
    padding: 20px;
    max-width: 1144px;
    margin: 0 auto;
    box-shadow:0 0 36.8px 9.2px rgb(16 37 65 / 10%);
    margin-top: 80px;
}
</style>

<!--
 * @Ahthor: xiaoxi
-->
<template>
    <div>
        <Header ></Header>
        <router-view style="padding: 20px;padding-top: 70px;"></router-view>
    </div>
</template>

<script>
import Header from '../layout/Header.vue'
export default {
    components: { Header }

}
</script>

<style>

</style>

<!--
 * @Ahthor: xiaoxi
-->
<template>
    <div >
        <Header ></Header>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
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

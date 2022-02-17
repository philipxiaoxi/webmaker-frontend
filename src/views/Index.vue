<!--
 * @Ahthor: xiaoxi
-->
<template>
    <div >
        <Header ></Header>
        <keep-alive v-show="$route.path != '/container'">
            <router-view></router-view>
        </keep-alive>
        <!-- 微前端组件容器 -->
        <container v-show="$route.path == '/container'"></container>
    </div>
</template>

<script>
import Header from '../layout/Header.vue'
import Container from './Container.vue'
export default {
    components: { Header, Container }

}
</script>

<style>
</style>

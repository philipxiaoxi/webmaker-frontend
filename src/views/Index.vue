<!--
 * @Ahthor: xiaoxi
-->
<template>
    <div >
        <Header ></Header>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <!-- 微前端组件容器 -->
        <!-- <container v-show="$route.path == '/container'"></container> -->
        <inside-app v-show="$route.path == '/insideApp'"></inside-app>
    </div>
</template>

<script>
import Header from '../layout/Header.vue'
// import Container from './mircoAppView/Container.vue'
import InsideApp from './mircoAppView/InsideApp.vue'
export default {
    components: { Header, InsideApp }

}
</script>

<style>
</style>

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
        <salted-fish v-show="$route.path == '/disk'"></salted-fish>
    </div>
</template>

<script>
import Header from '../layout/Header.vue'
// import Container from './mircoAppView/Container.vue'
import SaltedFish from './mircoAppView/SaltedFish.vue'
export default {
    components: { Header, SaltedFish }

}
</script>

<style>
</style>

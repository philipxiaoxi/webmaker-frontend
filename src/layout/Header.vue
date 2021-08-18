<!--
 * @Ahthor: xiaoxi
-->
<template>
    <div class="header">
        <div class="title">
            CodeShare代码分享
        </div>
        <div class="menu">
            <!-- 常驻选项 -->
            <router-link v-for="(link, index) in routeLink" v-bind:key="index" :to="link.path" :class="{active: routePath == link.path}">
                <span>{{link.name}}</span>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            routeLink: [
                {
                    name: '片段广场',
                    path: '/'
                },
                {
                    name: '代码编辑',
                    path: '/editor'
                },
                {
                    name: '搜索片段',
                    path: '/search'
                },
                {
                    name: '我的片段',
                    path: '/my-codes'
                },
                {
                    name: '个人中心',
                    path: '/my'
                }
            ],
            routePath: '/'
        }
    },
    watch: {
        $route(to, from) {
            this.routePath = to.path
            document.documentElement.scrollTop = 0
        }
    }
}
</script>

<style lang='less' scoped>
    .title {
        font-size: 20px;
    }
    .header {
        z-index: 99999;
        top: 0px;
        left: 0px;
        width: 100%;
        background-color: white;
        position: fixed;
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 60px;
        justify-content: space-between;
        padding: 0px 20px;
        box-sizing: border-box;
    }
    .menu {
        display: flex;
        transition: all 0.3s;
        height: 100%;
        > * {
            text-decoration: none;
            line-height: 60px;
            position: relative;
            padding: 0 8px;
            display: block;
            z-index: 99999;
            color: black;
            &::after {
                content: "";
                display: inline-block;
                position: absolute;
                width: 0;
                height: 5px;
                background-color: darkblue;
                bottom: 0;
                left: 0;
                right: 0;
                margin: 0 auto;
                transition: all 0.2s;
            }
            &.active::after {
                width: 100%;
            }
        }

    }
</style>

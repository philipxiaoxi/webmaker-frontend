<!--
 * @Ahthor: xiaoxi
-->
<template>
    <div class="header" :class="{ 'black-header': blackHeader }">
        <div class="title">
            <img style="height:100%;" :src="`${blackHeader ? '/img/logo-white.png' : '/img/logo.png'}`" />
        </div>
        <i v-if="menuStyle == 1" @click="openDrawer" class="el-icon-s-fold"></i>
        <div v-else class="menu">
            <!-- 常驻选项 -->
            <router-link v-for="(link, index) in routeLink" v-bind:key="index" :to="link.path[0]" :class="{active: link.path.includes(routePath)}">
                <span>{{link.name}}</span>
            </router-link>
            <router-link  to="/toolbox" :class="{active: ['/toolbox', '/lowcode', '/insideApp'].includes(routePath)}">
                <span>桌面</span>
            </router-link>
            <!-- 登录注册选项 -->
            <div v-if="this.$store.state.userInfo.phone=='未登录'">
                <router-link  to="/login" :class="{active: routePath == '/login'}">
                    <span>登录</span>
                </router-link>
                <router-link  to="/register" :class="{active: routePath == '/register'}">
                    <span>注册</span>
                </router-link>
            </div>
            <!-- 用户选项 -->
            <div v-else>
                <el-dropdown class="flex-col ai-center jc-center" style="margin-left: 8px;">
                    <el-avatar :size="40" :src="getHeadImgSrc"></el-avatar>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item disabled>{{this.$store.state.userInfo.name}}</el-dropdown-item>
                    <router-link   to="/my-codes">
                        <el-dropdown-item icon="el-icon-folder-opened">
                            <span>我的片段</span>
                        </el-dropdown-item>
                    </router-link>
                    <router-link   to="/my">
                        <el-dropdown-item icon="el-icon-setting">
                            <span>系统设置</span>
                        </el-dropdown-item>
                    </router-link>
                    <el-dropdown-item divided icon="el-icon-switch-button" style="cursor: pointer;color: #f56c6c;">
                        <span  @click="logout">退出登录</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <!-- 样式1的菜单栏 -->
        <el-drawer
            title="导航"
            :visible.sync="drawer"
            direction="rtl"
            :modal-append-to-body='false'
            size='40%'
            >
            <div @click="drawer = false" class="menuDrawer">
                <!-- 常驻选项 -->
                <router-link tag="div" v-for="(link, index) in routeLink" v-bind:key="index" :to="link.path[0]" :class="{active: link.path.includes(routePath)}">
                    <span>{{link.name}}</span>
                    <el-divider></el-divider>
                </router-link>
                <!-- 登录注册选项 -->
                <div v-if="this.$store.state.userInfo.phone=='未登录'">
                    <router-link  to="/login"  tag="div" :class="{active: routePath == '/login'}">
                        <span>登录</span>
                    </router-link>
                    <el-divider></el-divider>
                    <router-link  to="/register" tag="div" :class="{active: routePath == '/register'}">
                        <span>注册</span>
                    </router-link>
                </div>
                <!-- 用户选项 -->
                <div v-else>
                    <router-link   to="/my-codes" tag="div" :class="{active: routePath == '/my-codes'}">
                        <span>我的片段</span>
                    </router-link>
                    <el-divider></el-divider>
                    <router-link   to="/my" tag="div" :class="{active: routePath == '/my'}">
                        <span>个人中心</span>
                    </router-link>
                    <el-divider></el-divider>
                    <span  >{{this.$store.state.userInfo.name}}</span>
                    <span style="margin-left:10px;cursor: pointer;"  @click="logout">退出</span>
                </div>
            </div>

        </el-drawer>
    </div>
</template>

<script>
import md5 from 'js-md5'

export default {
    data() {
        return {
            routeLink: [
                {
                    name: '首页',
                    path: ['/']
                },
                {
                    name: '编辑',
                    path: ['/editor']
                },
                {
                    name: '容器',
                    path: ['/container', '/container/mycontainer']
                },
                {
                    name: '搜索',
                    path: ['/search']
                },
                {
                    name: '论坛',
                    path: ['/forum', '/forumpage', '/newforumpage']
                }
                // {
                //     name: '桌面',
                //     path: ['/toolbox', '/lowcode', '/insideApp']
                // }
            ],
            routePath: this.$route.path,
            menuStyle: 0,
            drawer: false,
            blackHeader: false
        }
    },
    watch: {
        '$route.path'(newPathState) {
            console.log(newPathState)
            this.blackHeader = newPathState === '/toolbox'
        },
        $route(to, from) {
            this.routePath = to.path
            document.documentElement.scrollTop = 0
        }
    },
    computed: {
        getHeadImgSrc() {
            console.log('load')
            return 'https://cravatar.cn/avatar/' + md5(this.$store.state.userInfo.email || '')
        }
    },
    mounted() {
        this.initAutoMenuShow()
    },
    methods: {
        initAutoMenuShow() {
            const UpdateNavBar = () => {
                if (window.innerWidth < 1000) {
                    this.menuStyle = 1
                } else {
                    this.menuStyle = 0
                }
            }
            UpdateNavBar()
            window.addEventListener('resize', () => {
                UpdateNavBar()
            })
        },
        openDrawer() {
            this.drawer = true
        },
        logout() {
            localStorage.clear('token')
            this.$store.commit('setToken', null)
            this.$store.commit('setUserInfo', { phone: '未登录' })
            this.$message({
                message: '勤奋的coder，欢迎下次再来~',
                type: 'success'
            })
        }
    }
}
</script>

<style lang='less' scoped>
    .router-link-active {
        text-decoration: none;
        color: #606266;
    }
    a {
        text-decoration: none;
        color: #606266;
    }
    .menuDrawer {
        & div {
            cursor: pointer;
        }
    }
    .title {
        font-size: 20px;
        height: 100%;
    }
    .header {
        z-index: 30;
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
    .black-header {
        background-color: rgba(0, 0, 0, 0.418);
        .menu  * {
            color: white;
        }
        .menu ::after {
            background-color: white;
        }
    }
    .menu {
        display: flex;
        transition: all 0.3s;
        height: 100%;
        >div {
            display: flex;
            margin:  0px;
            padding: 0px;
        }
        a {
            text-decoration: none;
            line-height: 60px;
            position: relative;
            padding: 0 18px;
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

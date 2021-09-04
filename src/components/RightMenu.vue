<template>
    <div>
        <!-- 通用右键菜单 -->
        <el-menu
            v-show="menuShow"
            id="menu"
            text-color="#000"
            active-text-color="#000"
            style="background-color: #f2f3f5;text-align:left;"
            :style="menuStyle"
        >
            <el-menu-item  @click="rightMenuClick(item, $event)" v-for="(item) in menuData" class="menuItem" v-bind:key="item.title">
                <span slot="title"><i :class="item.icon"></i>{{item.title}}</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
    props: {
        menuData: {
            type: Array,
            default: () => ([])
        },
        menuShow: {
            type: Boolean,
            default: false
        },
        x: {
            type: Number,
            default: 0
        },
        y: {
            type: Number,
            default: 0
        }
    },
    watch: {
        x(o, n) {
            this.menuStyle.left = this.x + 'px'
        },
        y(o, n) {
            this.menuStyle.top = this.y + 'px'
        }
    },
    data() {
        return {
            menuStyle: {
                left: '0',
                top: '0',
                position: 'fixed',
                width: '150px'
            }
        }
    },
    methods: {
        rightMenuClick(item, event) {
            this.$emit('rightMenuClick', item, event)
        }
    }
}
</script>

<style lang="less" scoped>

</style>

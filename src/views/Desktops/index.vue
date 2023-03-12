<template>
    <div class="desktop-container">
        <div class="left-btn" @click="change('left')">
            <i class="el-icon-arrow-left"></i>
        </div>
        <div class="desktop-container-inner">
            <transition-group name="fade" appear>
                <template v-for="item in toolBox">
                <tool-box v-if="toolBoxLoad.includes(item)" v-show="index === item" :key="item" :index="item"></tool-box>
                </template>
            </transition-group>
        </div>
        <div class="right-btn" @click="change('right')">
            <i class="el-icon-arrow-right"></i>
        </div>
        <div class="dots">
            <div @click="dotChange(item)" :class="['dot', { 'active': index === item }]" v-for="item in toolBox" :key="item">桌面{{item}}</div>
        </div>
    </div>
</template>

<script>
import ToolBox from './components/ToolBox.vue'
export default {
    components: { ToolBox },
    data() {
        return {
            index: 2,
            toolBox: [1, 2, 3],
            toolBoxLoad: [2]
        }
    },
    methods: {
        dotChange(index) {
            if (!this.toolBoxLoad.includes(index)) this.toolBoxLoad.push(index)
            this.index = index
        },
        change(type = 'left') {
            if (type === 'left') {
                const index = this.index - 1
                if (index < 1) return this.$message.warning('没有更多桌面了~')
                if (!this.toolBoxLoad.includes(index)) this.toolBoxLoad.push(index)
                this.index = index
                return
            }
            const index = this.index + 1
            if (index > 3) return this.$message.warning('没有更多桌面了~')
            if (!this.toolBoxLoad.includes(index)) this.toolBoxLoad.push(index)
            this.index = index
        }
    }
}
</script>

<style lang='less' scoped>
.desktop-container {
    background-color: black;
    position: relative;
    width: 100%;
    height: 100%;
    .desktop-container-inner {
        height: 100vh;
        overflow-y: auto;
    }
    .left-btn {
        position: absolute;
        left: 0;
        top: 50%;
        z-index: 10;
        color: white;
        font-size: 68px;
        cursor: pointer;
        transform: translateY(-50%);
        user-select: none;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .right-btn {
        position: absolute;
        right: 40px;
        top: 50%;
        z-index: 10;
        color: white;
        font-size: 68px;
        cursor: pointer;
        transform: translateY(-50%);
        user-select: none;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .dots {
        z-index: 10;
        position: absolute;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: row;
        .dot {
            margin: 5px;
            background-color: #fff;
            padding: 5px 10px;
            border-radius: 10px;
            font-size: 14px;
            box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
            transition: all 0.3s ease-in-out;
            cursor: pointer;
            user-select: none;
            &:hover {
                transform: scale(110%);
            }
        }
        .active {
            background-color: #409eff;
            color: #fff;
        }
    }
}
.fade-enter-active {
    transition: opacity .35s
}
.fade-enter {
    opacity: 0.5;
}
.fade-leave {
    opacity: 1;
}
</style>

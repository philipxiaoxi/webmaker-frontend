<template>
    <div class="container"  v-loading="loading">
        <div class="flex-row jc-between">
            <el-alert
            :show-icon="true"
            title="点击右侧按钮，打开应用市场，添加新的应用与网站。"
            type="info"
            :closable="false">
            </el-alert>
            <el-button size="mini" @click="editModeChange" :type="editMode ? 'success' : ''">{{ editMode? '完成' : '编辑' }}</el-button>
        </div>
        <div v-if="appList.length > 0"  class="grid-coantainer">
            <grid-layout
                :layout.sync="appList"
                :col-num="12"
                :row-height="60"
                :is-draggable="editMode"
                :is-resizable="editMode"
                :responsive="false"
                :vertical-compact="false"
                :prevent-collision="false"
                :use-css-transforms="false"
            >
                <grid-item
                    v-for="item in appList"
                    :static="false"
                    :x="item.x"
                    :y="item.y"
                    :w="item.w"
                    :h="item.h"
                    :i="item.i"
                    :key="item.id"
                >
                    <!-- 应用组件 -->
                    <app-component v-if="item.cardType === 'component'" :app="item" :editMode="editMode" @close="delApp"></app-component>
                    <!-- 链接型组件 -->
                    <link-icon
                    v-else
                    :id="item.id"
                    :title="item.title"
                    :intro="item.intro"
                    :url="item.url"
                    :img='item.img'
                    :type="item.type"
                    :auth="item.auth"
                    :extra="item.extra"
                    :editMode="editMode"
                    @close="delApp">
                    </link-icon>
                </grid-item>
            </grid-layout>
        </div>
        <el-empty v-else description="快去添加喜欢的应用与网站趴~"></el-empty>
        <div class="rightBtn" @click="rightDrawer = !rightDrawer"><i class="el-icon-caret-left"></i></div>
        <!-- 工具箱抽屉内容 -->
        <el-drawer
            title="应用大全"
            :visible.sync="rightDrawer"
            direction="rtl"
            size='450px'
            :append-to-body='true'>
            <tool-and-soft @update="updateApps"></tool-and-soft>
        </el-drawer>
    </div>
</template>

<script>
import LinkIcon from '../components/LinkIcon.vue'
import ToolAndSoft from '../components/modals/ToolAndSoft.vue'
import AppComponent from '../components/AppComponent.vue'
import { appList } from '../config/appList'
import { loadStorage, saveStorage } from '../util/LocalStorage'
import { GridLayout, GridItem } from 'vue-grid-layout'

export default {
    components: { LinkIcon, ToolAndSoft, GridLayout, GridItem, AppComponent },
    data() {
        return {
            rightDrawer: false,
            appList: [],
            editMode: false,
            loading: true
        }
    },
    mounted() {
        this.updateApps()
    },
    computed: {
        dragOptions() {
            return {
                animation: 300,
                group: 'description',
                disabled: false,
                ghostClass: 'ghost'
            }
        }
    },
    methods: {
        editModeChange() {
            this.editMode = !this.editMode
            if (!this.editMode) this.save()
        },
        /**
         * 保存相关组件位置信息
         */
        async save() {
            this.editMode = false
            const positions = this.appList.map(item => {
                const { x = 0, y = 0, w = 4, h = 2, id } = item
                return {
                    x,
                    y,
                    w,
                    h,
                    id
                }
            })
            await saveStorage(positions, 'positions')
            this.updateApps()
            this.$message({
                message: '已保存当前布局。',
                type: 'success'
            })
        },
        // 获取用户添加的应用
        async getAddAppList(ids) {
            this.loading = true
            const allAppList = []
            const allAppListId = appList.concat(await loadStorage('customApps'))
            const postions = await loadStorage('positions')
            for (const id of ids) {
                let appInfo = allAppListId.find(item => item.id === id)
                appInfo = this.getGridItem(postions, appInfo)
                if (appInfo) allAppList.push(appInfo)
            }
            this.appList = allAppList
            this.loading = false
        },
        /**
         * 制作布局项数据，通过引用写入对象属性
         */
        getGridItem(postions, app) {
            const position = postions.find(item => item.id === app.id)
            const { x = 0, y = 0, w = 4, h = 2 } = position || {}
            return {
                ...app,
                x,
                y,
                w,
                h,
                i: `${app.id}`
            }
        },
        async updateApps() {
            const appIds = await loadStorage()
            this.getAddAppList(appIds)
        },
        delApp(id) {
            this.$confirm('真的要删除此应用吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async() => {
                const appIds = await loadStorage()
                appIds.splice(appIds.indexOf(id), 1)
                // 本地临时删除
                const index = this.appList.findIndex(item => item.id === id)
                this.appList.splice(index, 1)
                await saveStorage(appIds)
            }).catch()
        }
    }
}

</script>

<style lang='less' scoped>
.container {
    max-width: 1144px;
    padding: 20px;
    margin: 0 auto;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
    margin-top: 80px;
    margin-bottom: 20px;
    > div:first-child {
        margin-bottom: 10px;
    }
}
.link-container {
    margin-bottom: 20px;
}
.rightBtn {
    position: fixed;
    right: 0;
    top: 50%;
    width: 30px;
    height: 40px;
    background-color: #DCDFE6;
    line-height: 40px;
    border-top-left-radius: 25%;
    border-bottom-left-radius: 25%;
}
.shake {
    animation: go 3s linear infinite;
}
.ghost {
  border:  1px solid #00aeff;
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
@keyframes go {
  0% {
    transform: rotate(0deg);
  }
  5% {
    transform: rotate(2deg);
  }
  10% {
    transform: rotate(0deg);
  }
  15% {
    transform: rotate(-3deg);
  }
  20% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(2deg);
  }
  30% {
    transform: rotate(0deg);
  }
  35% {
    transform: rotate(-3deg);
  }
  40% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(2deg);
  }
}
.vue-grid-layout {
    min-height: 850px;
    touch-action: none;
    background-image: linear-gradient(#f8f8f8 10px,transparent 0),linear-gradient(90deg,#f8f8f8 10px,transparent 0);
    background-size: calc(8.43333% - 2.07px) 70px;
    min-height: calc(100vh - 150px);
}
.vue-grid-item {
    box-sizing: border-box;
}
.vue-grid-item .resizing {
    opacity: 0.9;
}
.vue-grid-item .static {
    background: #cce;
}
.vue-grid-item .text {
    font-size: 24px;
    text-align: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    height: 100%;
    width: 100%;
}
.vue-grid-item .no-drag {
    height: 100%;
    width: 100%;
}
.vue-grid-item .minMax {
    font-size: 12px;
}
.vue-grid-item .add {
    cursor: pointer;
}
.vue-draggable-handle {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 0;
    left: 0;
    background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='5' fill='#999999'/></svg>") no-repeat;
    background-position: bottom right;
    padding: 0 8px 8px 0;
    background-repeat: no-repeat;
    background-origin: content-box;
    box-sizing: border-box;
    cursor: pointer;
}
</style>

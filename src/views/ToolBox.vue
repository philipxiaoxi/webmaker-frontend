<template>
    <div
        class="container"
        :class="{ change: backgroundChange }"
        :style="{ backgroundImage: `url('${settingForm.currentImageUrl}')`, '--alpha': settingForm.bgColorMaskDepth }"
    >
        <div v-if="$store.getters.token" class="grid-warp">
            <!-- <div class="flex-row jc-between">
                <span>点击右侧按钮，打开应用市场，添加新的应用与网站。</span>
                <el-button size="mini" @click="editModeChange" :type="editMode ? 'success' : ''">{{ editMode? '完成' : '编辑' }}</el-button>
            </div> -->
            <div v-if="appList.length > 0"  class="grid-coantainer">
                <grid-layout
                    :layout.sync="appList"
                    :col-num="12"
                    :row-height="60"
                    :margin="[20, 20]"
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
                        <app-component v-if="item.type === 'component'" :app="item" :editMode="editMode" @close="delApp"></app-component>
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
                        :item="item"
                        @close="delApp">
                        </link-icon>
                    </grid-item>
                </grid-layout>
            </div>
            <el-empty v-else description="点击右边的应用市场，快去添加喜欢的应用与网站趴~" style="height: 100%;"></el-empty>
            <div class="rightBtn">
                <div @click="editModeChange" :class="{ green: editMode }" :title="`${ editMode ? '保存桌面布局' : '编辑桌面布局' }`">
                    <i v-if="editMode" class="el-icon-check" style="color: white;"></i>
                    <i v-else class="el-icon-edit"></i>
                </div>
                <div @click="rightDrawer = true" title="应用市场"><i class="el-icon-menu"></i></div>
                <div @click="settingVisible = true" title="设置"><i class="el-icon-s-tools"></i></div>
            </div>
            <div class="windmill-container" title="更换壁纸" @click="changeWallpaper">
                <div class="windmill">
                    <div class="triangle right"></div>
                    <div class="triangle bottom"></div>
                    <div class="triangle left"></div>
                    <div class="triangle top"></div>
                </div>
                <div class="stick"></div>
            </div>
            <!-- 工具箱抽屉内容 -->
            <tool-and-soft :visible.sync="rightDrawer" ref="toolAndSoft" @update="updateApps"></tool-and-soft>
            <tool-box-setting :visible.sync="settingVisible" @change="refreshSetting"></tool-box-setting>
        </div>
        <div v-else class="welcome">
            <i class="el-icon-s-grid"></i>
            <div class="title">方块桌面</div>
            <ul>
                <li>多种方块小组件供你选择，支持账号互动，数据传递，数据保存。</li>
                <li>可扩展、可开发式小组件设计，会点前端就能做方块组件，丰富应用市场。</li>
                <li>提供基本的remoteStorge存储库，帮助你保存方块数据组件。</li>
            </ul>
            <el-button type="primary" round @click="$router.push('/login')">登录</el-button>
        </div>
    </div>
</template>

<script>
import LinkIcon from '../components/LinkIcon.vue'
import ToolAndSoft from '../components/modals/ToolAndSoft.vue'
import AppComponent from '../components/AppComponent.vue'
import { appList } from '../config/appList'
import { loadStorage, saveStorage } from '../util/LocalStorage'
import { GridLayout, GridItem } from 'vue-grid-layout'
import ToolBoxSetting from '../components/modals/ToolBoxSetting.vue'
import { cloneDeep } from 'lodash-es'

export default {
    components: { LinkIcon, ToolAndSoft, GridLayout, GridItem, AppComponent, ToolBoxSetting },
    data() {
        return {
            rightDrawer: false,
            settingVisible: false,
            appList: [],
            editMode: false,
            loading: true,
            backgroundChange: false,
            settingForm: {
                bgColorMaskDepth: 0.3,
                bgImageOrigin: 'imagesUrl',
                currentImageUrl: 'https://disk.xiaotao2333.top:344/api/resource/0/fileContentByMD5/458b5b96d7f8e156b71158d6b788a085/17.%E3%80%903%E3%80%91Radar%20Detector%2CSkrillex%20-%20Scary%20Monsters%20And%20Nice%20Sprites%20(Radar%20Detector%20Remix).jpg',
                images: [
                    {
                        id: 1,
                        url: 'https://disk.xiaotao2333.top:344/api/resource/0/fileContentByMD5/458b5b96d7f8e156b71158d6b788a085/17.%E3%80%903%E3%80%91Radar%20Detector%2CSkrillex%20-%20Scary%20Monsters%20And%20Nice%20Sprites%20(Radar%20Detector%20Remix).jpg'
                    }
                ],
                bgApi: '',
                bgApiCallBackFn: ''
            }
        }
    },
    watch: {
        '$store.getters.token': {
            immediate: true,
            handler: function(newTokenState) {
                if (newTokenState) {
                    this.updateApps()
                    this.getSetting()
                    return
                }
                this.appList = []
                this.settingForm = this.$options.data().settingForm
            }
        }
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
        refreshSetting(settingForm) {
            this.settingForm = cloneDeep(settingForm)
        },
        async getSetting() {
            const setting = await loadStorage('settingForm')
            if (setting) this.settingForm = setting
        },
        async saveSetting() {
            await saveStorage(this.settingForm, 'settingForm')
        },
        /**
         * 切换壁纸
         */
        changeWallpaper() {
            this.backgroundChange = true
            const { images } = this.settingForm
            let index = images.findIndex(item => item.url === this.settingForm.currentImageUrl)
            const len = images.length
            setTimeout(() => {
                this.settingForm.currentImageUrl = index >= len - 1 || index === -1 ? images[0].url : images[++index].url
                this.backgroundChange = false
                this.saveSetting()
            }, 300)
        },
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
                const { x, y, w, h, id } = item
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
            const allAppListId = appList.concat(await loadStorage('customApps') || [])
            const postions = await loadStorage('positions') || []
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
        getGridItem(positions, app) {
            const position = positions.find(item => item.id === app.id)
            let { x = -1, y = -1, w = 4, h = 2 } = position || {}
            // 新加的应用没有位置信息默认到底部
            if (x === -1 || y === -1) {
                const x0y0apps = positions.filter(item => item.x === 0)
                x = 0
                // 寻找最大的位置
                y = x0y0apps.reduce((previous, current) => {
                    return current.y > previous ? current.y : previous
                }, 0)
            }
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
            loadStorage().then(appIds => {
                this.getAddAppList(appIds || [])
            }).catch((error) => {
                this.loading = false
                this.$message.error(error)
            })
        },
        delApp(id) {
            this.$confirm('真的要删除此应用吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async() => {
                const appIds = await loadStorage() || []
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
.welcome {
    z-index: 10;
    background-color: white;
    width: auto;
    border-radius: 5px;
    padding: 20px;
    max-width: 900px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .el-icon-s-grid {
        font-size: 100px;
        color: #409EFF;
        margin: 20px;
    }
    .title {
        font-size: 25px;
    }
    ul {
        list-style: auto;
        text-align: left;
        margin-left: 0;
        padding-left: 20px;
        li {
            margin: 10px 0;
        }
    }
}
.container {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 60px);
    padding-top: 60px;
    background-size: cover;
    background-position: center;
    background-attachment:fixed;
    background-color: black;
    &:after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, var(--alpha));
        transition: background-color 0.3s;
    }
}
.change:after {
    background-color: rgba(0, 0, 0, 0.95);
    transition: background-color 0.3s;
}
.grid-warp {
    width: 100%;
    height: 100%;
    max-width: 1144px;
    padding: 20px;
    box-sizing: border-box;
    z-index: 10;
    // box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
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
    transform: translateY(-50%);
    .green {
        background-color: #67c23a;
    }
    & > div {
        margin: 10px 0;
        width: 30px;
        height: 40px;
        background-color: #DCDFE6;
        line-height: 40px;
        border-top-left-radius: 25%;
        border-bottom-left-radius: 25%;
    }
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
    // background-image: linear-gradient(#f8f8f8 10px,transparent 0),linear-gradient(90deg,#f8f8f8 10px,transparent 0);
    // background-size: calc(8.43333% - 2.07px) 70px;
    min-height: calc(100vh - 200px);
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
// 小风车组件
.windmill-container {
    --size: 15;
    position: fixed;
    z-index: 10;
    bottom: 50px;
    right: 50px;
    .windmill {
        position: absolute;
        bottom: 0;
        right: 0;
        z-index: 10;
        width: calc(var(--size) * 4px);
        height: calc(var(--size) * 4px);
        animation: circle 2s infinite linear;
        cursor: pointer;
    }
    .stick {
        position: absolute;
        top: calc(var(--size) * -2px);
        left: calc(var(--size) * -2px);
        transform: translateX(-50%);
        height: 80px;
        width: 5px;
        background: royalblue;
        border-radius: 5px;
    }
    .triangle {
        position: absolute;
        height: 0;
        border: calc(var(--size) * 1px) solid transparent;
    }

    .triangle.right {
        border-right-color: red;
    }

    .triangle.bottom {
        left: calc(var(--size) * 2px);
        border-bottom-color: yellow;
    }

    .triangle.left {
        top: calc(var(--size) * 2px);
        left: calc(var(--size) * 2px);
        border-left-color: coral;
    }

    .triangle.top {
        top: calc(var(--size) * 2px);
        border-top-color: cyan;
    }

    @keyframes circle {
        to {
            transform: rotate(0);
        }
        from {
            transform: rotate(360deg);
        }
    }
}
</style>

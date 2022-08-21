<template>
    <div class="container">
        <div class="flex-row jc-between px-10">
            <el-alert
            title="点击右侧按钮，打开应用市场，添加新的应用与网站。"
            type="info"
            :closable="false">
            </el-alert>
            <el-button size="mini" @click="editMode = !editMode">{{ editMode? '完成' : '编辑' }}</el-button>
        </div>
        <div class="link-container grid-cols-3 gap-sm">
            <link-icon
            v-for="(item,i) in appList" :key="item.title + i"
            :id="item.id"
            :title="item.title"
            :intro="item.intro"
            :url="item.url"
            :img='item.img'
            :type="item.type"
            :auth="item.auth"
            :extra="item.extra"
            :editMode="editMode"
            @close="delApp"
            >
            </link-icon>
        </div>
        <el-empty v-if="appList.length <= 0" description="快去添加喜欢的应用与网站趴~"></el-empty>
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
import { appList } from '../config/appList'
import { loadStorage, saveStorage } from '../util/LocalStorage'

export default {
    components: { LinkIcon, ToolAndSoft },
    data() {
        return {
            rightDrawer: false,
            appList: [],
            editMode: false
        }
    },
    mounted() {
        this.updateApps()
    },
    methods: {
        // 获取用户添加的应用
        async getAddAppList(ids) {
            this.appList = []
            for (const id of ids) {
                const allAppList = appList.concat(await loadStorage('customApps'))
                const appInfo = allAppList.find(item => item.id === id)
                if (appInfo) this.appList.push(appInfo)
            }
        },
        async updateApps() {
            const appIds = await loadStorage()
            this.getAddAppList(appIds)
        },
        async delApp(id) {
            const appIds = await loadStorage()
            appIds.splice(appIds.indexOf(id), 1)
            await saveStorage(appIds)
            this.updateApps()
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
</style>

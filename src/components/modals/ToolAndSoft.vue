<template>
    <el-drawer
        title="应用大全"
        :visible.sync="rightDrawer"
        direction="rtl"
        size='450px'
        @open="loadApp"
        :append-to-body='true'>
        <div :class="$style['tool-and-soft']">
            <div class="mx-20">
                <el-alert
                    title="欢迎来到应用中心，添加您喜欢的应用与网站，未来会有更多有趣有用的应用与网站在此展示，您也可以自由的添加，同步备份到您的私人账号上。"
                    type="success"
                    :closable="false">
                </el-alert>
                <div class="flex-row">
                    <el-input placeholder="搜索你喜欢的应用与网站" v-model="keyword" class="my-10">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                    <div style="margin-left: 10px;" class="my-10">
                        <el-button icon="el-icon-plus" @click="mode = 1; dialogVisible = true" >新建</el-button>
                    </div>
                </div>
            </div>
            <div class="container">
                <el-tabs tab-position="left" style="height: 100%;">
                    <el-tab-pane v-for="category in categorys" :label="category" :key="category">
                        <div class="tools">
                            <tool-card
                            v-for="(item, i) in appList.filter(e=>e.category === category)" :key="item.title + i"
                            :title="item.title"
                            :id="item.id"
                            :intro="item.intro"
                            :url="item.url"
                            :img="item.img"
                            :tags="item.tags"
                            :type="item.type"
                            @addApp="addApp"
                            @delete="deleteApp"
                            @edit="editApp"
                            ></tool-card>
                            <el-empty v-if="appList.filter(e=>e.category === category).length <= 0" description="暂无应用"></el-empty>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <el-dialog
            :title="`${mode === 1 ? '添加' : '编辑'}自定义应用`"
            :visible.sync="dialogVisible"
            :modal-append-to-body="true"
            :append-to-body="true"
            width="40%">
            <el-form ref="form" :rules="rules" :model="appInfo" label-width="80px">
                <el-form-item label="应用地址" prop="url">
                    <el-input
                    type="textarea"
                    autosize
                    placeholder="请输入应用地址或入口(https://xxxxx"
                    v-model="appInfo.url">
                    </el-input>
                </el-form-item>
                <el-form-item label="应用名称" prop="title">
                    <el-input
                    type="textarea"
                    autosize
                    placeholder="请输入应用名称"
                    v-model="appInfo.title">
                    </el-input>
                </el-form-item>
                <el-form-item label="应用描述" prop="intro">
                    <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入应用描述"
                    v-model="appInfo.intro">
                    </el-input>
                </el-form-item>
                <el-form-item label="图标地址" prop="img">
                    <el-input
                    type="textarea"
                    autosize
                    placeholder="请输入应用图标地址，默认自动获取"
                    v-model="appInfo.img">
                    </el-input>
                </el-form-item>
                <el-form-item label="所属分类"  prop="category">
                    <el-select
                    v-model="appInfo.category"
                    placeholder="请选择分类"
                    style="width: 100%;">
                        <el-option
                        v-for="(item, i) in categorys"
                        :label="item"
                        :key="item + i"
                        :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="应用类型" prop="type">
                    <el-radio-group v-model="appInfo.type">
                        <el-radio label="url">网站</el-radio>
                        <el-radio label="app">qiankun微应用</el-radio>
                        <el-radio label="path">本站路由</el-radio>
                        <el-radio label="component">小组件</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item v-show="appInfo.type === 'url'" label="打开方式"  prop="open">
                    <el-select
                    v-model="appInfo.open"
                    placeholder="请选择打开方式"
                    style="width: 100%;">
                        <el-option label="新标签页" value="blank"></el-option>
                        <el-option label="内置容器" value="insideApp"></el-option>
                    </el-select>
                </el-form-item>
                <template v-if="appInfo.type === 'component' || appInfo.type === 'app' || (appInfo.type === 'url' && appInfo.open === 'insideApp')">
                    <el-form-item
                    label="授权信息">
                        <p :class="$style['xx-alert']">
                            【用户鉴别】是仅提供一个标识用于确定是你，类似于匿名访问，网站无法得知您的真实身份。<br>
                            【个人信息】是网站可得知您的个人信息与真实身份。<br>
                            【全站权限】是网站可拥有你账号下所有的权限，控制整个站点，建议绿色应用才给予授权。<br>
                        </p>
                        <el-select style="margin-top: 10px;width: 100%;" v-model="appInfo.auth" placeholder="请选择">
                            <el-option label="用户鉴别(建议)" value="userId"></el-option>
                            <el-option label="个人信息" value="userInfo"></el-option>
                            <el-option label="全站权限(谨慎选择)" value="token"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="额外信息">
                        <el-input
                        type="textarea"
                        autosize
                        placeholder="请输入额外需要传输的信息，默认为空"
                        v-model="appInfo.extra">
                        </el-input>
                    </el-form-item>
                </template>
            </el-form>
            <div style="margin: 20px 0;"></div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
            </el-dialog>
        </div>
    </el-drawer>
</template>

<script>
import ToolCard from '../ToolCard.vue'
import { appList, categorys } from '../../config/appList'
import { loadStorage, saveStorage } from '../../util/LocalStorage'

export default {
    components: { ToolCard },
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            categorys: categorys,
            appList: [],
            keyword: '',
            dialogVisible: false,
            appInfo: {
                category: '我的应用',
                type: 'url',
                open: 'blank',
                auth: 'userId',
                extra: ''
            },
            rules: {
                url: [{ required: true, message: '请输入应用地址', trigger: 'blur' }],
                title: [{ required: true, message: '请输入应用名称', trigger: 'blur' }],
                intro: [{ required: true, message: '请输入应用描述', trigger: 'blur' }]
            },
            mode: 1
        }
    },
    computed: {
        rightDrawer: {
            get() {
                return this.visible
            },
            set(newValue) {
                this.$emit('update:visible', newValue)
            }
        }
    },
    methods: {
        async loadApp() {
            loadStorage('customApps').then(customApp => {
                this.appList = appList.concat(customApp || [])
            }).catch(error => {
                this.$message.error(`${error} 未登录的情况下无法展示应用，且无法保存。`)
            })
        },
        async addApp(id) {
            const appIds = await loadStorage() || []
            const app = appIds.find(item => item === id)
            if (app) {
                this.$notify.error({
                    title: '失败',
                    message: '您的应用库已存在此应用。'
                })
                return
            }
            appIds.push(id)
            saveStorage(appIds).then(() => {
                this.$notify({
                    title: '成功',
                    message: '应用已添加到您的应用库。'
                })
                this.$emit('update')
            })
        },
        /**
         * 删除自定义应用
         */
        async deleteApp(id) {
            const customApps = await loadStorage('customApps') || []
            const index = customApps.findIndex(item => item.id === id)
            if (index === -1) {
                this.$message.error('此应用为官方应用，不可以删除哦')
                return
            }
            const apps = await loadStorage() || []
            const appIndex = apps.findIndex(item => item.id === id)
            if (appIndex !== -1) {
                apps.splice(appIndex, 1)
                await saveStorage(apps)
            }
            customApps.splice(index, 1)
            await saveStorage(customApps, 'customApps')
            this.$message({ message: '删除成功！', type: 'success' })
            this.loadApp()
            this.$emit('update')
        },
        /**
         * 编辑应用
         */
        async editApp(id) {
            const customApps = await loadStorage('customApps') || []
            const app = customApps.find(item => item.id === id)
            if (!app) {
                this.$message.error('此应用为官方应用，不可以编辑哦')
                return
            }
            this.appInfo = app
            // 需要转换一下type类型以确保打开方式
            if (this.appInfo.type === 'insideApp' || this.appInfo.type === 'blank') {
                this.appInfo.type = 'url'
            }
            console.log(app)
            // mode 2 为编辑模式
            this.mode = 2
            this.dialogVisible = true
        },
        async submit() {
            if (this.mode === 1) {
                let customApps = await loadStorage('customApps')
                if (!customApps) customApps = []
                this.appInfo.id = new Date().getTime()
                // 需要转换一下type类型以确保打开方式
                if (this.appInfo.type === 'url' && this.appInfo.open === 'insideApp') {
                    this.appInfo.type = this.appInfo.open
                }
                customApps.push(this.appInfo)
                saveStorage(customApps, 'customApps').then(() => {
                    this.dialogVisible = false
                    this.$notify({
                        title: '您的应用已入库。',
                        message: '您可以点击添加来添加到您的应用库当中。'
                    })
                    this.loadApp()
                })
            }
            if (this.mode === 2) {
                const id = this.appInfo.id
                let customApps = await loadStorage('customApps')
                if (!customApps) customApps = []
                const index = customApps.findIndex(item => item.id === id)
                // 需要转换一下type类型以确保打开方式
                if (this.appInfo.type === 'url' && this.appInfo.open === 'insideApp') {
                    this.appInfo.type = this.appInfo.open
                }
                customApps[index] = this.appInfo
                console.log(this.appInfo)
                await saveStorage(customApps, 'customApps')
                this.dialogVisible = false
                this.loadApp()
                this.$emit('update')
                this.$notify({
                    title: '您的应用已更新。',
                    message: '您可以点击添加来添加到您的应用库当中。'
                })
            }
        }
    }
}

</script>

<style lang='less' module>
.tool-and-soft {
    text-align: left;
    :global {
        .container {
            height: calc(100vh - 240px);
        }
        .tools {
            overflow-y: auto;
            height: calc(100vh - 240px);
            & > * {
                margin: 10px 0;
                margin-right: 20px;
            }
        }
    }
}
.xx-alert {
    padding: 10px;
    background-color: rgba(236, 236, 236, 0.548);
}
</style>

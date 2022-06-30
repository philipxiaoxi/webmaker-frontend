<template>
    <div :class="$style['tool-and-soft']">
        <div class="mx-20">
            <el-alert
                title="欢迎来到应用中心，添加您喜欢的应用与网站，以及对他们分类，未来会有更多有趣有用的应用与网站在此展示，您也可以自由的添加。目前是测试阶段，数据仅保存在本地，没有同步备份的功能。"
                type="success"
                :closable="false">
            </el-alert>
            <div class="flex-row">
                <el-input placeholder="搜索你喜欢的应用与网站" v-model="keyword" class="my-10">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
                <div style="margin-left: 10px;" class="my-10">
                    <el-button icon="el-icon-edit-outline" @click="dialogVisible = true">添加</el-button>
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
                        ></tool-card>
                        <el-empty v-if="appList.filter(e=>e.category === category).length <= 0" description="暂无应用"></el-empty>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <el-dialog
        title="添加自定义应用"
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
                </el-radio-group>
            </el-form-item>
            <el-form-item v-show="appInfo.type === 'url'" label="打开方式"  prop="open">
                <el-select
                v-model="appInfo.open"
                placeholder="请选择打开方式"
                style="width: 100%;">
                    <el-option label="新标签页" value="blank"></el-option>
                    <el-option label="内置容器" value="inside"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item
            v-show="appInfo.type === 'app' || (appInfo.type === 'url' && appInfo.open === 'inside')"
            label="授权信息">
                <el-alert
                    title="授权信息获取需要应用自身有相应的生命周期和函数接收，请勿轻易授权全站权限，建议只在绿色认证应用授权。"
                    type="warning"
                    :closable="false">
                </el-alert>
                <el-checkbox-group v-model="appInfo.auth" prop="auth">
                    <el-checkbox label="userId" name="type">仅身份鉴别</el-checkbox>
                    <el-checkbox label="userInfo" name="type">个人基本信息</el-checkbox>
                    <el-checkbox label="token" name="type">全站权限(请勿轻易授权)</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
        </el-form>
        <div style="margin: 20px 0;"></div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addCustomApp">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
import ToolCard from '../ToolCard.vue'
import { appList, categorys } from '../../config/appList'
import { loadStorage, saveStorage } from '../../util/LocalStorage'
export default {
    components: { ToolCard },

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
                auth: []
            },
            rules: {
                url: [{ required: true, message: '请输入应用地址', trigger: 'blur' }],
                title: [{ required: true, message: '请输入应用名称', trigger: 'blur' }],
                intro: [{ required: true, message: '请输入应用描述', trigger: 'blur' }]
            }
        }
    },
    mounted() {
        this.loadApp()
    },
    methods: {
        loadApp() {
            this.appList = appList.concat(loadStorage('customApps'))
        },
        addApp(id) {
            const appIds = loadStorage()
            const app = appIds.find(item => item === id)
            if (app) {
                this.$notify.error({
                    title: '失败',
                    message: '您的应用库已存在此应用。'
                })
                return
            }
            appIds.push(id)
            saveStorage(appIds)
            this.$notify({
                title: '成功',
                message: '应用已添加到您的应用库。'
            })
            this.$emit('update')
        },

        addCustomApp() {
            const customApps = loadStorage('customApps')
            this.appInfo.id = new Date().getTime()
            customApps.push(this.appInfo)
            saveStorage(customApps, 'customApps')
            this.dialogVisible = false
            this.$notify({
                title: '您的应用已入库。',
                message: '您可以点击添加来添加到您的应用库当中。'
            })
            this.loadApp()
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
</style>

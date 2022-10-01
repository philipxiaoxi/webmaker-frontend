<template>
    <div :class="$style['setting-container']">
        <el-dialog
            title="桌面设置"
            :visible.sync="dialogVisible"
            :modal-append-to-body='false'
        >
            <el-form ref="form" :model="settingForm" label-width="80px">
                <el-form-item label="遮罩浓度">
                    <el-slider v-model="settingForm.bgColorMaskDepth" :min="0" :max="1" :step="0.01"></el-slider>
                </el-form-item>
                <el-form-item label="当前壁纸">
                    <el-input v-model="settingForm.currentImageUrl" placeholder="请输入当前壁纸的链接，默认为壁纸源的第一张壁纸。"></el-input>
                </el-form-item>
                <el-form-item label="壁纸源">
                    <el-radio v-model="settingForm.bgImageOrigin" label="imagesUrl">多图链接</el-radio>
                    <!-- <el-radio v-model="settingForm.bgImageOrigin" label="api">API接口</el-radio> -->
                </el-form-item>
                <el-form-item label="壁纸链接" v-if="settingForm.bgImageOrigin === 'imagesUrl'">
                    <el-input v-for="(item, index) in settingForm.images" :key="item.id" v-model="item.url" placeholder="请输入壁纸链接" style="margin: 5px 0;">
                        <el-button v-if="index === 0" slot="append" icon="el-icon-plus" @click="addImage"></el-button>
                        <el-button v-else slot="append" icon="el-icon-close" @click="deleteImage"></el-button>
                    </el-input>
                </el-form-item>
                <template v-else>
                    <el-form-item  label="API接口" >
                        <el-input v-model="settingForm.bgApi" placeholder="请输入壁纸API接口"></el-input>
                    </el-form-item>
                    <el-form-item label="回调函数">
                        <el-input type="textarea" :rows="4" v-model="settingForm.bgApiCallBackFn" placeholder="用于处理API接口返回的结果的回调函数，默认传入函数的第一个参数，返回对应的图像数组{ id: 1, url: '' }, 如果为空的话，则默认以返回结果为图像数组。"></el-input>
                    </el-form-item>
                </template>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="save">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { loadStorage, saveStorage } from '../../util/LocalStorage'

export default {
    name: 'ToolBoxSetting',
    props: {
        item: {
            type: Object,
            default: () => ({})
        },
        visible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
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
            },
            modalHidden: false
        }
    },
    computed: {
        dialogVisible: {
            get() {
                return this.visible
            },
            set(newValue) {
                this.$emit('update:visible', newValue)
            }
        }
    },
    mounted() {
        this.getSetting()
    },
    methods: {
        async getSetting() {
            const setting = await loadStorage('settingForm')
            if (setting) this.settingForm = setting
        },
        addImage() {
            this.settingForm.images.push({
                id: new Date().getTime(),
                url: ''
            })
        },
        deleteImage(item) {
            const index = this.settingForm.images.findIndex(arrayItem => arrayItem.id === item.id)
            this.settingForm.images.splice(index, 1)
        },
        async save() {
            await saveStorage(this.settingForm, 'settingForm')
            this.$message.success('保存成功')
            this.dialogVisible = false
            this.$emit('change', this.settingForm)
        }
    }
}
</script>

<style lang="less" module>
.setting-container {
    text-align: left;

}
:global {
    .el-dialog {
        width: 90%;
        max-width: 700px;
    }
}
</style>

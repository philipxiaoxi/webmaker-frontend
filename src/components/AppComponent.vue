<template>
    <!-- 网页内嵌型组件 -->
    <div class="conponent-iframe-container">
        <div v-show="editMode" @click.stop="$emit('close', app.id)" class="close"><i class="el-icon-close"></i></div>
        <div v-show="editMode" class="mask">
            <div class="title">{{app.title}}</div>
        </div>
        <iframe class="conponent-iframe" :src="app.url"></iframe>
    </div>
</template>

<script>
export default {
    props: {
        app: {
            type: Object,
            default: () => ({})
        },
        editMode: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="less" scoped>
.mask {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(255,255,255,0.95);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .title {
        text-align: center;
        font-size: 25px;
        color: #47494c;
    }
}
.conponent-iframe-container {
    height: 100%;
    background-color: white;
}
.conponent-iframe {
    height: 100%;
    width: 100%;
    border: none;
    outline: none;
}
.conponent-iframe-edit {
    box-sizing: border-box;
    padding: 20px;
}
.close {
    position: absolute;
    right: -10px;
    top: -10px;
    z-index: 999;
    font-size: 15px;
    cursor: pointer;
    background: white;
    border-radius: 50%;
    background-color: #f56c6c;
    color: white;
    padding: 5px;
    box-sizing: border-box;
    width: 25px;
    height: 25px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    > i {
        margin-left: 1px;
    }
}
</style>

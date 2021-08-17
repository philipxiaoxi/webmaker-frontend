<template>
    <div>
        <el-card style="text-align: left;" :body-style="{ padding: '0px' }" shadow='hover'>
            <div class="heads">
                <img src="https://blog.diyxi.top/upload/2021/08/image-784af8bb55f348e88ff12e6f1009e3ff.png" alt="">
            </div>
            <div class="headimg">
                <div class="xx-row">
                    <img src="https://blog.diyxi.top/upload/2021/06/5222013_huang_jianxi_1609203986%20(2)-075d4779647a487ab9bf61a201c6c6d4.png" alt="">
                    <div class="tips">
                        <div class="title">CodeShare代码测试片段</div>
                        <div class="info">
                            <div class="author">黄鉴熙</div>
                            <el-tag style="margin-left: 10px;margin-top: 1px;" type="info" size="mini">实习码农</el-tag>
                        </div>
                    </div>
                </div>
                <i class="el-icon-share"></i>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
.heads {
    img {
        width: 100%;
        padding-bottom: 0px;
    }
}
.headimg {
    padding: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .xx-row {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    img {
        width: 50px;
        height: 50px;
        border: 1px solid #EEE;
        border-radius: 500rem;
        margin-right: 10px;
    }
}
.tips {
    .info {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .title {
        font-size: 1.1em;
    }
    .author {
        color: #717790;
    }
}
</style>

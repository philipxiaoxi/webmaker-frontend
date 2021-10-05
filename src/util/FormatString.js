const FS = {
    getIdentityString(identity) {
        switch (identity) {
        case 0:
            return 'WebMaker管理员'
        case 1:
            return 'WebMaker金牌认证作者'
        case 2:
            return '初级实习作者'
        case 3:
            return '来源于网络收集'
        default:
            return ''
        }
    }
}
export default FS

const FS = {
    getIdentityString(identity) {
        switch (identity) {
        case 0:
            return 'CodeShare管理员'
        case 1:
            return 'CodeShare金牌认证作者'
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

const FS = {
    getIdentityString(identity) {
        switch (identity) {
        case 0:
            return { text: 'WebMaker初级实习作者', type: 'info' }
        case 1:
            return { text: 'WebMaker金牌认证作者', type: 'danger' }
        case 2:
            return { text: 'WebMaker银牌认证作者', type: 'success' }
        case 3:
            return { text: '来源网络作者', type: 'info' }
        default:
            return { text: 'WebMaker初级实习作者', type: 'info' }
        }
    }
}
export default FS

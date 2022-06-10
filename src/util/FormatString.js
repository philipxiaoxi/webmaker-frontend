const FS = {
    getIdentityString(identity) {
        identity = parseInt(identity)
        switch (identity) {
        case 0:
            return { text: '普通程序员', type: 'info' }
        case 1:
            return { text: '编程祖师爷', type: 'danger' }
        case 2:
            return { text: '高级程序员', type: 'success' }
        case 3:
            return { text: '来源网络', type: 'info' }
        default:
            return { text: '未获得称号', type: 'info' }
        }
    }
}
export default FS

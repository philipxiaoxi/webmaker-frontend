const user = {
    /**
     * 登录，返回token
     * @param {String} phone 电话
     * @param {String} password 密码
     * @returns {import("axios").AxiosRequestConfig}
     */
    getToken(phone, password) {
        return {
            url: '/login',
            method: 'post',
            data: {
                phone: phone,
                password: password
            }
        }
    },
    /**
     * @typedef {Object} userInfo
     * @property {name} 名字
     * @property {sex} 性别
     * @property {email} 邮箱
     * @property {phone} 手机
     * @property {sign} 签名
     */
    /**
     * 修改用户信息
     * @param {userInfo} userInfo 用户信息
     * @returns {import("axios").AxiosRequestConfig}
     */
    updateUser(userInfo) {
        return {
            url: '/api/updateUser',
            method: 'post',
            data: userInfo
        }
    }
}

module.exports = user

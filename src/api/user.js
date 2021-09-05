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
    },
    /**
     * 发送注册验证邮件
     * @Ahthor: xiaoxi
     * @param {*} email
     */
    sendSignCode(email) {
        return {
            url: '/common/sendSignCode',
            method: 'post',
            data: {
                email: email
            }
        }
    },
    /**
     * 插入一个用户
     * @Ahthor: xiaoxi
     * @param {*} form
     */
    insertUser(form) {
        return {
            url: '/common/insertUser',
            method: 'post',
            data: form
        }
    }
}

module.exports = user

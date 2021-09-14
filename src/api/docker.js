const docker = {
    /**
     * 创建docker虚拟容器API
     * @Ahthor: xiaoxi
     * @param {*} password
     */
    createDocker(password) {
        return {
            url: '/api/dockerBuild',
            method: 'post',
            data: {
                password: password
            }
        }
    }
}

module.exports = docker

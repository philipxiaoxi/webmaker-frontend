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
    },
    /**
     * docker容器状态查询
     * @Ahthor: xiaoxi
     */
    dockerCheck() {
        return {
            url: '/api/dockerCheck',
            method: 'get',
            params: {
            }
        }
    }
}

module.exports = docker

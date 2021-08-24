const forum = {
    /**
     * 获取全部帖子
     * @returns
     */
    getAllForumPage(pageNum = 1) {
        return {
            url: '/common/getAllForumPage',
            method: 'get',
            params: {
                pageNum: pageNum
            }
        }
    },
    /**
     * 获取帖子详细信息
     * @returns
     */
    getForumPage(id = 1) {
        return {
            url: '/common/getForumPage',
            method: 'get',
            params: {
                id: id
            }
        }
    }

}

module.exports = forum

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
    },
    /**
     * 获取帖子回复列表
     * @returns
     */
    getForumReply(id = 1, pageNum = 1) {
        return {
            url: '/common/getForumReply',
            method: 'get',
            params: {
                id: id,
                pageNum: pageNum
            }
        }
    }
}

module.exports = forum

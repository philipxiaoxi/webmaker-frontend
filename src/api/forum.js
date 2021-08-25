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
    },
    /**
     * 帖子插入一个回复
     * @returns
     */
    insertForumReply(forumId, content, replyId = null) {
        return {
            url: '/api/insertForumReply',
            method: 'post',
            data: {
                forumId: forumId,
                content: content,
                replyId: replyId
            }
        }
    },
    /**
     * 获取一个详细回复
     * @returns
     */
    getForumReplyById(id) {
        return {
            url: '/common/getForumReply/' + id,
            method: 'get'
        }
    }
}

module.exports = forum

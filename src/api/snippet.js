const snippet = {
    /**
     * 获取用户代码片段
     * @param {String} id 用户id
     * @returns
     */
    getSnippetByUserid(pageNum = 1) {
        return {
            url: '/api/getSnippetByUserid',
            method: 'get',
            params: {
                pageNum: pageNum
            }
        }
    },
    /**
     * 获取全部代码片段
     * @returns
     */
    getAllSnippet(pageNum = 1) {
        return {
            url: '/common/getAllSnippet',
            method: 'get',
            params: {
                pageNum: pageNum
            }
        }
    },
    /**
     * 获取搜索代码片段
     * @returns
     */
    getSearchSnippet(pageNum = 1, searchKeyWord = '') {
        return {
            url: '/common/getSearchSnippet',
            method: 'get',
            params: {
                pageNum: pageNum,
                title: searchKeyWord
            }
        }
    },
    /**
     * 获取一个代码片段详细信息
     * @returns
     */
    getSnippet(id) {
        return {
            url: '/common/getSnippet',
            method: 'get',
            params: {
                id: id
            }
        }
    },
    /**
     * 获取一个代码片段详细信息
     * @returns
     */
    updateSnippet(snippet) {
        return {
            url: '/api/updateSnippet',
            method: 'post',
            data: snippet
        }
    },
    /**
     * 新建一个代码片段详细信息
     * @returns
     */
    insertSnippet(title, content) {
        return {
            url: '/api/insertSnippet',
            method: 'post',
            data: {
                title: title,
                content: content
            }
        }
    }

}

module.exports = snippet

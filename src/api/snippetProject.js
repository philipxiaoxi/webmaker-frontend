const snippetProject = {
    /**
     * 获取一个代码项目的目录结构
     * @returns
     */
    getSnippetProject(id) {
        return {
            url: '/common/getSnippetProject',
            method: 'get',
            params: {
                id: id
            }
        }
    },
    /**
     * 获取一个代码项目的文件
     * @returns
     */
    getSnippetProjectFile(url) {
        return {
            url: `/common/getSnippetProjectFile/${url}`,
            method: 'get'
        }
    },
    /**
     * 更新一个代码项目的文件
     * @returns
     */
    updateSnippetProjectFile(path, content) {
        return {
            url: '/api/updateSnippetProjectFile',
            method: 'post',
            data: {
                path: path,
                content: content
            }
        }
    },
    /**
     * 新建目录
     * @date 2021-05-31
     * @param {String} path 新建目录路径
     * @returns {any}
     */
    SnippetProjectNewDirectory(path) {
        return {
            url: '/api/SnippetProjectNewDirectory',
            method: 'post',
            data: {
                path: path
            }
        }
    },
    /**
     * 新建文件
     * @date 2021-05-31
     * @param {String} path 新建文件的路径
     * @param {String} name 新建文件名字
     * @returns {any}
     */
    SnippetProjectNewFile(path, name) {
        return {
            url: '/api/SnippetProjectNewFile',
            method: 'post',
            data: {
                path: path,
                name: name
            }
        }
    },
    /**
     * 删除文件或文件夹
     * @date 2021-05-31
     * @param {String} path 删除的文件或目录路径
     * @returns {any}
     */
    SnippetProjectDelFile(path) {
        return {
            url: '/api/SnippetProjectDelFile',
            method: 'post',
            data: {
                path: path
            }
        }
    },
    /**
     * 重命名文件或文件夹
     * @date 2021-05-31
     * @param {String} path 原先路径
     * @param {String} new_path 新路径
     * @returns {any}
     */
    SnippetProjectReName(path, new_path) {
        return {
            url: '/api/SnippetProjectReName',
            method: 'post',
            data: {
                path: path,
                new_path: new_path
            }
        }
    },
    /**
     * 新建一个代码项目
     * @date 2021-06-01
     * @param {any} title 代码项目标题
     * @returns {any}
     */
    insertSnippetProject(title) {
        return {
            url: '/api/insertSnippetProject',
            method: 'post',
            data: {
                title: title
            }
        }
    },
    /**
     * 移动文件夹或文件
     * @date 2021-06-01
     * @param {any} path
     * @param {any} new_path
     * @returns {any}
     */
    SnippetProjectMoveFile(path, new_path) {
        return {
            url: '/api/SnippetProjectReName',
            method: 'post',
            data: {
                path: path,
                new_path: new_path
            }
        }
    }
}

module.exports = snippetProject

const snippet = require('./snippet')
const user = require('./user')
const snippetProject = require('./snippetProject')
const forum = require('./forum')
const docker = require('./docker')
const API = {
    server: 'xxxxxxxxxxx',
    wsServer: 'xxxxxxxxxxxxxxxxxx',
    snippet: snippet,
    user: user,
    snippetProject: snippetProject,
    forum: forum,
    docker: docker,
    getServer() {
        return this.server || location.origin
    }
}
module.exports = API

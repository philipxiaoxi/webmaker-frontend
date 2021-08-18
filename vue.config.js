const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
// vue.config.js
module.exports = {
    configureWebpack: {
        plugins: [
            new MonacoWebpackPlugin()
        ]
    },
    devServer: {
        disableHostCheck: true
    }
}

const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// vue.config.js
module.exports = {
    configureWebpack: {
        plugins: [
            new MonacoWebpackPlugin(),
            new UglifyJsPlugin({
                uglifyOptions: {
                    warnings: false,
                    compress: {
                        drop_console: true,
                        drop_debugger: false,
                        pure_funcs: ['console.log']
                    }
                }
            })
        ]
    },
    devServer: {
        disableHostCheck: true
    }
}

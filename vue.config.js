const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const JavaScriptObfuscator = require('webpack-obfuscator')

function getPlugins() {
    const plugins = [new MonacoWebpackPlugin()]
    if (process.env.NODE_ENV === 'production') {
        plugins.push(
            new UglifyJsPlugin({
                uglifyOptions: {
                    warnings: false,
                    compress: {
                        drop_console: true,
                        drop_debugger: false,
                        pure_funcs: ['console.log']
                    }
                }
            }),
            new JavaScriptObfuscator({
                rotateUnicodeArray: true
            })
        )
    } else {
        plugins.push()
    }
    return plugins
}

// vue.config.js
module.exports = {
    publicPath: './',
    configureWebpack: {
        plugins: getPlugins()
    },
    devServer: {
        disableHostCheck: true
    }
}

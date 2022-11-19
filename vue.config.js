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
    },
    pwa: {
        name: 'WebMaker',
        themeColor: '#FFFFFF',
        msTileColor: '#FFFFFF',
        assetsVersion: 'v0.6.0',
        workboxPluginMode: 'GenerateSW', // 也可以定义为‘InjectManifest’模式。但是需自己写SW.js文件进行配置
        workboxOptions: {
            importWorkboxFrom: 'local', // 从''cdn"导入workbox,也可以‘local’
            skipWaiting: true, // 安装完SW不等待直接接管网站
            clientsClaim: true,
            navigateFallback: '/index.html'

        }
    }
}

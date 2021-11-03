const html5 =
`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>
`

const vue2Templete =
`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vue 2 Demo</title>
    <script src="https://cdn.bootcdn.net/ajax/libs/vue/2.6.14/vue.min.js"></script>
</head>

<!-- 这里写CSS -->
<style>

</style>

<body>
    <div id="app">
        {{ message }}
    </div>
    
    <!-- 这里写脚本 -->
    <script>
    let app = new Vue({
        el: '#app',
        data: {
            message: 'Hello Vue!'
        }
    })
    </script>
</body>
</html>
`

const vue3Templete =
`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vue 3 Demo</title>
    <script src="https://cdn.bootcdn.net/ajax/libs/vue/3.2.0-beta.7/vue.global.min.js"></script>
</head>

<!-- 这里写CSS -->
<style>
.demo {
    font-family: sans-serif;
    border: 1px solid #eee;
    border-radius: 2px;
    padding: 20px 30px;
    margin-top: 1em;
    margin-bottom: 40px;
    user-select: none;
    overflow-x: auto;
}
</style>

<body>
    <div id="app" class="demo">
        {{ message }}
    </div>
    
    <!-- 这里写脚本 -->
    <script>
    const HelloVueApp = {
        data() {
            return {
            message: 'Hello Vue!!'
            }
        }
    }
    Vue.createApp(HelloVueApp).mount('#app')
    </script>
</body>
</html>
`

const elementPlus =
`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vue 3 elementPlus Demo</title>
    <!-- 导入样式 -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/element-plus/dist/index.css" />
    <!-- 导入 Vue 3 -->
    <script src="https://cdn.jsdelivr.net/npm/vue@next"></script>
    <!-- 导入组件库 -->
    <script src="https://cdn.jsdelivr.net/npm/element-plus"></script>
</head>

<!-- 这里写CSS -->
<style>

</style>

<body>
    <div id="app">
        <el-button type="primary">{{ message }}</el-button>
    </div>
    
    <!-- 这里写脚本 -->
    <script>
    const HelloVueApp = {
        data() {
            return {
            message: '欢迎使用element-plus'
            }
        }
    }
    const app = Vue.createApp(HelloVueApp)
    app.use(ElementPlus)
    app.mount("#app")
    </script>
</body>
</html>
`

const elementUi =
`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vue 2 element-ui Demo</title>
    <script src="https://cdn.bootcdn.net/ajax/libs/vue/2.6.14/vue.min.js"></script>
    <!-- 引入样式 -->
    <link href="https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.3/theme-chalk/index.min.css" rel="stylesheet">
    <!-- 引入组件库 -->
    <script src="https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.3/index.min.js"></script>
</head>

<!-- 这里写CSS -->
<style>

</style>

<body>
    <div id="app">
        <el-button type="primary">{{ message }}</el-button>
    </div>
    
    <!-- 这里写脚本 -->
    <script>
    let app = new Vue({
        el: '#app',
        data: {
            message: '欢迎使用 element-ui!'
        }
    })
    </script>
</body>
</html>
`


export {
    vue2Templete, vue3Templete, elementPlus, elementUi, html5
}

<template>
  <div id="app">
    <index></index>
  </div>
</template>


<script>
import Index from './views/Index.vue'
export default {
    components: { Index },
    mounted() {
        const res = localStorage.getItem('token')
        if (res != null) {
            this.$store.commit('setToken', { data: res })
            this.getUserInfo()
        }
    },
    created() {
        const loading = document.getElementById('loading')
        if (loading !== null) {
            document.body.removeChild(loading)
        }
    },
    methods: {
        getUserInfo() {
            const p = new Promise((resolve) => {
                this.axios.get('/api/getUserInfo').then(res => {
                    resolve(res)
                    this.$message({
                        message: `欢迎您回来，${res.data.data.name || 'coder~ 您还未设置昵称，请尽快设置您的昵称。'}`,
                        type: 'success'
                    })
                    this.$store.commit('setUserInfo', res.data.data)
                }).catch((e) => {
                    console.log(e)
                    this.$message.error(e)
                    localStorage.clear('token')
                    this.$store.commit('setToken', null)
                })
            })
            return p
        }
    }
}
</script>

<style lang="less">
body {
  margin: 0px;
  padding: 0px;
  background-color: #f2f3f5;
}
*::-webkit-scrollbar {
    width: 5px;
}

*::-webkit-scrollbar-track {
    background: #f6f6f6;
    border-radius: 2px;
}

*::-webkit-scrollbar-thumb {
    background: #aaa;
    border-radius: 2px;
}

*::-webkit-scrollbar-thumb:hover {
    background: #747474;
    /* width: px;*/
}

*::-webkit-scrollbar-corner {
    background: #f6f6f6;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
// 规定图标颜色
.iconfont {
    &.icon-typescript {
        color: rgb(2, 136, 209);
    }
    &.icon-javascript {
        color: rgb(255, 202, 40);
    }
    &.icon-html {
        color: rgb(228, 77, 38);
    }
    &.icon-css {
        color:rgb(66, 165, 245);
    }
    &.icon-image {
        color: rgb(38, 166, 154);
    }
    &.icon-json {
        color: rgb(251, 192, 45);
    }
    &.icon-file {
        color: rgb(66, 165, 245);
    }
    &.icon-folder-circleci {
        color: rgb(66, 165, 245);
    }
}
</style>

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
                        message: `欢迎您回来，${res.data.data.name}`,
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
</style>

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        id: 'father',
        token: '',
        userInfo: { phone: '未登录' },
        auth: 'userId',
        extra: ''
    },
    getters: {
        userId: (state) => state.userInfo.id,
        token: (state) => state.token,
        userInfo: (state) => state.userInfo,
        auth: (state) => state.auth,
        extra: (state) => state.extra
    },
    mutations: {
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo
        },
        setToken(state, token) {
            state.token = token
        },
        setAuth(state, auth) {
            state.auth = auth
        },
        setExtra(state, extra) {
            state.extra = extra
        }
    },
    actions: {
    },
    modules: {
    }
})

import Vue from 'vue'
import VueRouter from 'vue-router'
import CodeSquare from '../views/CodeSquare.vue'
import Editor from '../views/Editor.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'CodeSquare',
        component: CodeSquare
    },
    {
        path: '/editor',
        name: 'Editor',
        component: Editor
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    }
]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

export default router

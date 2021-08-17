import Vue from 'vue'
import VueRouter from 'vue-router'
import CodeSquare from '../views/CodeSquare.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'CodeSquare',
        component: CodeSquare
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router

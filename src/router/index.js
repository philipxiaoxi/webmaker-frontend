import Vue from 'vue'
import VueRouter from 'vue-router'
import CodeSquare from '../views/CodeSquare.vue'
import Editor from '../views/Editor.vue'
import Login from '../views/Login.vue'
import My from '../views/My.vue'
import Search from '../views/Search.vue'
import MyCodes from '../views/MyCodes.vue'
import Forum from '../views/Forum.vue'
import ForumPage from '../views/ForumPage.vue'
import NewForumPage from '../views/NewForumPage.vue'
import Register from '../views/Register.vue'
import DockerManager from '../views/DockerManager.vue'
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
    },
    {
        path: '/my',
        name: 'My',
        component: My
    },
    {
        path: '/search',
        name: 'Search',
        component: Search
    },
    {
        path: '/My-codes',
        name: 'MyCodes',
        component: MyCodes
    },
    {
        path: '/forum',
        name: 'Forum',
        component: Forum
    },
    {
        path: '/forumpage',
        name: 'ForumPage',
        component: ForumPage
    },
    {
        path: '/newforumpage',
        name: 'NewForumPage',
        component: NewForumPage
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/dockermanager',
        name: 'DockerManager',
        component: DockerManager
    }
]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

export default router

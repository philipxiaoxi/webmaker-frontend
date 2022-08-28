import Vue from 'vue'
import VueRouter from 'vue-router'
// import CodeSquare from '../views/CodeSquare.vue'
// import Editor from '../views/Editor.vue'
// import Login from '../views/Login.vue'
// import My from '../views/My.vue'
// import Search from '../views/Search.vue'
// import MyCodes from '../views/MyCodes.vue'
// import Forum from '../views/Forum.vue'
// import ForumPage from '../views/ForumPage.vue'
// import NewForumPage from '../views/NewForumPage.vue'
// import Register from '../views/Register.vue'
// import DockerView from '../views/DockerView.vue'
// import ToolBox from '../views/ToolBox.vue'
// import LowCode from '../views/LowCode.vue'
// import Container from '../views/mircoAppView/Container.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'CodeSquare',
        // component: CodeSquare,
        component: () => import('../views/CodeSquare.vue')
    },
    {
        path: '/editor',
        name: 'Editor',
        // component: Editor,
        component: () => import('../views/Editor.vue')
    },
    {
        path: '/login',
        name: 'Login',
        // component: Login,
        component: () => import('../views/Login.vue')
    },
    {
        path: '/my',
        name: 'My',
        // component: My,
        component: () => import('../views/My.vue')
    },
    {
        path: '/search',
        name: 'Search',
        // component: Search,
        component: () => import('../views/Search.vue')
    },
    {
        path: '/My-codes',
        name: 'MyCodes',
        // component: MyCodes,
        component: () => import('../views/MyCodes.vue')
    },
    {
        path: '/forum',
        name: 'Forum',
        // component: Forum,
        component: () => import('../views/Forum.vue')
    },
    {
        path: '/forumpage',
        name: 'ForumPage',
        // component: ForumPage,
        component: () => import('../views/ForumPage.vue')
    },
    {
        path: '/newforumpage',
        name: 'NewForumPage',
        // component: NewForumPage,
        component: () => import('../views/NewForumPage.vue')
    },
    {
        path: '/register',
        name: 'Register',
        // component: Register,
        component: () => import('../views/Register.vue')
    },
    {
        path: '/dockerview',
        name: 'dockerview',
        // component: DockerView,
        component: () => import('../views/DockerView.vue')
    },
    {
        path: '/toolbox',
        name: 'toolbox',
        // component: ToolBox,
        component: () => import('../views/ToolBox.vue')
    },
    {
        path: '/lowcode',
        name: 'lowcode',
        // component: LowCode,
        component: () => import('../views/LowCode.vue')
    },
    {
        path: '/container*',
        name: 'container',
        // component: Container,
        component: () => import('../views/mircoAppView/Container.vue')
    }

]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

export default router

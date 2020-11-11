import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
Vue.use(VueRouter)
const routes = [
    //Auth

    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ( /* webpackChunkName: "login" */ '../pages/auth/Login.vue')
    }, {
        path: '/',
        name: 'Home',
        component: () =>
            import ( /* webpackChunkName: "home" */ '../pages/Home.vue')
    },
    {
        path: '/add',
        name: 'Add',
        component: () =>
            import ( /* webpackChunkName: "home" */ '../pages/Add.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})


router.beforeEach((to, from, next) => {
    if (to.name == 'Login') {
        console.log(store.state.auth.authenticated)
    }
    next()
})
export default router
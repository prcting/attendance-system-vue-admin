import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import axios from "axios";
import store from "@/store";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            {
                path: '/index',
                name: 'Index',
                component: () => import('../views/Index.vue')
            },
            {
                path: '/sys/user',
                name: 'User',
                component: () => import('../views/sys/User.vue')
            },
            {
                path: '/userCenter',
                name: 'UserCenter',
                component: () => import('../views/UserCenter.vue')
            },
            {
                path: '/sys/role',
                name: 'Role',
                component: () => import('../views/sys/Role.vue')
            },
            {
                path: '/sys/menu',
                name: 'Menu',
                component: () => import('../views/sys/Menu.vue')
            },
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    let hasRoute = store.state.menus.hasRoute
    let menus = store.state.menus.menuList
    let token = localStorage.getItem("token")
    if (to.path == '/login') {
        console.log("login!!!!!!!!!!!")
        next()
    } else if (!token) {
        console.log("还没有token！！！")
        next({path: "/login"})
    }else if (to.path == '/' || to.path == '') {
        next({path: "/index"})
    }else if (!hasRoute) {
        let newRoutes = router.options.routes;
        axios.get("/sys/menu/nav", {headers:{
                Authorization: localStorage.getItem("token")
            }}).then(res => {
            console.log(res.data.data)
            store.commit("setMenuList", res.data.data.nav)
            store.commit("setPermList", res.data.data.authoritys)
            res.data.data.nav.forEach(menu => {
                if (menu.children) {
                    menu.children.forEach(e => {
                        let route = menuToRoute(e)
                        if(route) {
                            newRoutes[0].children.push(route)
                        }
                    })
                }
            })
            console.log("oldRoutes---------------")
            console.log(newRoutes)
            router.addRoutes(newRoutes)
            store.commit("changeRouteStatus", true)
            next({path: to.path})
        })
    } else {
        console.log("已经有路由了------------")
        next()
    }
})
const menuToRoute = (menu) => {
    console.log("正在添加menu--》")
    console.log(menu)
    if (!menu.component) {
        return null
    }
    // 复制属性
    let route = {
        name: menu.name,
        path: menu.path,
        meta: {
            icon: menu.icon,
            title: menu.title
        }
    }
    route.component = () => import('@/views/' + menu.component +'.vue')
    return route
}

export default router

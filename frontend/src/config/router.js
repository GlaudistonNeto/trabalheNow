import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/home/Home'
import AdminPages from '@/components/admin/AdminPages'
import EmployerPages from '@/components/employer/EmployerPages'
import ArticlesByCategory from '@/components/article/ArticlesByCategory'
import ArticleById from '@/components/article/ArticleById'
import WorkerPages from '@/components/worker/WorkerPages'
import PortfoliosByCategory from '@/components/portfolio/PortfoliosByCategory'
import PortfolioById from '@/components/portfolio/PortfolioById'
import Auth from '@/components/auth/Auth'

import { userKey } from '@/global'

Vue.use(VueRouter)

const routes = [{
    name: 'home',
    path: '/',
    component: Home
}, {
    name: 'adminPages',
    path: '/admin',
    component: AdminPages,
    meta: { requiresAdmin: true }
}, {
    name: 'employerPages',
    path: '/employer',
    component: EmployerPages,
    meta: { requiresEmployer: true }
}, {
    name: 'workerPages',
    path: '/worker',
    component: WorkerPages,
    meta: { requiresWorker: true }
}, {
    name: 'portfoliosByCategory',
    path: '/categories/:id/portfolios',
    component: PortfoliosByCategory
}, {
    name: 'portfolioById',
    path: '/portfolios/:id',
    component: PortfolioById
}, {
    name: 'articlesByCategory',
    path: '/categories/:id/articles',
    component: ArticlesByCategory
}, {
    name: 'articleById',
    path: '/articles/:id',
    component: ArticleById
}, {
    name: 'auth',
    path: '/auth',
    component: Auth
}]

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    const json = localStorage.getItem(userKey)

    if(to.matched.some(record => record.meta.requiresAdmin)) {
        const user = JSON.parse(json)
        user && user.admin ? next() : next({ path: '/' })
    } else {
        next()
    }

    if(to.matched.some(record => record.meta.requiresEmployer)) {
        const user = JSON.parse(json)
        user && user.employer ? next() : next({ path: '/' })
    } else {
        next()
    }

    if(to.matched.some(record => record.meta.requiresWorker)) {
        const user = JSON.parse(json)
        user && user.worker ? next() : next({ path: '/' })
    } else {
        next()
    }
})

export default router

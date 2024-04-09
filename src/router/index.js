import LogIn from "../pages/LogInPage.vue";
import Main from "../pages/MainPage.vue";
import Post from "../pages/PostPage.vue"
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        component: LogIn,
    },
    {
        path: '/Main',
        component: Main,
    },
    {
        path: '/Post/:id',
        component: Post,
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(import.meta.env.BASE_URL)
})

export default router;
        
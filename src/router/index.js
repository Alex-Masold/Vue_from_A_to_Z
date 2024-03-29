import Main from "../pages/Main.vue";
import PostPage from "../pages/PostPage.vue"
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        component: Main,
    },
    {
        path: '/Post/:id',
        component: PostPage,
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(import.meta.env.BASE_URL)
})

export default router;

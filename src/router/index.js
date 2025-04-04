import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import { createRouter, createWebHistory } from 'vue-router';
import TodoList from '../pages/TodoList.vue';

const routes = [
    { path:'/login', component: Login },
    { path:'/register', component: Register },
    { path: '/', redirect: '/login' },
    { path: '/todos', component: TodoList },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});


export default router;
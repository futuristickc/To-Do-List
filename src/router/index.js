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

// Navigation Guard
router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register'];
    const authRequired = !publicPages.includes(to.path);
    const token = localStorage.getItem('token');

    console.log(`[NAV GUARD] Navigating to ${to.path}, token: ${token}`);
  
    if (authRequired && !token) {
        console.log("[NAV GUARD] No token, redirecting to login");
      return next('/login'); // Redirect to login if not logged in
    }
  
    if ((to.path === '/login' || to.path === '/register') && token) {
        console.log("[NAV GUARD] Already logged in, redirecting to /todos");
      return next('/todos'); // Redirect logged in users away from login/register
    }
  
    next(); // Allow navigation
  });


export default router;
// src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '@/views/Home.vue';
import Register from '@/views/Register.vue';
import Dashboard from '@/views/Dashboard.vue';
import Settings from '@/views/Settings.vue';
import Board from '@/views/Board.vue';
import NotFound from '@/components/errors/404.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: {
      breadcrumb: 'Page Not Found'
    }
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      breadcrumb: 'Home'
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true,
      breadcrumb: 'Dashboard'
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: {
      requiresAuth: true,
      breadcrumb: 'Settings'
    }
  },
  {
    path: '/board/:id',
    name: 'Board',
    component: Board,
    props: true,
    meta: {
      requiresAuth: true,
      breadcrumb: 'Board'
    }
  }
];

const router = createRouter({ history: createWebHistory("/"), routes });

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.matched.some(record => record.meta.requiresAuth) && !token) {
    next({ name: 'Home' });
  } else {
    next();
  }
});

export default router;

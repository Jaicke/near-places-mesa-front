import Vue from 'vue';
import VueRouter from 'vue-router';

import Registration from '../views/Registration'
import Session from '../views/Session'
import Home from '../views/Home'
import Profile from '../views/Profile'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: {
      name: 'sessions'
    }
  },
  {
    path: '/registrations',
    name: 'registrations',
    component: Registration,
  },
  {
    path: '/sessions',
    name: 'sessions',
    component: Session
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;

import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/complex',
    name: 'Complex',
    component: () => import(/* webpackChunkName: "about" */ '../views/complex/Student.vue')
  },
  {
    path: '/intelligent',
    name: 'Intelligent',
    component: () => import(/* webpackChunkName: "about" */ '../views/intelligent/Student.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

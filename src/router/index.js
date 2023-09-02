import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import HomeView from '@/views/HomeView.vue'
import TaskListView from '@/views/TaskListView.vue'
import SettingsView from '@/views/SettingsView.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: {
      loginRequired: true
    }
  },
  {
    path: '/tasks',
    name: 'TaskList',
    component: TaskListView,
    meta: {
      loginRequired: true
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: SettingsView,
    meta: {
      loginRequired: true
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.loginRequired)) {
    if (store.state.me) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router

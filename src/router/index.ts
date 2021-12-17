import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from "../view/Login.vue"
import Layout from "../view/Layout.vue"
import Admin from "../view/admin/Admin.vue"
import Leader from "../view/leader/Leader.vue"
import GroupManager from "../view/admin/GroupManager.vue"
import CompetitionManager from "../view/admin/CompetitionManager.vue"
import TeamManager from "../view/admin/TeamManager.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: {
      name: 'Login'
    },
    children: [
      {
        path: 'admin',
        name: 'Admin',
        component: Admin,
        redirect: {
          name: 'CompetitionManager'
        },
        children: [
          {
            path: 'group',
            name: 'GroupManager',
            component: GroupManager,
          },
          {
            path: 'competition',
            name: 'CompetitionManager',
            component: CompetitionManager,
          },
          {
            path: 'team',
            name: 'TeamManager',
            component: TeamManager,
          }
        ]
      },
      {
        path: 'leader',
        name: 'Leader',
        component: Leader,
      },
      {
        path: 'judge',
        name: 'Judge',
        component: Admin,
      }
    ]
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

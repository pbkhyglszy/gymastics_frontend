import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import Login from "../view/Login.vue"
import Layout from "../view/Layout.vue"
import Admin from "../view/admin/Admin.vue"
import Leader from "../view/leader/Leader.vue"
import GroupManager from "../view/admin/GroupManager.vue"
import CompetitionManager from "../view/admin/CompetitionManager.vue"
import TeamManager from "../view/admin/TeamManager.vue"
import ProgressManager from "../view/admin/ProgressManager.vue"
import RefereeBase from "../view/judge/RefereeBase.vue"
import RefereeScore from "../view/judge/RefereeScore.vue"
import RefereeSelect from "../view/judge/RefereeSelect.vue"
import ChiefReferee from "../view/judge/ChiefReferee.vue"

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
                    },
                    {
                        path: 'progress',
                        name: 'ProgressManager',
                        component: ProgressManager,
                    }
                ]
            },
            {
                path: 'leader',
                name: 'Leader',
                component: Leader,
            },
            {
                path: 'referee',
                name: 'Referee',
                component: RefereeBase,
                children: [
                    {
                        path: '',
                        name: 'RefereeSelect',
                        component: RefereeSelect,
                    },
                    {
                        path: 'score',
                        name: 'RefereeScore',
                        component: RefereeScore,
                    },
                    {
                        path: 'chief',
                        name: 'ChiefReferee',
                        component: ChiefReferee,
                    }
                ]
            }
        ]
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router

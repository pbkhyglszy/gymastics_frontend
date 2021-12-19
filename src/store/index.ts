import {createStore, Store} from 'vuex'
import {getAllAgeGroups, getAllEvents} from "../api/competition";
import {getProgress} from "../api/misc";

export interface State {
    ageGroups?: Array<AgeGroup>,
    competitionEvents?: Array<EventType>,
    authToken: string | null,
    userName: string,
    loginName: string,
    progress: number,
}

export default createStore<State>({
    state: {
        ageGroups: [],
        competitionEvents: [],
        authToken: sessionStorage.getItem('token'),
        userName: '',
        loginName: '',
        progress: 0,
    },
    mutations: {
        invalidateEvents(state) {
            state.ageGroups = [];
            state.competitionEvents = [];
        },

        updateEvents(state: State, payload: { ageGroups?: Array<AgeGroup>, competitionEvents?: Array<EventType> }) {
            if (payload.ageGroups) {
                state.ageGroups = payload.ageGroups
            }
            if (payload.competitionEvents) {
                state.competitionEvents = payload.competitionEvents
            }
        },
        setToken(state, val) {
            state.authToken = val
            sessionStorage.setItem('token', val)
        },
        clearToken(state) {
            state.authToken = ''
            sessionStorage.setItem('token', '')
        },
        updateLogin(state, payload: {
            userName: string,
            loginName: string,
        }) {
            state.loginName = payload.loginName;
            state.userName = payload.userName
        },
        updateProgress(state, progress?: number) {
            if (typeof progress === 'undefined') {
                state.progress = 0
            } else {
                state.progress = progress
            }
        },

    },
    actions: {
        updateEvents({commit}) {
            return Promise.all([
                getAllEvents().then((result) => commit('updateEvents', {competitionEvents: result})),
                getAllAgeGroups().then((result) => commit('updateEvents', {ageGroups: result})),
            ]).catch((reason => {
                //TODO: 报错
            }))
        },

        tryUpdateEvents({dispatch, state}) {
            if (state.ageGroups || state.competitionEvents) {
                return dispatch('updateEvents')
            }
        },

        updateProgress({commit}) {
            return getProgress().then((result) => commit('updateProgress', result.data))
        }
    },
    modules: {},
})


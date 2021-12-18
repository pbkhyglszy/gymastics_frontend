import {createStore, Store} from 'vuex'
import {getAllAgeGroups, getAllEvents} from "../api/competition";

interface State {
    ageGroups?: Array<AgeGroup>,
    competitionEvents?: Array<EventType>,
}

export default createStore<State>({
    state: {
        ageGroups: [],
        competitionEvents: [],
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

         tryUpdateEvents({dispatch}, state) {
            if (state.ageGroups || state.competitionEvents) {
                return dispatch('updateEvents')
            }
        }
    },
    modules: {},
})


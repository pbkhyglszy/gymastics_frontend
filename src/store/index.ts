import { createStore } from 'vuex'

export default createStore({
  state: {
    currentDirectory: -1,
    updateIndex: 0,
  },
  mutations: {
    changeDirectory(state, dirId: number) {
      state.currentDirectory = dirId;
    },
    refresh(state) {
      state.updateIndex++;
    },
  },
  actions: {
  },
  modules: {
  },
})

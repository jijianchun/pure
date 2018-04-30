import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: ''
  },
  mutations: {
    setUser (state, obj) {
      state.user = obj
    }
  },
  actions: {
    setUser ({commit}, obj) {
      commit('setUser', obj)
    }
  },
  getters: {
    getUser: state => {
      return state.user
    }
  },
  modules: {
  }
})
export default store

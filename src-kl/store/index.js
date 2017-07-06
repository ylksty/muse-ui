/**
 * Created by yanglk on 17/7/6.
 */
import Vuex from 'vuex'
import Vue from 'vue'
import Sudocu from './modules/sudocu'

Vue.use(Vuex)
export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    }
  },
  modules: {
    Sudocu
  },
  getters: {
    countShowRoot: state => {
      return state.count
    }
  }
})

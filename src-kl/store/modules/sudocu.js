import * as types from '../mutations_types.js'
import * as local from '../lib/localStorage'

let state = {
  count: 0,
  list: [1, 2, 3],
  sudoculist: local.kangleUser.get('sudoculist')
}
let getters = {
  [types.SUDOCU_G_DATA_LIST_GET]: state => {
    return state.sudoculist
  }
}
let actions = {
  [types.SUDOCU_F_DATA_ADD] ({commit}, data) {
    commit(types.SUDOCU_M_DATA_ADD, data)
  }
}
let mutations = {
  [types.SUDOCU_M_DATA_ADD] (state, obj) {
    let a = local.kangleUser.get('sudoculist')
    if (a && a.length >= 5) {
      a.splice(4, a.length - 4)
      local.kangleUser.set('sudoculist', a)
    }
    local.kangleUser.lpush('sudoculist', obj)
    state.sudoculist = local.kangleUser.get('sudoculist')
  }
}
export default {
  state,
  actions,
  mutations,
  getters
}

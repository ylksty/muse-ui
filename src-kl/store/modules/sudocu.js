import * as types from '../mutations_types.js'
import * as local from '../lib/localStorage'

let state = {
  count: 0,
  list: [1, 2, 3]
}
let actions = {
  snapshotStoreAdd ({commit}, data) {
    commit(types.SUDOCU_DATA_ADD, data)
  }
}
let mutations = {
  [types.SUDOCU_DATA_ADD] (states, obj) {
    console.log(obj)
    local.kangleUser.set('abc', obj)
  }
}
let getters = {
  countShow: state => {
    return state.count
  },
  abc: state => {
    return {'a': 'sab'}
  }
}
export default {
  state,
  actions,
  mutations,
  getters
}

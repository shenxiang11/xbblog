import * as types from './mutation-types'

const mutations = {
  [types.SET_TOKEN](state, token) {
    if (!token) {
      localStorage.removeItem('__TOKEN__', token)
    } else {
      localStorage.setItem('__TOKEN__', token)
    }
    state.token = token
  },
  [types.SET_USER](state, user) {
    state.user = user
  },
  [types.SET_REGISTERPOPUP](state, registerPopup) {
    state.registerPopup = registerPopup
  },
  [types.SET_LOGINPOPUP](state, loginPopup) {
    state.loginPopup = loginPopup
  }
}

export default mutations

import * as types from './mutation-types'

// 初始调用方法
export function nuxtServerInit ({ commit, dispatch }, { req }) {

}

// 获取验证码
export function getCaptcha({ commit }, mail) {
  return this.$axios.$get('/api/auth/captcha', {
    params: {
      mail
    }
  })
}

// 注册
export function regieter({ commit }, { mail, password, repassword, captcha }) {
  return this.$axios.$post('/api/auth/register', {
    mail,
    password,
    repassword,
    captcha
  })
}

// 登录
export function login({ commit }, { mail, password }) {
  return this.$axios.$post('/api/auth/login', {
    mail,
    password
  })
    .then(res => {
      commit(types.SET_LOGINPOPUP, false)
      commit(types.SET_TOKEN, res.result.token)
      commit(types.SET_USER, res.result.user)
    })
}

// 获取用户信息
export function getUserinfo({ commit }) {
  return this.$axios.$get('/api/auth/info')
    .then(res => {
      commit(types.SET_USER, res.result)
    })
}

export function updateUserinfo({ commit }, { _id, website, nickname, portrait}) {
  const formData = new FormData()

  portrait && formData.append('portrait', portrait)
  formData.append('website', website)
  formData.append('nickname', nickname)

  return this.$axios.$patch(`/api/auth/update-info/${_id}`, formData)
    .then(res => {
      commit(types.SET_USER, res.result)
    })
}

export function logout({ commit }) {
  commit(types.SET_TOKEN, null)
  commit(types.SET_USER, null)
}

export function showRegister({ commit }) {
  commit(types.SET_LOGINPOPUP, false)
  commit(types.SET_REGISTERPOPUP, true)
}

export function showLogin({ commit }) {
  commit(types.SET_LOGINPOPUP, true)
  commit(types.SET_REGISTERPOPUP, false)
}

export function guestbook({ commit }, message) {
  return this.$axios.$post('/api/guestbook/message', {
    message
  })
}

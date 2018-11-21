export default ({ app, store }) => {
  store.commit('SET_TOKEN', localStorage.getItem('__TOKEN__'))

  app.$axios.interceptors.request.use(config => {
    if (store.state.token) {
      config.headers.Authorization = `Bearer ${store.state.token}`
    }
    return config
  })

  app.$axios.interceptors.response.use(response => {
    return response
  }, error => {
    if (error.response.status === 401) {
      store.commit('SET_TOKEN', null)
      store.commit('SET_USER', null)
    }
    return Promise.reject(error)
  })

  localStorage.getItem('__TOKEN__') && store.dispatch('getUserinfo')
}

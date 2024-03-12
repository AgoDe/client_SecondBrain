import { defineStore } from 'pinia'
import alertHelper from '@/helpers/alertHelper'

const baseUrl = (import.meta.env.VITE_API_URL || '<<ENV_BASE_URL>>') + '/Auth'

export const useAuthStore = defineStore({
  id: 'auth',

  state: () => ({
    user: {},
    token: localStorage.getItem('token'),
    error: null,
    isLoading: false,
  }),
  actions: {
    setUserInfo(payload) {
      this.token = payload.data.token
      this.user = payload.data.user
      localStorage.setItem('token', payload.data.token)
    },


    resetUserInfo() {
      this.token = null
      this.user = {}
      localStorage.removeItem('token')
      axios.defaults.headers.common['Authorization'] = null
    },

    userLogin(data) {
      console.log(data)
      this.isLoading = true
      axios
        .post(`${baseUrl}/Login`, data)
        .then((res) => {
          console.log(res)
          this.setUserInfo(res)
          this.router.push({ name: 'account.index' })
          alertHelper.toast('success', 'login.success')
          this.isLoading = false
        })
        .catch((err) => {
          this.isLoading = false
          console.log(err)
          // if (err.response?.status === 401) {
          //   alertHelper.simpleAlert('error', 'login.failed', 'login.failed_text')
          // } else {
          //   alertHelper.simpleAlert('error', 'server_error.title', 'server_error.message')
          // }
        })
    },

    async userLogout() {
      axios
        .delete(`${baseUrl}/logout`)
        .then((res) => {
          this.resetUserInfo()
          alertHelper.toast('success', 'logout.success')
          this.router.push({ name: 'login' })
        })
        .catch((err) => {
          alertHelper.toast('error', 'logout.failed')
        })
    },

  },
  getters: {
    getToken() {
      return this.token
    },
    getUserID(state) {
      return state.user?.id
    },
    getUserEmail(state) {
      return state.user?.email
    },
    isLoggedIn(state) {
      return state.token ? true : false
    },
    getIsLoading(state) {
      return state.isLoading
    }
  },

  persist: true
})

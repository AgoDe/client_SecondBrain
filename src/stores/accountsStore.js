import { defineStore } from 'pinia'
import dayjs from 'dayjs'
//import { useSessionStore } from '@/stores/sessionStore'
import axios from 'axios'

import axiosRequests from '@/helpers/axiosRequests'

// for use router in store // this.router

const baseUrl = '/account'

export const useAccountsStore = defineStore({
  id: 'accounts',

  state: () => ({
    //sessionStore: useSessionStore(),

    isLoading: false,

    account: {
      id: 0,
      name: null,
      initialBalance: null,
    },

    accounts: [],

    activeFilters: [],

    searchResult: [],

    filters: {
      ascending: true,
      search: null,
      orderBy: null,
      pageNumber: 1,
      pageSize: 10,
    },
    pagination: {
      totalCount: 0,
      totalPages: 0,
      pageSize: 10,
      pageNumber: 1,
      offset: 0
    }


  }), // END of state

  actions: {
    //fetching requests from API
    async fetchAccounts() {
      console.log('fetching accounts')
      this.isLoading = true
      const query = this.setQueryFilters()
      const path = `${baseUrl}?${query}`
      let res = await axiosRequests.fetch(path)
      console.log(res)
      this.accounts = res.result
      this.pagination.totalCount = res.pagination.totalCount
      this.pagination.totalPages = res.pagination.totalPages
      this.pagination.pageNumber = res.pagination.pageNumber    
      this.pagination.pageSize = res.pagination.pageSize
      this.pagination.offset = res.pagination.offset
      this.isLoading = false
    },

    async fetchAccount(id) {
      console.log('fetch account ' + id)
      this.isLoading = true
      const path = `${baseUrl}/${id}`
      let res = await axiosRequests.fetch(path)
      console.log(res.result)
      this.account = res.result
      this.isLoading = false
    },

    async createAccount() {
      let res = await axiosRequests.create(baseUrl, this.account)
      this.router.push({ name: 'account.index'})
    },

    async updateAccount() {
      const path = `${baseUrl}/${this.account.id}`
      let res = await axiosRequests.update(path, this.account)
      this.router.push({ name: 'account.index'})
    },

    async deleteAccount(id) {
      const path = `${baseUrl}/${id}`
      let res = await axiosRequests.remove(path)
      console.log(res)
      this.fetchAccounts()
    },



    setQueryFilters() {
      let query = ''

      this.filters.ascending ? (query += 'ascending=true&') : (query += 'ascending=false&');
      this.filters.search ? (query += 'search=' + this.filters.search + '&') : null;
      this.filters.orderBy ? (query += 'orderBy=' + this.filters.orderBy + '&') : null
      this.filters.pageNumber ? (query += 'pageNumber=' + this.filters.pageNumber + '&') : null
      this.filters.pageSize ? (query += 'pageSize=' + this.filters.pageSize + '&') : null

      return query
    },

    setPageNumber(number) {
      this.filters.pageNumber = number
    },
    setSearchFilter(search) {
      this.filters.search = search
      this.filters.pageNumber = 1
      this.fetchAccounts()
    },
    clearAccount(){
      this.account = {
        id: 0,
        name: null,
        initialBalance: null,
      }
    }

  }, // END of actions
  getters: {
    getAccounts: (state) => {
      return state.accounts
    },

    getAccount: (state) => {
      return state.account
    },

    getStatusColor: (state) => {
      return (status, element) => {
        switch (status) {
          case 'OK':
            return element + '-success'
            break
          case 'ERR':
            return element + '-danger'
            break
          case 'KO':
            return element + '-warning'
            break
          case 'PEND':
            return element + '-primary'
            break
        }
      }
    },

    getStatusIcon: (state) => {
      return (status) => {
        switch (status) {
          case 'OK':
            return 'fa-check'
            break
          case 'ERR':
            return 'fa-xmark'
            break
          case 'KO':
            return 'fa-exclamation'
            break
          case 'PEND':
            return 'fa-clock-rotate-left'
            break
        }
      }
    },


    getAccountsCount: (state) => {
      return state.requests.length
    },

    getFilters: (state) => {
      return state.filters
    },

    getIsLoading: (state) => {
      return state.isLoading
    },

  }
})

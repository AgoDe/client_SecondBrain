import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'

const host = import.meta.env.VITE_API_URL || '<<ENV_BASE_URL>>'


export function fetch(path) 
{
  // const authStore = useAuthStore()
  // const config = {
  //   headers: {
  //     Authorization: authStore.token
  //   }
  // }
  return new Promise((resolve, reject) => {
    let url = `${host}${path}`
    axios
      .get(url)
      .then((res) => {
        res.data.isSuccess ? resolve(res.data) : reject(res.data)
      })
  })
}

export function create(path, data)
{
  return new Promise((resolve, reject) => {
    axios
    .post(path, data)
    .then((res) => {
      res.data.isSuccess ? resolve(res.data) : reject(res.data)
    })
  })
}

export function update(path, data)
{
  return new Promise((resolve, reject) => {
    axios
    .put(path, data)
    .then((res) => {
      res.data.isSuccess ? resolve(res.data) : reject(res.data)
    })
  })
}
export function remove(path) 
{
  return new Promise((resolve, reject) => {
    axios
    .delete(path)
    .then((res) => {
      res.data.isSuccess ? resolve(res.data) : reject(res.data)
    })
  })
}



export default {
  fetch,
  create,
  update,
  remove
}


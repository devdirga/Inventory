import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import * as RootNavigation from '../navigation/RootNavigation'
import { BASE_URL } from 'react-native-dotenv'
import { KEY_STORAGE_TOKEN } from '../store/constant'
const axiosInstance = axios.create({ baseURL: BASE_URL })

axiosInstance.interceptors.request.use(
  async (c) => {
    let TOKEN = await AsyncStorage.getItem(KEY_STORAGE_TOKEN)
    if (TOKEN != null) { c.headers.Authorization = `Bearer ${TOKEN}` }
    return c
  },
  (error) => {
    console.warn('error')
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (r) => {
    if (r.status != 200) {
      if (r.statusText) {
        console.warn({ message: r.statusText, description: `Something wrong, please contact your administrator. \n- ${r.statusText} with code : ${r.status}`, type: 'danger' })
      } else {
        console.warn({ message: 'Error', description: `Something wrong, please contact your administrator. \n- ${r.status}`, type: 'danger' })
      }
    }
    if (!r.data.success && r.data.message == 'Access token is invalid') {
      AsyncStorage.multiRemove([KEY_STORAGE_TOKEN]).then(() => { RootNavigation.replace('Login') })
      r.data.message = 'Your session has expired'
    }
    return r
  },
  (e) => {
    console.warn(`axios error`, e.message);
    if (typeof e.response != 'undefined' && e.response.status == 401) {
      console.warn({ message: e.response.status.toString(), description: e.response.data.messages.join('. '), type: 'danger' })
      AsyncStorage.multiRemove([KEY_STORAGE_TOKEN]).then(() => { RootNavigation.replace('Login') })
    } else {
      if (typeof e.response.data.messages == 'object') {
        console.warn({ message: 'Fatal Error', description: e.response.data.messages.join('\n'), type: 'danger' })
      } else {
        console.warn({ message: 'Fatal Error', description: `Something wrong, please contact your administrator. \n- ${e.message}`, type: 'danger' })
      }
    }
    throw new Error(typeof e.response != 'undefined' ? e.response : { data: { status: 500, message: e.message } })
  }
)

export default axiosInstance

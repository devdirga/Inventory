import axios from '../../plugin/axios'
export default {
  get: async ({ skip = 0, limit = 10, search = '' }) => { return await axios.get(`/user/list?skip=${skip}&limit=${limit}&search=${search}`) },
  getMe: async () => {
    let res = await axios.get(`/user/me`)
    console.log("GET ME", res)
    return res
  },
  getLocationList: async ({ userID = '' }) => { return await axios.get(`/user/locations?userID=${userID}`) },
  changePassword: async ({ oldPassword, newPassword }) => { return await axios.put(`/user/me/change-password`, { oldPassword, newPassword }) },
  changeProfile: async ({ id, username, email, phoneNumber, firstName, lastName, address, position, picture, logoContent, logoMIME }) => {
    return await axios.put(`/user/me`, { id, username, email, phoneNumber, firstName, lastName, address, position, picture, logoMIME, logoContent })
  },
  getSubscription: async (entityID) => {
    let url = '/subscription/latest';
    if (entityID) { url += `/${entityID}` }
    return await axios.get(url)
  }
}

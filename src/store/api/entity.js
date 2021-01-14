import axios from '../../plugin/axios'

export default {
  get: async ({ skip, limit, search }) => { return await axios.get(`/entity/list?skip=${skip}&limit=${limit}&search=${search}`) },
  getByID: async (id) => { return await axios.get(`/entity/${id}`) },
  getMember: async ({ entityID, skip, limit, search }) => { return await axios.get(`/entity/member/list?id=${entityID}&skip=${skip}&limit=${limit}&search=${search}`) }
}

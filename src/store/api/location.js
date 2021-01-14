import axios from '../../plugin/axios'

export default {
  get: async ({ entityID, skip = 0, limit = 10, search = '' }) => {
    return await axios.get(`/location/list?entityID=${entityID}&skip=${skip}&limit=${limit}&search=${search}`)
  }
}
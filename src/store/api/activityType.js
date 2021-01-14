import axios from '../../plugin/axios'
export default { get: async ({ entityID, skip, limit, search }) => { return await axios.get(`/activity/type/list?entityID=${entityID}&skip=${skip}&limit=${limit}&search=${search}`) } }

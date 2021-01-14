import axios from '../../plugin/axios'

export default {
    getByID: async (id) => { return await axios.get(`/activity/survey`) }
}
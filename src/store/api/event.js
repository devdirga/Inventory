import axios from '../../plugin/axios';

export default {
  get: async ({ skip = 0, limit = 10, userID = '', startDate = '', endDate = '', search = '' }) => {
    return await axios.get(`/event/list?skip=${skip}&limit=${limit}&userID=${userID}&startDate=${startDate}&endDate=${endDate}&search=${search}`)
  },
  getByID: async ({ id }) => { return await axios.get(`/event/${id}`) },
  insertEvent: async ({ entityID, locationID, name, description, startTime, endTime, attendees }) => {
    return await axios.post(`/event`, { entityID, locationID, name, description, startTime, endTime, attendees })
  },
  updateEvent: async ({ id, entityID, locationID, name, description, startTime, endTime, attendees }) => {
    return await axios.put(`/event/${id}`, { id, entityID, locationID, name, description, startTime, endTime, attendees })
  },
  scan: async ({ barcode }) => { return await axios.post(`/event/scan`, { barcode }) }
}

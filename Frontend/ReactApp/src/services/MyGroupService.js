import axios from 'axios';

const BASE_URL = 'http://localhost:8888/api/mygroups'; 

const MyGroupService = {
  getAllGroups: async () => {
    const response = await axios.get(`${BASE_URL}`);
    return response.data;
  },

  getGroupById: async (id) => {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  },

  createGroup: async (group) => {
    const response = await axios.post(`${BASE_URL}`, group);
    return response.data;
  },

  updateGroup: async (id,group) => {
    const response = await axios.put(`${BASE_URL}/${id}`, group);
    return response.data;
  },

  deleteGroupById: async (id) => {
     await axios.delete(`${BASE_URL}/${id}`);
   
  },

  findByType: async (type) => {
    const response = await axios.get(`${BASE_URL}?type=${type}`);
    return response.data;
  },
};

export default MyGroupService;
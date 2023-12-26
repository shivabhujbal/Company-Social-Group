import axios from 'axios';

const  API_BASE_URL='http://localhost:8888/employee';

const EmployeeService = {

    login:async(username,password)=>{
        try{
            const response = await axios.post(`${API_BASE_URL}/login`,null,{params:{username,password}});
            return response.data;
        }catch(error){
            throw error.response ? error.response.data:error.message;
        }
    },

    getAllEmployees: async()=>{
        try{
            const response = await axios.get(`${API_BASE_URL}`);
            return response.data;
        }catch(error){
            throw error.response ? error.response.data:error.message;
        }
    }
}

export default EmployeeService;
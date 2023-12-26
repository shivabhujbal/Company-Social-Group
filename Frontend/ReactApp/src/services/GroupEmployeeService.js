import axios from "axios";

const API_BASE_URL = "http://localhost:8888/groupemployee";

const GroupEmployeeService = {

    addEmployeeToGroup:async(group_id,employee_id)=>{

        try {

        const response =    await axios.post(`${API_BASE_URL}/addemployee`,null,{params:{group_id,employee_id}});
            return response.data
            
        } catch (error) {

            throw error.response?error.response.data:error.message;
            
        }



    },

    addemployeesToGroup:async(addEmployeeRequest) =>{

        try {

           const response =  await axios.post(`${API_BASE_URL}/addemployees`,addEmployeeRequest);
            return  response.data
            
        } catch (error) {

            throw  error.response ? error.response.data:error.message;
            
        }

    }
,

    removeEmployeeFromGroup: async(group_id,employee_id)=>{
        try {
            const response = await axios.delete(`${API_BASE_URL}/${group_id}/employee/${employee_id}`);
            return response.data
            
        } catch (error) {

            throw error.response?error.response.data:error.message;
            
        }
    },

    getAllEmployeesByGroupId:async(group_id)=>{
        try {
            const response = await axios.get(`${API_BASE_URL}/${group_id}/getemployees`);
            return response.data
            
        } catch (error) {

            throw error.response?error.response.data:error.message;
            
        }
    },

    getGroupsByEmployeeId:async(employee_id)=>{
        try{

            const response = await axios.get(`${API_BASE_URL}/getgroups/${employee_id}`);
            return response.data

        }catch (error){

            throw error.response?error.response.data:error.message;

        }
    }



}

export default GroupEmployeeService;
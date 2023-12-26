import axios from "axios";

const API_BASE_URL="http://localhost:8888/api/v1";

const MessageService = {

    getMessagesByGroupId:async(id)=>{

        try {

            const response =await axios.get(`${API_BASE_URL}/message/${id}`);
        
            return  response.data
            
        } catch (error) {
            throw error.response?error.response.data:error.message;

            
        }
    },
    getMessageById: async (id) => {
        const response = await axios.get(`${API_BASE_URL}messages/${id}`);
        return response.data;
      },
    
      createMessage: async (messageData) => {
        const response = await axios.post(`${API_BASE_URL}/message`, messageData);
        return response.data;
      },
    
      updateMessage: async (id, updatedMessage) => {
        const response = await axios.put(`${API_BASE_URL}messages/${id}`, updatedMessage);
        return response.data;
      },
    
      deleteMessage: async (id) => {
        const response = await axios.delete(`${API_BASE_URL}/message/${id}`);
        return response.data;
      },


      // for image 

      sendMessageWithImage: async (messageData,imgeData) => {
        try {
          const formData = new FormData();
          formData.append('file', messageData.file); // Append the file to the form data
          formData.append('message', JSON.stringify({ // Append other message fields as JSON
            employee: messageData.employee,
            group: messageData.group,
            text: messageData.text,
            localDateTime: messageData.localDateTime
          }));
      
          const response = await axios.post(`${API_BASE_URL}/msgwimg`, formData ,{
            headers: {
              'Content-Type': 'multipart/form-data'
            }

            

          });

          return response.data;

          } 
          catch (error) {
          console.error('Error sending message with image:', error);
          throw error; // Re-throw the error to handle in the component
        }
      },

    };
    





export default MessageService;
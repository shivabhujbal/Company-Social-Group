import axios from "axios";

const API_BASE_URL = "http://localhost:8888/file";

const ImageService = {
  uploadFile: async (file) => {
    try {
      let formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data; // Assuming your backend returns some data upon successful upload
    } catch (error) {
      throw error; // Handle or propagate the error as needed
    }
  },

  getListFiles: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/files`);
      return response.data;
    } catch (error) {
      throw error; // Handle or propagate the error as needed
    }
  },

  getFile: async (filename) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/files/${filename}`, {
        responseType: 'blob', // Ensure response is treated as a blob
      });
      return response.data;
    } catch (error) {
      throw error; // Handle or propagate the error as needed
    }
  },
};

export default ImageService;

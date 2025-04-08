import axios from 'axios';

const API_URL = 'http://localhost:8080/api/storeOwner';

export const login = async (user) => {
  try {  
    console.log(user);
    
    const response = await axios.post(`${API_URL}/login`, user);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getOwnerService = async () => {
  try {  
    const response = await axios.get(`${API_URL}/getStoreOwnerByName`);
    console.log(response);
    
    return response;
  } catch (error) {
    throw error;
  }
};

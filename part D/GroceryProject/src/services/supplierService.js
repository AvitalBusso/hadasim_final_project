import axios from 'axios';

const API_URL = 'http://localhost:8080/api/supplier';

export const loginUser = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/login`, user);
    return response;
  } catch (error) {
    throw error;
  }
};

export const addSupplier = async (user) => {
  try {
    console.log(user);
    
    const response = await axios.post(`${API_URL}/addSupplier`, user);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getAllSupplier = async () => {
  try {    
    const response = await axios.get(`${API_URL}/getAll`);
    return response;
  } catch (error) {
    throw error;
  }
};
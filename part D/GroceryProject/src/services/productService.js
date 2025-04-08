import axios from 'axios';

const API_URL = 'http://localhost:8080/api/products';


export const addNewProducts = async (products) => {
  try {
    console.log("products", products)
    const response = await axios.post(`${API_URL}/addProducts`, products);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getAll = async () => {
  try {
    const response = await axios.get(`${API_URL}/all`);
    return response;
  } catch (error) {
    throw error;
  }
};
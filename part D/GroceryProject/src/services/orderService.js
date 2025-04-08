import axios from 'axios';

const API_URL = 'http://localhost:8080/api/orders';

export const getOrdersBySupplierId = async (id) => {
  try {  
    const response = await axios.get(`${API_URL}/getOrdersBySupplierId/${id}`);    
    return response;
  } catch (error) {
    throw error;
  }
};

export const getOrders = async () => {
  try {  
    const response = await axios.get(`${API_URL}/getAllOrders`);    
    return response;
  } catch (error) {
    throw error;
  }
};
export const updateToCompleted = async (orderId) => {
  try {  
    const response = await axios.put(`${API_URL}/updateStatusToCompleted/${orderId}`);
    console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateToProcess = async (orderId) => {
  try {  
    const response = await axios.put(`${API_URL}/updateStatusToProcess/${orderId}`);
    console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
};

export const addNewOrder = async (order) => {
  try {
    console.log(order);
    const response = await axios.post(`${API_URL}/addOrder`,order);
    return response;
  } catch (error) {
    throw error;
  }
};